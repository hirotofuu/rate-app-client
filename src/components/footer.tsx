import Link from "next/link";



const Footer:React.FC=()=>{
  return (
      <>
         <footer className="full p-6 bg-indigo-700 ">
          <nav className="text-white ">
            <Link href="/">慶應楽単</Link>
            <Link href="/about" className="ml-10">about</Link>
          </nav>

         </footer>
      </>
  );
}

export default Footer