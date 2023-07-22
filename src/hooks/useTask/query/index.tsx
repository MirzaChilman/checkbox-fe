import { Task } from "@/atoms/Task/types";
import { graphql } from "@/gql";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

const allFilmsWithVariablesQueryDocument = gql`
  query {
    tasks {
      id
      name
    }
  }
`;

const useTaskQuery = () => {
  const { data } = useQuery<Task>({
    queryKey: ["useTaskQuery", "asd"],
    queryFn: async () => {
      request(
        "http://localhost:3001/graphql",
        allFilmsWithVariablesQueryDocument
      );
    },
  });

  return {
    data,
  };
};

export default useTaskQuery;
