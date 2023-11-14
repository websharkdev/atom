"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";

type Props = {
  initialData: Doc<"documents">;
};

const Title = ({ initialData }: Props) => {
  const inputREF = useRef<HTMLInputElement>(null);
  const update = useMutation(api.documents.update);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title || "Untitled");

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputREF.current?.focus();
      inputREF.current?.setSelectionRange(0, inputREF.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    update({
      id: initialData._id,
      title: e.target.value || "Untitled",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      disableInput();
    }
  };
  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <>
          <Input
            ref={inputREF}
            placeholder=""
            onClick={enableInput}
            onBlur={disableInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={title}
            className="h-7 px-2 focus-visible:ring-transparent"
          />
        </>
      ) : (
        <>
          <Button
            onClick={enableInput}
            size="sm"
            className="font-normal h-auto p-1"
            variant="ghost"
          >
            {initialData?.title}
          </Button>
        </>
      )}
    </div>
  );
};

export default Title;

Title.Skeleton = function ItemSceleton() {
  return <Skeleton className="h-6 w-16 rounded-md" />;
};
