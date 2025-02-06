import { auth } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type Repo = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
};

const useRepoAccess = (): Repo[] => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const { data: session } = useSession();
  // Get token from session
  const token = session?.accessToken;

  useEffect(() => {

    if (!token) {
      return;
    }

    // Make a request to https://api.github.com/user/installations to get all installations
    fetch("https://api.github.com/user/installations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const { installations } = result;
        // If there are any installations, use the first installation ID to make a request
        // to /user/installations/{installation_id}/repositories to get the list of repos
        if (installations?.length > 0) {
          const installationId = installations[0].id;
          fetch(
            `https://api.github.com/user/installations/${installationId}/repositories`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .then((response) => response.json())
            .then((repoResult: { repositories: Repo[] }) => {
              const { repositories } = repoResult;

              // Set the list of repos in state
              setRepos(repositories);
            });
        }
      });
  }, [token]);

  return repos;
};

export default useRepoAccess;
