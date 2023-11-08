"use client";

import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  documentId: Id<"documents">;
};

const Banner = ({ documentId }: Props) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: " Failed to delete note.",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note restored!",
      error: " Failed to restore note.",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm text-white p-2 flex items-center justify-center gap-x-2">
      <p className="text-sm">This page is in the trash</p>
      <Button
        onClick={onRemove}
        size="sm"
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
