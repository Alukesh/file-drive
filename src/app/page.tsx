"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useSession,
} from "@clerk/nextjs";
import { api } from "../../convex/_generated/api";

export default function Home() {
  // const session = useSession();
  const files = useQuery(api.files.getFiles);
  const createFile = useMutation(api.files.createFile);
  console.log(files);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button variant="ghost">Sign out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="ghost">Sign in</Button>
        </SignInButton>
      </SignedOut>

      {files?.map((file) => <div key={file._id}>{file.name}</div>)}

      {/* <SignedIn> */}
        <Button
          onClick={() => createFile({ name: "Hello world!!" })}
          variant="link"
        >
          Upload File
        </Button>
      {/* </SignedIn> */}
    </main>
  );
}
