import { Navbar } from "@/components/layout";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="h-full dark:bg-[#1f1f1f]">
      <Navbar />
      <main className="h-full pt-40 dark:bg-[#1f1f1f]">{children}</main>
    </div>
  );
};

export default MarketingLayout;
