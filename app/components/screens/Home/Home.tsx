import { FooterBlock, HeaderBlock, HeroesBlock } from "@/components/layout";

type Props = {};

const HomeBlock = (props: Props) => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col justify-center items-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <HeaderBlock />
        <HeroesBlock />
      </div>
      <FooterBlock />
    </div>
  );
};

export default HomeBlock;
