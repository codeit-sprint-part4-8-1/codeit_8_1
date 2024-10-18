import Image from "next/image";
import Link from "next/link";

const AuthLogo: React.FC = () => {
  return (
    <Link href="/">
      <div
        className="relative w-[270px] h-[154px] md:w-[340px] md:h-[192px]"
      >
        <Image
          src="/logo_big.svg"
          alt="global nomad logo"
          fill
          sizes="100%"
          priority
        />
      </div>
    </Link>
  );
};

export default AuthLogo;
