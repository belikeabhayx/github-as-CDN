import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Upload } from "lucide-react";
import useSelectedRepo from "@/hooks/useSelectedRepo";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

const FileUploader = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [allowOverwrite, setAllowOverwrite] = useState(true);
  const [commitInProgress, setCommitInProgress] = useState(false);
  const [uploadInProgress, setUploadInProgress] = useState(false);

  const { data: session } = useSession();
  const repo = useSelectedRepo();

  // ... (keeping all the existing functionality handlers)
  const updateFilesToState = (files: FileList | null | undefined) => {
    if (files === null || files === undefined) {
      return;
    }
    const file = files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader?.result?.toString().split(",")[1];
      setImage(base64 ?? null);
      setImageName(file.name);
      setFileType(file.type);
    };
  };

  const hasAllPermissions = () => {
    if (!session?.accessToken) {
      toast.error("Please login first");
      return false;
    }

    if (!repo) {
      toast.error("Please select a repo first");
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!hasAllPermissions()) return;
    setUploadInProgress(true);
    updateFilesToState(e.dataTransfer.files);
    setUploadInProgress(false);
  };

  const handleClick = () => {
    if (typeof window === "undefined") return;
    if (!hasAllPermissions()) return;
    document.getElementById("uploader-input")?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadInProgress(true);
    updateFilesToState(e.target.files);
    setUploadInProgress(false);
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    if (!hasAllPermissions()) return;
    setUploadInProgress(true);
    updateFilesToState(e.clipboardData?.files);
    setUploadInProgress(false);
  };

  const handleCommitToGitHub = async () => {
    if (typeof window === "undefined") return;
    setCommitInProgress(true);

    const accessToken = session?.accessToken;
    const repoFullName = repo?.full_name;
    const commitMessage = `Uploaded ${imageName} via Abhay`;
    const committer = {
      name: "AbhayBot",
      email: "noreply@abhaydev.vercel.app",
    };

    try {
      let fileSha: string | undefined;
      let uploadedContentUrl: string | undefined;
      const requestUrl = `https://api.github.com/repos/${repoFullName}/contents/uploads/${imageName}`;
      let requestMethod = "PUT";
      const requestHeaders = {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      };
      let requestBody = {
        message: commitMessage,
        content: image,
        committer,
        sha: fileSha,
      };

      const responseWithoutSha = await fetch(requestUrl, {
        method: requestMethod,
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });

      if (!responseWithoutSha.ok && responseWithoutSha.status !== 422) {
        const error = await responseWithoutSha.json();
        throw new Error(error.message);
      }

      if (responseWithoutSha.status === 422) {
        if (!allowOverwrite) {
          throw new Error(
            "File already exists. Please enable overwrite to replace the file."
          );
        }

        const responseForSha = await fetch(requestUrl, {
          method: "GET",
          headers: requestHeaders,
        });

        if (!responseForSha.ok) {
          const error = await responseForSha.json();
          throw new Error(error.message);
        }

        const data = await responseForSha.json();
        fileSha = data.sha;

        requestBody = {
          message: commitMessage,
          content: image,
          committer,
          sha: fileSha,
        };

        const responseWithSha = await fetch(requestUrl, {
          method: requestMethod,
          headers: requestHeaders,
          body: JSON.stringify(requestBody),
        });

        if (!responseWithSha.ok) {
          const error = await responseWithSha.json();
          throw new Error(error.message);
        }

        const dataWithSha = await responseWithSha.json();
        uploadedContentUrl = dataWithSha.content.download_url;
      }

      if (responseWithoutSha.ok && !uploadedContentUrl) {
        const data = await responseWithoutSha.json();
        uploadedContentUrl = data.content.download_url;
      }

      navigator.clipboard.writeText(uploadedContentUrl as string);

      toast.success(
        `File ${
          responseWithoutSha.ok ? "uploaded" : "updated"
        } successfully. Link copied to clipboard.`,
        {
          theme: "light",
          position: "top-right",
        }
      );

      setImage(null);
      setImageName(null);
      setFileType(null);
    } catch (error) {
      toast.error((error as any).message, {
        theme: "light",
        position: "top-right",
      });
    } finally {
      setCommitInProgress(false);
    }
  };

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [repo]);

  return (
    <div className="container mx-auto max-w-full w-full sm:max-w-[800px] px-4">
      {!image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mt-6"
        >
          {/* Social links section directly above the dropzone */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {[
              { icon: Github, href: "https://github.com/belikeabhayx" },
              { icon: Twitter, href: "https://x.com/belikeabhayx" },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/belikeabhayx",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-2 group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <motion.div
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <social.icon className="w-5 h-5 text-primary/80 group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
            <Link href={"/uploads"}>
              <button className="inline-flex h-10 animate-shimmer items-center justify-center rounded-xl border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <Upload className="w-5 h-5 mr-2" />
                <span>Check Uploads</span>
              </button>
            </Link>
          </div>

          {/* File Dropzone */}
          <div
            id="dropzone"
            className="p-4 sm:p-8 bg-card/50 backdrop-blur-sm border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors rounded-lg cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={handleClick}
          >
            <div className="text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">
                Drop a file or click to upload
              </h3>
              <p className="text-muted-foreground mb-4">
                Press{" "}
                <span className="px-2 py-1 text-sm bg-primary text-primary-foreground rounded">
                  CMD
                </span>
                {" + "}
                <span className="p-1 text-sm bg-primary text-primary-foreground rounded">
                  V
                </span>{" "}
                to paste
              </p>
            </div>
            <input
              type="file"
              name="uploader"
              id="uploader-input"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </motion.div>
      )}

      {uploadInProgress && (
        <div className="text-center text-muted-foreground">reading file...</div>
      )}

      {/* display name if image uploaded */}
      {imageName && (
        <div className="my-2 flex">
          <textarea
            value={imageName}
            className="mr-2 w-full rounded-md border border-input bg-transparent px-2 py-1 text-sm focus:border-primary focus:outline-none"
            onChange={(e) => setImageName(e.target.value)}
          />
          <button
            className="flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            onClick={handleCommitToGitHub}
          >
            Upload to Github{" "}
            {commitInProgress && (
              <svg
                className="ml-2 size-5 animate-spin text-primary-foreground"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </button>
        </div>
      )}

      {imageName && (
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="allow-overwrite"
              name="allow-overwrite"
              type="checkbox"
              className="size-4 rounded border-input text-primary focus:ring-primary"
              onChange={(e) => setAllowOverwrite(e.target.checked)}
              checked={allowOverwrite}
            />
          </div>
          <div
            className="ml-3 select-none text-sm"
            onClick={() => setAllowOverwrite(!allowOverwrite)}
          >
            <label className="font-medium text-foreground">
              overwrite file if exists
            </label>
          </div>
        </div>
      )}
      {/* this component will show the uploaded image */}
      {image && (
        <>
          {fileType === "image/png" && (
            <img src={`data:image/png;base64,${image}`} alt="uploaded" />
          )}
          <button
            className="mt-2 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            onClick={() => {
              setImage(null);
              setImageName("");
              setFileType("");
            }}
          >
            Reset upload
          </button>
        </>
      )}
    </div>
  );
};

export default FileUploader;
