"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId: orgId } : "skip"
    // if organization is defined make query, else wait till its ready
  );
  const createFile = useMutation(api.files.createFile);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{files?.map((file) => <div key={file._id}>{file.name}</div>)}</div>

      {/* <SignedIn> */}
      <Button
        onClick={() => {
          if (!orgId) return;
          createFile({
            name: "Hello world!!",
            orgId,
          });
        }}
        variant="link"
      >
        Upload File
      </Button>
      {/* </SignedIn> */}
    </main>
  );
}
{
  /* <SignedIn>
      <SignOutButton>
        <Button variant="ghost">Sign out</Button>
      </SignOutButton>
    </SignedIn>
    <SignedOut>
      <SignInButton mode="modal">
        <Button variant="ghost">Sign in</Button>
      </SignInButton>
    </SignedOut> */
}
