import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

type Props = {};

const font = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
});

const LogoBlock = (props: Props) => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src={"/logo.svg"}
        alt="logo image"
        width={40}
        height={40}
        className="aspect-square object-contain"
      />
    </div>
  );
};

export default LogoBlock;
