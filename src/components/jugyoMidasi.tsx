import Link from "next/link";
import {textToLink} from "../libs/textLink"
import Star from "../components/Star"
import type {Class} from "../types/class";
import {deleteJugyo} from "../libs/deleteFunc"
import {useApiToken} from "../hooks/useApiToken"
type Props = {
  jugyo: Class;
  starNum: number
}

const JugyoTitle:React.FC<Props>=({jugyo, starNum})=>{
  const {apiToken}=useApiToken();
  const deleteJ=(deletee: (id: string, apiToken: string)=>void, i: string, a: string)=>{
    if (confirm('本当に削除しますか？')) {
      deletee(i, a);
  } else {
      console.log('キャンセルボタンが押されました。')
  }
  }
  return (
      <>
        <div className="w-full p-6 flex justify-center bg-blue-500 text-white">
          <div className="w-2/3">
            <h1 className="text-2xl pb-2">{jugyo.class_name}</h1>
            <h2 className="text-sm pb-2">{jugyo.teacher_name}</h2>
            <h2 className="pb-2">
              <Star rateNumber={starNum}></Star>
            </h2>
            <h3 className="text-xs text-white">キャンパス：{jugyo.campus}　学部：{jugyo.faculty}　分野：{jugyo.field ? jugyo.field : "記載なし"}</h3>
            <h3 className="mt-1 text-xs text-white">シラバスURL：{jugyo.url ? jugyo.url : "記載なし"}</h3>
        
          </div>
          <Link href={`/create/edit/${jugyo.id}`} className="text-sm  p-1 rounded-full">編集</Link>
          {apiToken ? <button onClick={()=>deleteJ(deleteJugyo, jugyo.id, apiToken)}>delete</button> : ""}
        </div>
      </>
  );
}

export default JugyoTitle