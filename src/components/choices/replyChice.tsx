import type {Reply} from "../../types/comment"
import { useState, ChangeEvent, useEffect } from "react";
import axios from '../../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import TextareaComment from "../../components/input/textareComment"
type Props={
  reply: Reply;
}


const ReplyChoice: React.FC<Props> =({reply})=>{
  return(
    <>
    <div  className="mb-5">

      <div className="ml-1 text-sm w-full">
        <p className="mb-1 font-medium mr-6 font-semibold"><span className="text-blue-500">{reply.id}</span> {reply.name ? reply.name : "名無しさん"} <span className="font-normal text-1 font-normal text-gray-500">| {reply.day}</span></p>
        <p>{reply.reply}</p>
      </div>
    </div>

    </>
  )
}

export default ReplyChoice