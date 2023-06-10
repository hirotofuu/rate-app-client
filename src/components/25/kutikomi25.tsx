import {useState} from "react"
import KutikomiChoice from '../choices/kutikomiChoice'
import type {Kutikomi} from "../../types/kutikomi"


interface Props {
  Kutikomis: Kutikomi[];
}

const Kutikomis25: React.FC<Props> =({Kutikomis})=>{
  const [loadIndex, setLoadIndex] = useState(20);
  const [currentPost, setCurrentPost] = useState(Kutikomis);
  const [isEmpty, setIsEmpty] = useState(currentPost.length>20 ? false : true);

  const displayMore = () => {
    if (loadIndex > currentPost.length) {
      setIsEmpty(true);
    }else if(currentPost.length-loadIndex<25){
      setLoadIndex(loadIndex + 25);
      setIsEmpty(true);
    }else {
      setLoadIndex(loadIndex + 25);
    }
  };


  return(
    <>
      
      <div>
          {Kutikomis.slice(0, loadIndex).map((Kutikomi: Kutikomi, index: number)=>
          <KutikomiChoice key={index} kutikomi={Kutikomi}></KutikomiChoice>
          )}

          {!isEmpty ?<button className="w-full p-2 block hover:bg-gray-100  ml-auto  mr-auto mt-4  text-blue-500" 
            disabled={isEmpty ? true : false}
          onClick={displayMore}>もっと見る</button> : ''}
      </div>


    </>
  )
}

export default Kutikomis25