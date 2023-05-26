export default function ProfileSkeleton() {
  return (
    <div className="flex border-b pb-5 px-10">
      <div className="w-min self-center pr-10">
        <div className="w-44 h-44 bg-gray-300 rounded-full" />
      </div>
      <div className="w-7/12 flex flex-col gap-3 py-5">
        <div className="w-96 bg-gray-300 h-7 rounded" />
        <div className="w-48 bg-gray-300 h-6 rounded" />
      </div>
    </div>
  );
}
