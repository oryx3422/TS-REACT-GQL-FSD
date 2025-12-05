import React from "react";
import styled from "styled-components";

import { CompanyName } from "../../../entities/company/ui/CompanyName";
import { LaunchesList } from "../../../widgets/launches-list";

const PageWrapper = styled.div`
  padding: 24px;
  max-width: 960px;
  margin: 0 auto;
`;
const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px;
`;

const PageDescription = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin: 0 0 24px;
  color: #4a5568;
`;

export const LaunchesPage: React.FC = () => {
  return (
    <PageWrapper>
      <PageTitle>SpaceX Launches</PageTitle>
      <PageDescription>
        Live data from the SpaceX GraphQL API by <CompanyName />.
      </PageDescription>
      <LaunchesList limit={8} />
    </PageWrapper>
  );
};
