import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-screen-md border border-gray-100 bg-white py-3 shadow  md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <Link
            aria-current="page"
            className=" flex items-center clear-start font-bold py-2 px-4 border rounded-2xl bg-[#9F0504] text-white"
            href="/"
          >
            InspectionApp
          </Link>

          <a
            className="cursor-pointer text-gray-800 hover:text-blue-700 hover:underline px-3 py-2 text-sm font-semibold"
            href="mailto:pandiwarizki.rp@gmail.com"
          >
            Help???
          </a>
        </div>
      </div>
    </header>
  );
}
