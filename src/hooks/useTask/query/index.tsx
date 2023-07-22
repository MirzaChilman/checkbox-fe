import { Task } from "@/atoms/Task/types";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

const allFilmsWithVariablesQueryDocument = gql`
  query {
    tasks {
      id
      name
      description
      createDate
      dueDate
      status
    }
  }
`;

const useTaskQuery = () => {
  const { data } = useQuery<Task[]>({
    queryKey: ["useTaskQuery"],
    queryFn: async () => {
      const response = await request(
        "http://localhost:3001/graphql",
        allFilmsWithVariablesQueryDocument
      );

      return (response as any).tasks;
    },
  });

  return {
    data,
  };
};

export default useTaskQuery;
