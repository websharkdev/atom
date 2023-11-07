"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

type Props = {};

const Documents = (props: Props) => {
  const { user } = useUser();

  const create = useMutation(api.documents.create);

  const handleCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed  to create a new note",
    });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/main/empty.png"
        width={300}
        height={300}
        className="aspect-square object-contain dark:hidden"
        alt="empty"
      />
      <Image
        src="/main/empty-dark.png"
        width={300}
        height={300}
        className="aspect-square object-contain hidden dark:block"
        alt="empty"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos; Atom.
      </h2>
      <Button onClick={handleCreate}>
        <PlusCircle className="h-4 aspect-square mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default Documents;
