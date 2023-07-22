import { FormTask } from "@/atoms/Task/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

const graph = gql`
  mutation createTask(
    $name: String!
    $description: String!
    $dueDate: String!
  ) {
    createTask(
      createTaskInput: {
        name: $name
        description: $description
        dueDate: $dueDate
      }
    ) {
      name
    }
  }
`;

const useTaskCreateMutation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["useTaskCreateMutation"],
    mutationFn: async (data: FormTask) => {
      return await request("http://localhost:3001/graphql", graph, data);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["useTaskQuery"],
      });
    },
  });

  return {
    mutate,
  };
};

export default useTaskCreateMutation;
