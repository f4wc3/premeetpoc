/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAnnualReview = /* GraphQL */ `
  mutation CreateAnnualReview(
    $input: CreateAnnualReviewInput!
    $condition: ModelAnnualReviewConditionInput
  ) {
    createAnnualReview(input: $input, condition: $condition) {
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
export const updateAnnualReview = /* GraphQL */ `
  mutation UpdateAnnualReview(
    $input: UpdateAnnualReviewInput!
    $condition: ModelAnnualReviewConditionInput
  ) {
    updateAnnualReview(input: $input, condition: $condition) {
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
export const deleteAnnualReview = /* GraphQL */ `
  mutation DeleteAnnualReview(
    $input: DeleteAnnualReviewInput!
    $condition: ModelAnnualReviewConditionInput
  ) {
    deleteAnnualReview(input: $input, condition: $condition) {
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
