/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAnnualReviewInput = {
  id?: string | null,
  firstname: string,
  lastname: string,
  email: string,
  ninumber: string,
};

export type ModelAnnualReviewConditionInput = {
  firstname?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  email?: ModelStringInput | null,
  ninumber?: ModelStringInput | null,
  and?: Array< ModelAnnualReviewConditionInput | null > | null,
  or?: Array< ModelAnnualReviewConditionInput | null > | null,
  not?: ModelAnnualReviewConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type AnnualReview = {
  __typename: "AnnualReview",
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  ninumber: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateAnnualReviewInput = {
  id: string,
  firstname?: string | null,
  lastname?: string | null,
  email?: string | null,
  ninumber?: string | null,
};

export type DeleteAnnualReviewInput = {
  id: string,
};

export type ModelAnnualReviewFilterInput = {
  id?: ModelIDInput | null,
  firstname?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  email?: ModelStringInput | null,
  ninumber?: ModelStringInput | null,
  and?: Array< ModelAnnualReviewFilterInput | null > | null,
  or?: Array< ModelAnnualReviewFilterInput | null > | null,
  not?: ModelAnnualReviewFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelAnnualReviewConnection = {
  __typename: "ModelAnnualReviewConnection",
  items:  Array<AnnualReview | null >,
  nextToken?: string | null,
};

export type CreateAnnualReviewMutationVariables = {
  input: CreateAnnualReviewInput,
  condition?: ModelAnnualReviewConditionInput | null,
};

export type CreateAnnualReviewMutation = {
  createAnnualReview?:  {
    __typename: "AnnualReview",
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    ninumber: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateAnnualReviewMutationVariables = {
  input: UpdateAnnualReviewInput,
  condition?: ModelAnnualReviewConditionInput | null,
};

export type UpdateAnnualReviewMutation = {
  updateAnnualReview?:  {
    __typename: "AnnualReview",
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    ninumber: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteAnnualReviewMutationVariables = {
  input: DeleteAnnualReviewInput,
  condition?: ModelAnnualReviewConditionInput | null,
};

export type DeleteAnnualReviewMutation = {
  deleteAnnualReview?:  {
    __typename: "AnnualReview",
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    ninumber: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetAnnualReviewQueryVariables = {
  id: string,
};

export type GetAnnualReviewQuery = {
  getAnnualReview?:  {
    __typename: "AnnualReview",
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    ninumber: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListAnnualReviewsQueryVariables = {
  filter?: ModelAnnualReviewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAnnualReviewsQuery = {
  listAnnualReviews?:  {
    __typename: "ModelAnnualReviewConnection",
    items:  Array< {
      __typename: "AnnualReview",
      id: string,
      firstname: string,
      lastname: string,
      email: string,
      ninumber: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateAnnualReviewSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateAnnualReviewSubscription = {
  onCreateAnnualReview?:  {
    __typename: "AnnualReview",
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    ninumber: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateAnnualReviewSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateAnnualReviewSubscription = {
  onUpdateAnnualReview?:  {
    __typename: "AnnualReview",
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    ninumber: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteAnnualReviewSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteAnnualReviewSubscription = {
  onDeleteAnnualReview?:  {
    __typename: "AnnualReview",
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    ninumber: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
