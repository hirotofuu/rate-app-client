import Link from "next/link";
const Header=()=>{

  return (
      <>
        <header className="flex justify-between bg-white h-12 items-center border-b-2">
          <Link href="/" className="xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl text-3xl lg:ml-6 xl:ml-6 md:ml-6 sm:ml-6 ml-1">慶應楽単</Link>

          <div className="flex mr-3">
            <input type="text" placeholder="Search" className="xl:w-96 lg:w-96 md:w-96 w-44 pl-2 h-8 rounded-l-lg bg-gray-200 "/>
            <button className="h-8 bg-slate-200 rounded-r-3xl">あ</button>
          </div>

          <nav className="mr-3 gap-5 hidden xl:flex lg:flex md:flex sm:flex items-center">
            <Link href="/create/jugyo" className="p-1 rounded-lg bg-blue-500 text-white hover:text-blue-500 hover:bg-white">授業＋</Link>
            <Link href="/create/jugyo" className="p-1 rounded-lg bg-blue-500 text-white hover:text-blue-500 hover:bg-white">口コミ＋</Link>
          </nav>
        </header>
      </>
  );
}

export default Header