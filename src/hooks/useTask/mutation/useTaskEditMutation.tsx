import { FormTask } from "@/atoms/Task/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

const graph = gql`
  mutation updateTask(
    $id: Int!
    $name: String
    $description: String
    $dueDate: String
  ) {
    updateTask(
      updateTaskInput: {
        id: $id
        name: $name
        description: $description
        dueDate: $dueDate
      }
    ) {
      name
    }
  }
`;

const useTaskEditMutation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["useTaskEditMutation"],
    mutationFn: async (data: FormTask & { id: number }) => {
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

export default useTaskEditMutation;
