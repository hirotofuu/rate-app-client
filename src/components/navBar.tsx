import Link from "next/link";
import Modal from "./modals/modal"
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";

type Props={
  onModalK: VoidFunction
  onModalJ: VoidFunction
}

const NavBar:React.FC<Props>=({onModalK, onModalJ})=>{
  return (
      <>
          <nav className="bg-white">
            <button 
            onClick={onModalJ} 
            className="block w-full flex p-2 pl-6 border-b hover:text-blue-500">授業を作る</button>
            <button 
            onClick={onModalK}  
            className="block w-full flex p-2 pl-6 border-b hover:text-blue-500">口コミを作る</button>
            <Link href="/about" className="block w-full flex p-2 pl-6 border-b hover:text-blue-500">about</Link>
          </nav>
      </>
  );
}

export default NavBar