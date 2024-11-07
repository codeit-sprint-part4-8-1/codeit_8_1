const StatusCalendarSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between w-[792px]">
        <div className="h-10 w-10 rounded-md bg-gray-300"></div>
        <div className="h-10 w-36 rounded-md bg-gray-300"></div>
        <div className="h-10 w-10 rounded-md bg-gray-300"></div>
      </div>
      <div className="h-[792px] w-[792px] rounded-md bg-gray-300"></div>
    </div>
  );
};

export default StatusCalendarSkeleton;
