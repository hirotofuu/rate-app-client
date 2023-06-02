import Link from "next/link";
import Modal from "../components/modal";
import { useState } from "react";
const NotFound=(props: any)=>{
  const buttonName: string=props.buttonName
  const type: boolean=props.type
  const url: string=props.url
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
      <>
        <section className="text-center mt-10">
          <h2 className="text-6xl">😿</h2>
          <h3 className="mt-6 text-lg">ここには何もありません</h3>
          {
            type ? 
            <Link href={url} className=" p-1 text-blue-500 font-semibold rounded-full hover:underline">{buttonName}</Link>
            :
            <button onClick={()=>setIsOpen(true)} className=" p-1 text-blue-500 font-semibold rounded-full hover:underline">{buttonName}</button>
          }
        </section>
        <Modal isOpen={isOpen} type={false} onClose={() => setIsOpen(false)}></Modal>
      </>
  );
}

export default NotFound