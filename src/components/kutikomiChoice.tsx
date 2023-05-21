import Link from "next/link";
const KutikomiChoice=(props: any)=>{
  const kutikomi=props.kutikomi
  return (
      <>
        <li className="list-none">
          <Link href={`/kutikomi/${kutikomi.id}`} className="block group w-full mt-2 p-6 border-4 bg-white">
            <div className="flex justify-between gap-2 pb-2 text-sm border-b-2">
              <div className="flex gap-2">
                <h1>{kutikomi.evaluate}</h1>
                <span className="text-gray-300">|</span>
                <h1>{kutikomi.rate}</h1>
              </div>
              <h1>投稿日：{kutikomi.day}</h1>
            </div>
            <h2 className="text-sm mt-3">【コメント】</h2>
            <p className="text-sm mt-1">{kutikomi.comment}</p>
            <h3 className="text-xs text-gray-500 mt-3  group-hover:text-blue-500">もっと見る</h3>
          </Link>
        </li>
      </>
  );
}

export default KutikomiChoice