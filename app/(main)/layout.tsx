"use client";

import { Spinner } from "@/components/layout";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Navigation } from "./_components";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#1f1f1f]">
      <Navigation />
      <main className="flex-1 overflow-y-auto h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
