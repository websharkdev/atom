"use client";

import { LogoBlock } from "@/components/layout";
import { Button } from "@/components/ui/button";

type Props = {};

const FooterBlock = (props: Props) => {
  return (
    <div className="flex items-center dark:bg-[#1f1f1f] w-full p-6 bg-background z-50">
      <LogoBlock />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default FooterBlock;
