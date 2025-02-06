import React from "react";
import { LinkIcon } from "lucide-react";
import { signIn } from "next-auth/react";

function ConnectGithubButton({ className }: { className?: string }) {
  return (
    <div
      className={`ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ${className}`}
    >
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>{" "}
      <LinkIcon className="ml-2 size-5 text-white" aria-hidden="true" />
    </div>
  );
}

export default ConnectGithubButton;
