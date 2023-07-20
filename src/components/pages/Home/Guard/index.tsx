import Loading from "@/components/Card/Loading";
import Empty from "@/components/Empty";
import useSearchUser from "@/hooks/useSearchUser";
import React from "react";

const Guard = ({ children }: { children: React.ReactNode }) => {
  const { data, isError, isFetching } = useSearchUser();

  if (isFetching) return <Loading />;
  if (!data?.items.length) return <Empty />;
  if (isError) return <p>Something went wrong rendering the data</p>;

  return <>{children}</>;
};

export default Guard;
