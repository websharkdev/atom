"use client";
import { Doc } from "@/convex/_generated/dataModel";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useOrigin from "@/shared/hooks/useOrigin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, CopyIcon, GlobeIcon } from "lucide-react";

type Props = {
  initialData: Doc<"documents">;
};

const Publish = ({ initialData }: Props) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmiting(true);
    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmiting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note published",
      error: "Failed  to publish",
    });
  };

  const onUnPublish = () => {
    setIsSubmiting(true);
    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmiting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note unpublishing",
      error: "Failed  to unpublish",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Published
          {initialData.isPublished && (
            <GlobeIcon className="w-4 h-4 aspect-square object-contain text-sky-500 ml-2" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <GlobeIcon className="text-sky-500 animate-pulse h-4 w-4 aspect-square object-contain" />
              <p className="text-xs font-medium text-sky-500">
                This note is live on web
              </p>
            </div>

            <div className="flex items-center">
              <input
                value={url}
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                disabled
              />
              <Button
                onClick={onCopy}
                size="icon"
                disabled={copied}
                variant="ghost"
              >
                {copied ? (
                  <Check className="w-3 h-3 aspect-square object-contain text-muted-foreground" />
                ) : (
                  <CopyIcon className="w-3 h-3 aspect-square object-contain text-muted-foreground" />
                )}
              </Button>
            </div>
            <Button
              className="w-full text-xs"
              onClick={onUnPublish}
              disabled={isSubmiting}
              size="sm"
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <GlobeIcon className="w-8 h-8 aspect-square object-contain text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others
            </span>
            <Button
              disabled={isSubmiting}
              onClick={onPublish}
              className="w-full text-xs"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
