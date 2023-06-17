import Link from "next/link";
import Modal from "./modals/modal"
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";



const NavBar:React.FC=()=>{
  const router=useRouter();
  const [selectInput, setSelectInput]=useState<string>('class');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType]=useState<boolean>(true);
  return (
      <>
          <nav className="bg-white">
            <button 
            onClick={() =>{
            setType(false)
            setIsOpen(true)}} 
            className="block w-full flex p-2 pl-6 border-b hover:text-blue-500">授業を作る</button>
            <button 
            onClick={() =>{
            setIsOpen(true)}}  
            className="block w-full flex p-2 pl-6 border-b hover:text-blue-500">口コミを作る</button>
            <Link href="/about" className="block w-full flex p-2 pl-6 border-b hover:text-blue-500">about</Link>
          </nav>
        <Modal isOpen={isOpen} type={type} onClose={() => setIsOpen(false)}></Modal>
      </>
  );
}

export default NavBar