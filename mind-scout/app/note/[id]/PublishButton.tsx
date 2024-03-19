"use client";

import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiShare1 } from "react-icons/ci";

const PublishButton = ({ noteid }: { noteid: string }) => {
  const router = useRouter();
  const [isSharing, setSharing] = useState(false);
  const [error, setError] = useState(false);

  const handlePublicNote = async () => {
    try {
      setSharing(true);
      await axios.patch("/api/note/" + noteid, { scope: "PUBLIC" });
      router.refresh();
    } catch {
      console.log(error);
      setSharing(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="brown" disabled={isSharing}>
            <CiShare1 />
            Public This Note
            {isSharing && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to Public this? This action cannot be undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="4">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="brown" onClick={handlePublicNote}>
                Go Public
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This note could not be Publiced
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="4"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};
export default PublishButton;
