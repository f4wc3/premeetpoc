import Amplify, { API, withSSRContext } from "aws-amplify";
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
      <div className={styles.grid}>
        {annualreviews.map((annualreview) => (
          <a href={`/annualreview/${annualreview.id}`} key={annualreview.id}>
            <h3>{annualreview.firstname} {annualreview.lastname}</h3>
            <p>{annualreview.email}</p>
            <p>{annualreview.ninumber}</p>
          </a>
        ))}
      </div>

      <Authenticator>
        <form onSubmit={handleCreateAnnualReview}>
          <fieldset>
            <legend>First name</legend>
            <input defaultValue={`Today, ${new Date().toLocaleTimeString()}`} name="name" />
          </fieldset>
          
          <fieldset>
            <legend>Last name</legend>
            <input defaultValue={`Today, ${new Date().toLocaleTimeString()}`} name="surname" />
          </fieldset>

          <fieldset>
            <legend>Email</legend>
            <textarea defaultValue="email@email.com" name="email" />
          </fieldset>
          
          <fieldset>
            <legend>NI Number</legend>
            <textarea defaultValue="XXXXXX" name="nationalinsurance" />
          </fieldset>

          <button>Create Annual Review</button>
        </form>
      </Authenticator>
    </div>
  );
}