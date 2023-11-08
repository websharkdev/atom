"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  PlusIcon,
  Trash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  onClick?: () => void;
  label: string;
  icon: LucideIcon;
};

const Item = ({
  id,
  documentIcon,
  active,
  isSearch,
  level = 0,
  expanded,
  onExpand,
  onClick,
  label,
  icon: Icon,
}: Props) => {
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  const router = useRouter();

  const { user } = useUser();

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };
  const ChevronsIcon = expanded ? ChevronDown : ChevronRight;

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentID) => {
        if (!expanded) {
          onExpand?.();
        }

        // router.push(`/documents/${documentID}`);
      }
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed  to create a new note",
    });
  };

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = archive({ id });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "The note has been successfully deleted!",
      error: "Failed to delete note",
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 font-medium flex items-center text-muted-foreground",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          className="rounded-sm h-full hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
          role="button"
        >
          <ChevronsIcon className="w-4 h-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex gap-1 rounded border bg-muted items-center text-[10px] h-5 select-none px-1.5 font-mono font-medium text-muted-foreground">
          <span className="text-xs">CTRL</span>K
        </kbd>
      )}

      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 aspect-square text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-64"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem
                onClick={onArchive}
                className="w-full cursor-pointer text-muted-foreground"
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-sm text-muted-foreground p-2">
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <PlusIcon className="h-4 w-4 aspect-square text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;

Item.Skeleton = function ItemSceleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
