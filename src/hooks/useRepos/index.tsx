import { useQuery } from "@tanstack/react-query";
import { fetchRepos } from "./fetch";
import { Repository } from "./types";
import { useAtom, useAtomValue } from "jotai";
import { repoKeywordAtom, repoUserAtom } from "@/atoms/Repo";
import useSearchUser from "../useSearchUser";

const useRepos = () => {
  const { data: searchData } = useSearchUser();
  const keywords = useAtomValue(repoKeywordAtom);

  const [repoUser, setRepoUser] = useAtom(repoUserAtom);

  const { isError, data, isFetching } = useQuery<Repository[]>({
    queryKey: ["useRepos", keywords],
    queryFn: () => fetchRepos(keywords),
    enabled: !!searchData && !!keywords,
    onSuccess: (data: Repository[]) => {
      const repoUserMap = new Map<string, Repository[]>(repoUser);

      if (!repoUserMap.has(keywords)) {
        repoUserMap.set(keywords, data);
        setRepoUser(repoUserMap);
      }
    },
    onError: () => {
      console.error(`[useRepos] error fetching repos`);
    },
  });

  return {
    data,
    isError,
    isFetching,
  };
};

export default useRepos;
