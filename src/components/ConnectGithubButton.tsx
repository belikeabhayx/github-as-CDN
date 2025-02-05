import Link from "next/link";
import React, { useContext } from "react";
import { LinkIcon } from "lucide-react";

function ConnectGithubButton({ className }: { className?: string }) {
  return (
    <Link
      href={`/api/auth/callback/github`}
      className={`ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ${className}`}
    >
      Connect <LinkIcon className="ml-2 size-5 text-white" aria-hidden="true" />
    </Link>
  );
}

export default ConnectGithubButton;
