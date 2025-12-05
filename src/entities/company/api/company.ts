import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import { Company } from "../model/types";

export const GET_COMPANY = gql`
  query Company {
    company {
      name
    }
  }
`;

export interface CompanyQueryResponse {
  company: Company;
}

export const useCompany = () => useQuery<CompanyQueryResponse>(GET_COMPANY);

