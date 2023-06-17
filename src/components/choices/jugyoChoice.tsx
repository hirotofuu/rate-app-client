import Link from "next/link";
import type {Class} from "../../types/class"
import Star from "../Star"
type Props = {
  jugyo: Class;
};

const JugyoChoice: React.FC<Props>=({jugyo})=>{
  let stars: number=0;
  for(const x of jugyo.stars){
    stars=stars+x[0];
  }

  return (
      <>
        <li className="list-none">
          <Link  href={`/class/${jugyo.id}`}  className="block group bg-white mt-2 p-4 w-full border-4">
              <h1 className="text-md pb-1 font-semibold group-hover:text-blue-500">{jugyo.class_name}</h1>
              <h2 className="pb-2 text-sm">{jugyo.teacher_name}</h2>
              <h2 className="flex gap-1 pb-2 text-sm">
                <Star rateNumber={stars!=0 ? stars/jugyo.stars.length : 0}></Star>
                ({jugyo.stars.length})
              </h2>
              <h3 className="text-xs text-gray-600">キャンパス：{jugyo.campus}　学部：{jugyo.faculty}</h3>
          </Link>
        </li>
      </>
  );
}

export default JugyoChoice

