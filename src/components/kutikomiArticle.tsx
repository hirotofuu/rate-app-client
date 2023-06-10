import Link from "next/link";
import KutikomiFactor from "./kutikomiFactor"
import type {Kutikomi} from "../types/kutikomi";
import type {Class} from "../types/class";
import  Star from "../components/Star"
type Props = {
  kutikomi: Kutikomi;
  jugyo: Class;
}

const KutikomiArticle:React.FC<Props>=({kutikomi, jugyo})=>{
  return (
      <>
        <article className="mt-10">
          <div className="p-4 bg-white">
            <h1 className=" text-xl font-semibold hover:text-blue-500 hover:underline"><Link href={`/class/${jugyo.id}`}>
              {jugyo.class_name}の口コミ</Link></h1>
          </div>

          <div className="mt-6 pb-4 bg-white">
            <h2 className="px-4 py-2 w-full bg-blue-500 text-white border-b-2 ">口コミ基本情報</h2>
            <KutikomiFactor title="授業名" content={jugyo.class_name}></KutikomiFactor>
            <KutikomiFactor title="担当" content={jugyo.teacher_name}></KutikomiFactor>
            <KutikomiFactor title="投稿日" content={kutikomi.day}></KutikomiFactor>
          </div>

          <div className="pt-4 bg-white">
            <h2 className="px-4 py-2 w-full bg-blue-500 text-white border-b-2 ">口コミ</h2>
            <KutikomiFactor title="出席" content={kutikomi.attend}></KutikomiFactor>
            <KutikomiFactor title="形式" content={kutikomi.type}></KutikomiFactor>
            <KutikomiFactor title="教科書" content={kutikomi.text}></KutikomiFactor>
            <KutikomiFactor title="テスト" content={kutikomi.test}></KutikomiFactor>
            <KutikomiFactor title="課題" content={kutikomi.task}></KutikomiFactor>
            <KutikomiFactor title="難易度" content={kutikomi.evaluate}></KutikomiFactor>
            <KutikomiFactor title="まとめ" content={kutikomi.comment}></KutikomiFactor>
            <section className="flex gap p-2 mx-2 border-b-2">
              <h3 className="w-1/5 p-2 text-sm font-semibold border-blue-500">評価</h3>
              <p className="w-4/5 p-2 text-sm border-l-2"><Star rateNumber={kutikomi.rate}></Star></p>
            </section>
          </div>
        </article>

      </>
  );
}

export default KutikomiArticle