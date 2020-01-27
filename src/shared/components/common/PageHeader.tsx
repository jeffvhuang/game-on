import * as React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  title: string;
  isLoading: boolean;
}

function PageHeader({ title, isLoading = false }: Props) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      <div className="loader">{isLoading && <LoadingSpinner />}</div>
    </div>
  );
}

export default PageHeader;
