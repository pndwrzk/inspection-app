type ProgressProps = {
  progress: number;
};
export default function ProgresBarUpload({ progress }: ProgressProps) {
  return (
    <>
      {!!progress && (
        <div className="relative w-full border p-4 rounded-md bg-white shadow-sm">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
