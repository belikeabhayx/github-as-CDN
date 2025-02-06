import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import ConnectGithubButton from "../ConnectGithubButton";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import RepoConnectorNavbar from "../RepoConnectorNavbar";

const RepoConnector = () => {
  const { data: session, status } = useSession();
  const user = session?.user || ({} as User);

  const solutions = [
    {
      name: "Update Source Github Repo",
      description:
        "Manage which public Github repository's should be used with GaaC.",
      href: `https://github.com/apps/git-as-cdn/installations/new/permissions?target_id=${user.id}`,
      icon: ChevronRight,
    },
  ];
  return (
    <div className="my-2 flex flex-1 items-center justify-end md:my-auto lg:w-0">
      {status !== "authenticated" ? (
        <ConnectGithubButton />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-1">
              <span className="mr-2 text-indigo-600 underline underline-offset-8">
                {session.user?.name} / <RepoConnectorNavbar />
              </span>
              <img
                //@ts-expect-error
                src={session.user?.image}
                //@ts-expect-error
                alt={session.user?.name}
                className="size-8 rounded-full border-2 border-indigo-500"
              />
              <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-[400px]">
            <div className="grid gap-4 p-6">
              {solutions.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <a
                    href={item.href}
                    target="_blank"
                    className="flex items-start rounded-lg p-3 hover:bg-gray-50"
                    rel="noreferrer"
                  >
                    <item.icon className="size-6 shrink-0 text-indigo-600" />
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </a>
                </DropdownMenuItem>
              ))}
            </div>

            <div className="border-t border-gray-200 bg-gray-50 p-4">
              <Button
                variant="default"
                onClick={() => signOut()}
                className="w-full"
              >
                Log out
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default RepoConnector;
