import { repoKeywordAtom, repoUserAtom } from "@/atoms/Repo";
import { User } from "@/hooks/useSearchUser/types";
import { useAtomValue, useSetAtom } from "jotai";
import { Collapse, CollapseProps, Card } from "antd";
import { useMemo } from "react";
import useRepos from "@/hooks/useRepos";
interface Props {
  items: Array<Pick<User, "id" | "login"> & { repos?: any[] }>;
}

const Repos = ({ items }: Props) => {
  const setRepoKeyword = useSetAtom(repoKeywordAtom);
  const repoUser = useAtomValue(repoUserAtom);
  const { isFetching } = useRepos();

  const formattedItems: CollapseProps["items"] = useMemo(
    () =>
      items.map((item) => {
        const repositories = repoUser.get(item.login) || [];
        const children = repositories.map((repo) => (
          <Card key={repo.id} className="my-2">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <div className="flex justify-between">
                <p className="font-bold">{repo.name}</p>
                <div className="flex items-center gap-1">
                  {repo.stargazers_count}

                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
              </div>
              <p>{repo.description}</p>
            </a>
          </Card>
        ));

        return {
          key: item.login,
          label: item.login,
          children:
            isFetching && !repoUser.has(item.login) ? "Loading" : children,
        };
      }),
    [isFetching, items, repoUser]
  );

  const handleChange = (key: string | string[]) => {
    setRepoKeyword(String(key));
  };

  return <Collapse items={formattedItems} accordion onChange={handleChange} />;
};

export default Repos;
