import Image from "next/image";
import Link from "next/link";

const AuthLogo: React.FC = () => {
  return (
    <Link href="/">
      <div className="relative w-vw-50 h-[154px] md:w-vw-35 md:h-[192px]"> {/* 높이 설정 */}
        <Image
          src="/logo_big.svg"
          alt="global nomad logo"
          fill
          sizes="100%"
          style={{ objectFit: 'contain' }} // 비율 유지
          priority
        />
      </div>
    </Link>
  );
};

export default AuthLogo;
