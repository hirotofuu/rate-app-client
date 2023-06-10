import {useState} from "react"
import CommentChoice from '../choices/commentChoice'
import type {Comment} from "../../types/comment"


interface Props {
  Comments: Comment[];
}

const Comments25: React.FC<Props> =({Comments})=>{
  const [loadIndex, setLoadIndex] = useState(10);
  const [currentPost, setCurrentPost] = useState(Comments);
  const [isEmpty, setIsEmpty] = useState(currentPost.length>10 ? false : true);

  const displayMore = () => {
    if (loadIndex > currentPost.length) {
      setIsEmpty(true);
    }else if(currentPost.length-loadIndex<15){
      setLoadIndex(loadIndex + 10);
      setIsEmpty(true);
    }else {
      setLoadIndex(loadIndex + 10);
    }
  };


  return(
    <>
      
      <div>
          {Comments.slice(0, loadIndex).map((Comment: Comment, index: number)=>
          <CommentChoice key={index} comment={Comment}></CommentChoice>
          )}

          {!isEmpty ?<button className="w-full p-2 block hover:bg-gray-100  ml-auto  mr-auto bg-white  text-blue-500" 
            disabled={isEmpty ? true : false}
          onClick={displayMore}>もっと見る</button> : ''}
      </div>


    </>
  )
}

export default Comments25