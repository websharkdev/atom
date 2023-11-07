import Image from "next/image";

type Props = {};

const HeroesBlock = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] aspect-square sm:w-[350px] md:w-[400px]">
          <Image
            src="/landing/documents.png"
            alt="documents image / png / black"
            fill
            className="w-full object-contain dark:hidden"
          />
          <Image
            src="/landing/documents-dark.png"
            alt="documents image / png / black"
            fill
            className="w-full object-contain hidden dark:block"
          />
        </div>
        <div className="relative w-[300px] aspect-square sm:w-[350px] md:w-[400px] hidden md:block">
          <Image
            src="/landing/reading.png"
            alt="reading image / png / black"
            fill
            className="w-full object-contain dark:hidden"
          />
          <Image
            src="/landing/reading-dark.png"
            alt="reading image / png / black"
            fill
            className="w-full object-contain hidden dark:block"
          />
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default HeroesBlock;
