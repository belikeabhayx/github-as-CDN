import React from "react";
import { LinkIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

function ConnectGithubButton({ className }: { className?: string }) {
  return (
    <div
      className={`ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md  px-4 py-2 text-base font-medium text-white shadow-sm  ${className}`}
    >
      <Button
        size={"lg"}
        className="rounded-xl"
        onClick={() => signIn("github")}
      >
        Sign in with GitHub
      </Button>
      <LinkIcon className="ml-2 size-5 text-white" aria-hidden="true" />
    </div>
  );
}

export default ConnectGithubButton;
