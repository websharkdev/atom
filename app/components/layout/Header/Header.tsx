"use client";

import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { Spinner } from "..";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

type Props = {};

const HeaderBlock = (props: Props) => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Document & Plans. Welcome to{" "}
        <span className="underline">Atom.</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Atom. is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <Spinner size={"lg"} />
        </div>
      )}

      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Atom.
            <ArrowRight className="w-4 aspect-square ml-2" />
          </Link>
        </Button>
      )}

      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Atom. free
            <ArrowRight className="w-4 aspect-square ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default HeaderBlock;
