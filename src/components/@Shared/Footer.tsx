import React from 'react';
import Image from 'next/image';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer
      className={`bg-nomadBlack text-gray-900 h-40 mt-10 flex flex-col items-center justify-center px-4 ${className}`}
    >
      <div className="w-full max-w-7xl flex flex-col tablet:flex-row justify-between items-center py-6">
        {/* 저작권 텍스트 */}
        <p className="text-center tablet:text-left mb-4 tablet:mb-0">
          © codeit - 2024
        </p>

        {/* Privacy Policy와 FAQ */}
        <div className="flex space-x-4 text-center tablet:text-left mb-4 tablet:mb-0">
          <a
            href="https://www.codeit.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            Privacy Policy
          </a>
          <a
            href="https://www.codeit.kr/faq"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            FAQ
          </a>
        </div>

        {/* SNS 아이콘 */}
        <div className="flex space-x-4 justify-center tablet:justify-end">
          <a
            href="https://www.facebook.com/codeit.kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/ico/ico_facebook.svg"
              alt="페이스북 아이콘"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://x.com/codeitkr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/ico/ico_twitter.svg"
              alt="트위터 아이콘"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.youtube.com/channel/UCCM79CPm2WbBYTRaiNEExbg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/ico/ico_youtube.svg"
              alt="유튜브 아이콘"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.instagram.com/codeit_kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/ico/ico_instagram.svg"
              alt="인스타그램 아이콘"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
