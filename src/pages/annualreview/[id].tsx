// [id].tsx
import { Amplify, API, withSSRContext } from "aws-amplify";
import Head from "next/head";
import { useRouter } from "next/router";
import { DeleteAnnualReviewInput, GetAnnualReviewQuery, AnnualReview, ListAnnualReviewsQuery } from "../../API";
import awsExports from "../../aws-exports";
import { deleteAnnualReview } from "../../graphql/mutations";
import { getAnnualReview, listAnnualReviews } from "../../graphql/queries";
import { GetStaticProps, GetStaticPaths } from "next";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import styles from "../../../styles/Home.module.scss";

Amplify.configure({ ...awsExports, ssr: true })

export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext();

  const annualreviewsQuery = (await SSR.API.graphql({
    query: listAnnualReviews,
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  })) as { data: ListAnnualReviewsQuery; errors: any[] };

  const paths = annualreviewsQuery.data.listAnnualReviews.items.map((annualreview: AnnualReview) => ({
    params: { id: annualreview.id },
  }));

  return {
    fallback: true,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const SSR = withSSRContext();

  const response = (await SSR.API.graphql({
    query: getAnnualReview,
    variables: {
      id: params.id,
    },
  })) as { data: GetAnnualReviewQuery };

  return {
    props: {
      annualreview: response.data.getAnnualReview,
    },
  };
};

export default function AnnualReviewPage({ annualreview }: { annualreview: AnnualReview }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Loading&hellip;</h1>
      </div>
    );
  }

  async function handleDelete(): Promise<void> {
    try {
      const deleteInput: DeleteAnnualReviewInput = {
        id: annualreview.id,
      };

      await API.graphql({
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        query: deleteAnnualReview,
        variables: {
          input: deleteInput,
        },
      });

      router.push(`/`);
    } 
    catch ({ errors }) {
      console.error(...errors);
      throw new Error(errors[0].message);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Courtiers Annual Review PoC Listing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
      <main>
        <h1 className={styles.title}>Courtiers Annual Review PoC Listing</h1>
        <div className={styles.listingContainer}>
          <p className={styles.name}>{annualreview.firstname}</p>
          <p className={styles.name}>{annualreview.lastname}</p>
          <p>{annualreview.email}</p>
          <p>{annualreview.ninumber}</p>
        </div>
      </main>

      <button className={styles.button} onClick={handleDelete}>
        💥 Delete annual review
      </button>
      </div>
    </div>
  );
}
