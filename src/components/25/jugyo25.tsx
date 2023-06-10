import {useState} from "react"
import JugyoChoice from '../choices/jugyoChoice'
import type {Class} from "../../types/class"


interface Props {
  Jugyos: Class[];
}

const Jugyos25: React.FC<Props> =({Jugyos})=>{
  const [loadIndex, setLoadIndex] = useState(20);
  const [currentPost, setCurrentPost] = useState(Jugyos);
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
          {Jugyos.slice(0, loadIndex).map((Jugyo: Class, index: number)=>
          <JugyoChoice key={index} jugyo={Jugyo}></JugyoChoice>
          )}

          {!isEmpty ?<button className="w-full p-2 block hover:bg-gray-100  ml-auto  mr-auto mt-4  text-blue-500" 
            disabled={isEmpty ? true : false}
          onClick={displayMore}>もっと見る</button> : ''}
      </div>


    </>
  )
}

export default Jugyos25