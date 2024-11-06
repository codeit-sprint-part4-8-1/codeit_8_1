import { ClipLoader } from 'react-spinners';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <ClipLoader color="#0B3B2D" loading={true} size={80} />
    </div>
  );
}
