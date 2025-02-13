"use client";

import {
  Folder,
  Image,
  File,
  Trash2,
  ExternalLink,
  Search,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import useDeleteGithubFile from "@/hooks/useDeleteGithubFile";
import type { GithubFile } from "@/hooks/useRepoFiles";
import useRepoFiles from "@/hooks/useRepoFiles";
import { useSession } from "next-auth/react";
import { DeleteConfirmationDialog } from "@/hooks/as";

function getPathParts(path: string) {
  return path.split("/").filter(Boolean);
}

function getFileIcon(file: GithubFile) {
  if (file.type === "dir") return Folder;
  if (file.name.toLowerCase().match(/\.(jpeg|jpg|gif|png|svg|webp)$/))
    return Image;
  return File;
}

// Create a separate component for the content that uses useSearchParams
function UploadsContent() {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredFile, setHoveredFile] = useState<GithubFile | null>(null);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const path = searchParams.get("path") || "uploads";
  const { files, refreshFiles } = useRepoFiles(path);
  const {
    handleDeleteFromGitHub,
    deleteInProgress,
    isDialogOpen,
    setIsDialogOpen,
    fileToDelete,
    confirmDelete,
  } = useDeleteGithubFile();
  const pathParts = getPathParts(path);

  const copyFileNameToClipboard = (fileUrl: string) => {
    navigator.clipboard.writeText(fileUrl);
    toast({
      title: "URL Copied",
      description: "File URL has been copied to your clipboard",
      className: "bg-black text-white",
    });
  };

  const filteredFiles = files?.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-8 dark:from-gray-950 dark:to-gray-900 mt-24">
      <DeleteConfirmationDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        file={fileToDelete}
        onConfirm={confirmDelete}
        isDeleting={deleteInProgress}
      />
      <div className="mx-auto max-w-7xl">
        {status !== "authenticated" && (
          <Card className="mb-8 border-none bg-amber-50 shadow-lg shadow-amber-100 dark:bg-amber-950/30 dark:shadow-amber-900/20">
            <CardContent className="flex items-center gap-3 p-4 text-amber-800 dark:text-amber-200">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                ⚠️
              </div>
              <p className="font-medium">
                You are not connected to Github. Network requests will fail.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="mb-8 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">
                File Manager
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage and preview your files
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full min-w-[260px] rounded-full border-none bg-white pl-10 shadow-sm transition-shadow hover:shadow focus:ring-2 focus:ring-primary dark:bg-gray-900"
              />
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2 rounded-lg bg-white/50 p-3 text-sm backdrop-blur-sm dark:bg-white/5">
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
            <Link
              href="/uploads?path=uploads"
              className="font-medium text-primary hover:underline"
            >
              root
            </Link>
            {pathParts.map((part, index) => (
              <React.Fragment key={part}>
                <span className="text-muted-foreground">/</span>
                <Link
                  href={`/uploads?path=${pathParts
                    .slice(0, index + 1)
                    .join("/")}`}
                  className="font-medium text-primary hover:underline"
                >
                  {part}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-900/80">
            <CardContent className="p-0">
              <div className="scrollbar-thin max-h-[600px] overflow-y-auto">
                {filteredFiles?.map((file) => (
                  <div
                    key={file.name}
                    className={cn(
                      "group flex cursor-pointer items-center gap-3 border-b border-gray-100 p-4 transition-all hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50",
                      deleteInProgress &&
                        hoveredFile?.name === file.name &&
                        "animate-pulse bg-red-50 dark:bg-red-900/20"
                    )}
                    onMouseEnter={() => setHoveredFile(file)}
                    onClick={() =>
                      file.type !== "dir" &&
                      copyFileNameToClipboard(file.download_url)
                    }
                  >
                    <div className="rounded-lg bg-gray-100/80 p-2 transition-colors group-hover:bg-white dark:bg-gray-800 dark:group-hover:bg-gray-700">
                      {React.createElement(getFileIcon(file), {
                        className: "h-4 w-4",
                      })}
                    </div>

                    {file.type === "dir" ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={`/uploads?path=${path}/${file.name}`}
                              className="flex-1 font-medium hover:text-primary"
                            >
                              {file.name}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>Open folder</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="flex-1 font-medium">
                              {file.name}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>Click to copy URL</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}

                    {file.type !== "dir" && (
                      <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(file.download_url, "_blank");
                                }}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Open in new tab</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  await handleDeleteFromGitHub(file);
                                  refreshFiles();
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete file</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="h-fit border-none bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-900/80">
            <CardContent className="p-6">
              {hoveredFile && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {React.createElement(getFileIcon(hoveredFile), {
                        className: "h-5 w-5",
                      })}
                      <h3 className="font-medium">{hoveredFile.name}</h3>
                    </div>
                  </div>
                  {hoveredFile.name
                    .toLowerCase()
                    .match(/\.(jpeg|jpg|gif|png|svg|webp)$/) && (
                    <img
                      src={hoveredFile.download_url}
                      alt={hoveredFile.name}
                      className="w-full cursor-zoom-in rounded-lg object-cover shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                      onClick={() =>
                        window.open(hoveredFile.download_url, "_blank")
                      }
                    />
                  )}
                  {hoveredFile.name
                    .toLowerCase()
                    .match(/\.(mp4|webm|mov)$/) && (
                    <video
                      src={hoveredFile.download_url}
                      className="w-full cursor-pointer rounded-lg shadow-lg transition-shadow hover:shadow-xl"
                      controls
                      autoPlay
                      muted
                      onClick={() =>
                        window.open(hoveredFile.download_url, "_blank")
                      }
                    />
                  )}
                </div>
              )}
              {!hoveredFile && (
                <div className="flex h-48 flex-col items-center justify-center gap-3 text-muted-foreground">
                  <Image className="h-8 w-8 opacity-50" />
                  <p>Hover over a file to preview</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Main component wrapped with Suspense
export default function Uploads() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UploadsContent />
    </Suspense>
  );
}
