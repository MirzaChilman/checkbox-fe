import { useMutation } from "@tanstack/react-query";
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

const useTaskMutation = () => {
  const { mutate } = useMutation({
    mutationKey: ["useMutations"],
    mutationFn: async () => {
      const temp = {
        name: "mirza test",
        description: "desc",
        dueDate: "2023-09-22",
      };
      return await request("http://localhost:3001/graphql", graph, temp);
    },
  });

  return {
    mutate,
  };
};

export default useTaskMutation;
