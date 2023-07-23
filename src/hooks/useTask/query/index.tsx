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
        process.env.NEXT_PUBLIC_BASE_URL || "",
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
