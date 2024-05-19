import NextImage from "next/image";
import headerLogo from "../../public/logo.svg";

type Props = {};

export const Header = (props: Props) => {
  return (
    <>
      <header className=" flex h-[7%] w-full items-center border-b-2 border-solid border-[#B3B3B3] px-8">
        <div className=" flex items-center gap-2">
          <NextImage
            src={headerLogo}
            alt="headerLogo"
            quality={100}
            sizes="100vw"
          />
          <p className="">Akihiro Chat</p>
        </div>
      </header>
    </>
  );
};
