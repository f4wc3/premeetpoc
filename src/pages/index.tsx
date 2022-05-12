import Amplify, { API, withSSRContext } from "aws-amplify";
import Head from "next/head";
import { GetServerSideProps } from "next";
import React from "react";
import styles from "../../styles/Home.module.scss";
import { AnnualReview, CreateAnnualReviewInput, CreateAnnualReviewMutation, ListAnnualReviewsQuery } from "../API";
import { createAnnualReview } from "../graphql/mutations";
import { listAnnualReviews } from "../graphql/queries";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { Authenticator } from "@aws-amplify/ui-react";
import awsExports from "../aws-exports";
import { useRouter } from "next/router";

Amplify.configure({ ...awsExports, ssr: true });

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const SSR = withSSRContext({ req });

  const response = (await SSR.API.graphql({
    query: listAnnualReviews,
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  })) as {
    auth;
    data: ListAnnualReviewsQuery;
  };

  return {
    props: {
      anualreviews: response.data.listAnnualReviews.items,
    },
  };
};

export default function Home({ annualreviews = [] }: { annualreviews: AnnualReview[] }) {
  const router = useRouter()

  async function handleCreateAnnualReview(event) {
    event.preventDefault();

    const form = new FormData(event.target);

    try {
      const createInput: CreateAnnualReviewInput = {
        firstname: form.get("name").toString(),
        lastname: form.get("surname").toString(),
        email: form.get("email").toString(),
        ninumber: form.get("nationalinsurance").toString(),
      };

      const request = (await API.graphql({
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        query: createAnnualReview,
        variables: {
          input: createInput,
        },
      })) as { data: CreateAnnualReviewMutation; errors: any[] };

      router.push(`/annualreview/${request.data.createAnnualReview.id}`)


    } catch ({ errors }) {
      console.error(...errors);
      throw new Error(errors[0].message);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Courtiers Annual Review PoC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.grid}>
        {annualreviews.map((annualreview) => (
          <a href={`/annualreview/${annualreview.id}`} key={annualreview.id}>
            <h3 className={styles.title}>{annualreview.firstname} {annualreview.lastname}</h3>
            <p>{annualreview.email}</p>
            <p>{annualreview.ninumber}</p>
          </a>
        ))}
      </div>
      <h1 className={styles.title}>Courtiers Annual Review PoC</h1>
      <Authenticator>
        <form onSubmit={handleCreateAnnualReview} className={styles.form}>
          <fieldset className={styles.fieldGroup}>
            <legend>First name</legend>
            <input defaultValue={`Enter name`} name="name" />
          </fieldset>
          
          <fieldset className={styles.fieldGroup}>
            <legend>Last name</legend>
            <input defaultValue={`Enter last name`} name="surname" />
          </fieldset>

          <fieldset className={styles.fieldGroup}>
            <legend>Email</legend>
            <input defaultValue="Enter email" name="email" />
          </fieldset>
          
          <fieldset className={styles.fieldGroup}>
            <legend>NI Number</legend>
            <input defaultValue="Enter national insurance number" name="nationalinsurance" />
          </fieldset>

          <button className={styles.button}>Create Annual Review</button>
        </form>
      </Authenticator>
    </div>
  );
}