import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import { Launch } from "../model/types";

export const GET_LAUNCHES = gql`
  query Launches($limit: Int = 10) {
    launchesPast(
      limit: $limit
      sort: "launch_date_utc"
      order: "desc"
    ) {
      id
      mission_name
      launch_date_utc
      rocket {
        rocket_name
      }
    }
  }
`;

export interface LaunchesQueryResponse {
  launchesPast: Launch[];
}

export const useLaunches = (limit = 10) =>
  useQuery<LaunchesQueryResponse>(GET_LAUNCHES, {
    variables: { limit },
  });

