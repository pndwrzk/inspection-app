export default function Home() {
  return (
    <div className="mt-[120px] bg-white/80 mx-auto w-full py-3 max-w-screen-lg  md:rounded-3xl shadow ">
      <div className="flex flex-col md:flex-row w-full  h-[500px] overflow-hidden">
        <div className="w-full md:w-[30%] border-r   p-4">
          <p>Left Content</p>
        </div>
        <div className="w-full md:w-[70%]  p-4 overflow-auto">
          <p>Right Content</p>
          <div className="h-[800px] bg-gray-300 mt-4">Content panjang</div>
        </div>
      </div>
    </div>
  );
}
