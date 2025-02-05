import React from "react";
import useRepoAccess from "@/hooks/useRepoAccess";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

const RepoConnectorNavbar = () => {
  const repos = useRepoAccess();
  const { data: session, status } = useSession();
  const user = session?.user || ({} as User);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (!session) {
    return <span>Please log in to view your repositories.</span>;
  }

  if (repos.length === 0) {
    return (
      <a
        target="_blank"
        href={`https://github.com/apps/git-as-cdn/installations/new/permissions?target_id=${user.id}`}
        onClick={(e) => e.stopPropagation()}
        rel="noreferrer"
      >
        [Connect to a Github Repo]
      </a>
    );
  }

  return <span>Connected Repo: {repos[0]?.name}</span>;
};

export default RepoConnectorNavbar;
