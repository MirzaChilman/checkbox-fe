import githubApi from "@/helpers/axiosClient/githubApi";

export const fetchRepos = async (username: string) => {
  return (await githubApi.get(`/users/${username}/repos`)).data;
};
