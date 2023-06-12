import type {Comment, Reply, newReply} from "../../types/comment"
import { useState, ChangeEvent} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import ReplyChoice from "../choices/replyChice"
import NewReplyChoice from "../choices/newReplyChoice"
import axios from '../../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import TextareaComment from "../../components/input/textareComment"
type Props={
  comment: Comment;
}

type replyInput={
  name: string;
  day: string;
  reply: string;
  comment_id: string;
}

const CommentChoice: React.FC<Props> =({comment})=>{
  const now = new Date();
  const [replyDraft, setReplyDraft]=useState<replyInput>({
    name: "",
    day:  `${now.getFullYear()}/${(now.getMonth() + 1)}/${now.getDate()}`,
    reply: "",
    comment_id: comment.id,
  })
  const [displayReply, setDisplayRply]=useState<Reply[]>(comment.replies);
  const [newplayReply, setNewplayRply]=useState<newReply[]>([]);
  const [isReply, setIsRepy]=useState<boolean>(false)

  const updateCreateTextForm=(e: ChangeEvent<HTMLTextAreaElement>)=>{
    setReplyDraft({ ...replyDraft, [e.target.name]: e.target.value });
  }
  const updateRegisterForm = (e: ChangeEvent<HTMLInputElement>) => {
    setReplyDraft({ ...replyDraft, [e.target.name]: e.target.value });
  };

  const register = () => {
    if(!replyDraft.reply)return;
        axios
          .post('/api/createReply', replyDraft)
          .then((res: AxiosResponse) => {
            setNewplayRply([
              ...newplayReply, 
              {
              name: replyDraft.name,
              day: replyDraft.day,
              reply: replyDraft.reply,
            }, ]);
            setReplyDraft({...replyDraft, reply: ""})
          })
          .catch((err: AxiosError) => {
            console.log(err)
          });
  };
  
  return(
    <>
    <div  className=" pt-3 pb-3 pl-3 pr-3 border-b" key={comment.id}>

      <div className="ml-1 w-full">
        <p className="pt-1  text-sm font-medium mr-6 font-semibold"><span className="text-blue-500">{comment.id}</span> {comment.name ? comment.name : "名無しさん"} <span className="font-normal text-1 font-normal text-gray-500">| {comment.day}</span></p>
      
        <p className="mt-2 text-sm ">{comment.comment}</p>
      </div>


      <button onClick={()=>setIsRepy(!isReply)} className="text-xs border-2 mt-3 p-1 font-semibold rounded-full">
        {isReply ? <FontAwesomeIcon icon={faCaretDown} className="mr-1"/>: <FontAwesomeIcon icon={faCaretUp} className="mr-1"/>}
        返信{displayReply.length}件
      </button>


      {isReply ? <ul className=" w-2/3 ml-3 pt-3 pl-3 border-l-2">
        {newplayReply.map((rep: newReply, index: number)=>
        <li key={index}><NewReplyChoice reply={rep}></NewReplyChoice></li>
        )}
        {displayReply.map((rep: Reply, index: number)=>
        <li key={index}><ReplyChoice reply={rep}></ReplyChoice></li>
        )}
        <input
        type="text"
        name="name"
        value={replyDraft.name}
        onChange={updateRegisterForm}
        placeholder="名前(省略可)"
        className="mb-2 text-sm border border-gray-500 w-60 "/>
        <TextareaComment
        holder="返信コメントを書く"
        name="reply"
        value={replyDraft.reply}
        updateTextarea={updateCreateTextForm}
        uploadTextarea={register}></TextareaComment>
      </ul> : ""}
    </div>

    </>
  )
}

export default CommentChoice