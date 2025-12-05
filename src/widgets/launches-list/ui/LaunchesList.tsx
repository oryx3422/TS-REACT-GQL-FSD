import React from "react";
import styled from "styled-components";

import { useLaunches } from "../../../entities/launch/api/launches";
import { Launch } from "../../../entities/launch/model/types";

const ListWrapper = styled.div`
  display: grid;
  gap: 16px;
`;

const LaunchCard = styled.div`
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;

const LaunchTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 18px;
`;

const LaunchMeta = styled.div`
  color: #4a5568;
  font-size: 14px;
`;

const formatDate = (iso?: string | null) => {
  if (!iso) return "Unknown date";
  return new Date(iso).toLocaleDateString();
};

export const LaunchesList: React.FC<{ limit?: number }> = ({ limit = 10 }) => {
  const { data, loading, error } = useLaunches(limit);

  if (loading) {
    return <div>Loading launches...</div>;
  }

  if (error) {
    return <div>Failed to load launches</div>;
  }

  const launches: Launch[] = data?.launchesPast ?? [];

  if (!launches.length) {
    return <div>No launches yet.</div>;
  }

  return (
    <ListWrapper>
      {launches.map((launch) => (
        <LaunchCard key={launch.id}>
          <LaunchTitle>{launch.mission_name ?? "Untitled mission"}</LaunchTitle>
          <LaunchMeta>
            {launch.rocket?.rocket_name ?? "Unknown rocket"} -{" "}
            {formatDate(launch.launch_date_utc)}
          </LaunchMeta>
        </LaunchCard>
      ))}
    </ListWrapper>
  );
};

