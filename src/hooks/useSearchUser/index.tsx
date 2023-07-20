import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./fetch";
import { SearchResponse } from "./types";
import { useAtomValue } from "jotai";
import { searchedKeywordsAtom } from "@/atoms/Search";

const useSearchUser = () => {
  const searchedKeywords = useAtomValue(searchedKeywordsAtom);

  const { data, isLoading, isError, refetch, isFetching } =
    useQuery<SearchResponse>({
      queryKey: ["useSearchUser", searchedKeywords],
      queryFn: () => fetchUsers(searchedKeywords),
      enabled: Boolean(searchedKeywords),
      onError: () => {
        console.error(`[useSearchUser] error fetching users`);
      },
    });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};

export default useSearchUser;
