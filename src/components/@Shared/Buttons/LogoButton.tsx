import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 로고 버튼 컴포넌트
const LogoButton: React.FC = () => {
  return (
    <Link href={'/'}>
      <Image
        src="/logo_md.svg"
        alt="GlobalNomad 로고"
        width={172}
        height={30}
      />
    </Link>
  );
};

export default LogoButton;
