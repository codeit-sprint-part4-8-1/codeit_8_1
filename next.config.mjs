/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 외부 이미지 사용시 해당 이미지 도메인 설정
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
};

export default nextConfig;
