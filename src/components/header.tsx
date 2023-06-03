import Link from "next/link";
import Modal from "../components/modal"
import { useState , ChangeEvent} from "react";
import { useRouter } from "next/router";



const Header:React.FC=()=>{
  const router=useRouter();
  const [selectInput, setSelectInput]=useState<string>('class');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput]=useState<string>();
  const [type, setType]=useState<boolean>(true);
  const goSearch=()=>{
    if(!input)return 0
    if(selectInput=="class"){
    router.push({
      pathname:'/search',
        query: {faculty : "all", campus: "all", class_name: input, teacher_name: "all"},
      });
    }else{
      router.push({
        pathname:'/search',
        query: {faculty : "all", campus: "all", class_name: "all", teacher_name: input}
      }); 
    }
  }
  return (
      <>
        <header className="flex justify-between bg-white h-12 items-center border-b-2">
          <Link href="/" className="xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl text-3xl lg:ml-6 xl:ml-6 md:ml-6 sm:ml-6 ml-1">慶應楽単</Link>

          <div className="flex mr-3">
            <select name="what" className=" p-1 h-8 rounded-l-lg bg-gray-300 text-xs"
            value={selectInput}
            onChange={(e: ChangeEvent<HTMLSelectElement>)=>{setSelectInput(e.target.value)}}
            >
            <option key="class" value="class">授業名</option>
            <option key="teacher" value="teacher">担当名</option>
            </select>
            <input type="text" placeholder="検索" className="xl:w-96 lg:w-96 md:w-96 w-44 pl-2 h-8 bg-gray-200"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>)=>{setInput(e.target.value)}}
            />
            <button onClick={goSearch} className="h-8 bg-slate-200 rounded-r-3xl">あ</button>
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
        </header>
        <Modal isOpen={isOpen} type={type} onClose={() => setIsOpen(false)}></Modal>
      </>
  );
}

export default Header