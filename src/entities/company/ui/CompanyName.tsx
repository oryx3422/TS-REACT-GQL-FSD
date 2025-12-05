import React from "react";

import { useCompany } from "../api/company";

export const CompanyName: React.FC = () => {
  const { data, loading, error } = useCompany();

  if (loading) {
    return <span>Loading company...</span>;
  }

  if (error) {
    return <span>Company unavailable</span>;
  }

  return <span>{data?.company?.name ?? "SpaceX"}</span>;
};

