import Link from "next/link";
import {textToLink} from "../libs/textLink"
import type {Class} from "../types/class";

type Props = {
  jugyo: Class;
}

const JugyoTitle:React.FC<Props>=({jugyo})=>{
  return (
      <>
        <div className="w-full p-6 flex justify-center bg-blue-500 text-white">
          <div className="w-2/3">
            <h1 className="text-2xl pb-2">{jugyo.class_name}</h1>
            <h2 className="text-sm pb-1">{jugyo.teacher_name}</h2>
            <h3 className="text-xs text-white">キャンパス：{jugyo.campus}　学部：{jugyo.faculty}　分野：{jugyo.field ? jugyo.field : "記載なし"}</h3>
            <h3 className="mt-1 text-xs text-white">シラバスURL：{jugyo.url ? jugyo.url : "記載なし"}</h3>
        
          </div>
          <Link href={`/create/edit/${jugyo.id}`} className="text-xs h-11 p-3 border-2 rounded-full">編集</Link>
        </div>
      </>
  );
}

export default JugyoTitle