import { ClipLoader } from 'react-spinners';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <ClipLoader color="#36d7b7" loading={true} size={50} />
    </div>
  );
}
