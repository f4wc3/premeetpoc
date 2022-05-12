/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAnnualReview = /* GraphQL */ `
  query GetAnnualReview($id: ID!) {
    getAnnualReview(id: $id) {
      id
      firstname
      lastname
      email
      ninumber
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listAnnualReviews = /* GraphQL */ `
  query ListAnnualReviews(
    $filter: ModelAnnualReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnnualReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        email
        ninumber
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
