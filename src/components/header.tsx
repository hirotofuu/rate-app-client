import Link from "next/link";
import Modal from "./modals/modal"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons'
import { useState , ChangeEvent} from "react";
import { useRouter } from "next/router";
import { Button, Drawer } from "@mui/material";
import NavBar from "../components/navBar"



const Header:React.FC=()=>{
  const router=useRouter();
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput]=useState<string>('');
  const [type, setType]=useState<boolean>(true);
  const [isDrawer, setIsDrawer]=useState<boolean>(false);
  const goSearch=()=>{
    if(!input)return 0
    router.push({
      pathname:'/search',
        query: {faculty : "all", campus: "all", class_name: input, teacher_name: "all"},
      });
  }
  return (
      <>
        <header className="flex justify-between bg-white h-12 items-center border-b-2">
          <Link href="/" className="xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl text-3xl lg:ml-6 xl:ml-6 md:ml-6 sm:ml-6 ml-1">慶應楽単</Link>

          <div className="hidden xl:flex lg:flex md:flex sm:flex mr-3">
            <input type="text" placeholder="検索" className="xl:w-96 lg:w-96 rounded-l-xl w-44 pl-2 h-8 bg-gray-200"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>)=>{setInput(e.target.value)}}
            />
            <button onClick={goSearch} className="h-8 bg-slate-200 rounded-r-3xl"><FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg p-2 "/></button>
          </div>

          <nav className="mr-3 gap-5 hidden xl:flex lg:flex md:flex sm:flex items-center">
            <button onClick={() =>{
            setType(false)
            setIsOpen(true)}}
            className="p-2 rounded-md bg-indigo-500 text-white text-xs font-semibold hover:text-indigo-500 hover:bg-white">
            授業＋</button>
            <button onClick={() =>{
            setType(true)
            setIsOpen(true)}}
            className="p-2 rounded-md bg-indigo-500 text-white text-xs font-semibold hover:text-indigo-500 hover:bg-white">
            口コミ＋</button>
          </nav>
          <nav className="flex xl:hidden lg:hidden md:hidden sm:hidden">
            <button onClick={()=>{setIsOpenSearch(!isOpenSearch)}} className="mr-4 text-3xl text-indigo-500 p-2"><FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg p-2 "/></button>
            <button onClick={()=>setIsDrawer(true)} className="mr-4 text-3xl text-indigo-500 p-2"><FontAwesomeIcon icon={faBars}/></button>
          </nav>
        </header>

        {isOpenSearch ? 
          <div className="m-2">
            <input type="text" placeholder="検索" className="w-full rounded-xl w-44 pl-2 h-10 bg-white"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>)=>{setInput(e.target.value)}}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                goSearch()
              }
            }}
            />
          </div>
        : ""}
        
        <Drawer
        anchor={'top'}
        open={isDrawer}
        onClose={()=>setIsDrawer(false)}
        >
          <NavBar 
          onModalK={()=>{
              setIsDrawer(false);
              setType(true);
              setIsOpen(true);
          }}
          onModalJ={()=>{
            setIsDrawer(false);
            setType(false);
            setIsOpen(true);         
          }}
          ></NavBar>
        </Drawer>
        <Modal isOpen={isOpen} type={type} onClose={() => setIsOpen(false)}></Modal>
      </>
  );
}

export default Header