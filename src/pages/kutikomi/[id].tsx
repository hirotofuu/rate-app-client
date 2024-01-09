import Link from "next/link";
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import {showJugyo, showKutikomis, fetchComment} from '../../libs/fetchFunc'
import type {Class} from "../../types/class";
import type {Kutikomi} from "../../types/kutikomi";
import type {Comment} from "../../types/comment";
import { useState, ChangeEvent, useEffect } from "react";
import axios from '../../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import Footer from '../../components/footer';
import Comments25 from "../../components/25/comment25"
import Frame from '../../components/frame';
import Header from '../../components/header';
import NotFoundC from '../../components/notFoundComment';
import CommentChoice from "../../components/choices/commentChoice";
import KutikomiArticle from '../../components/kutikomiArticle';
import TextareaComment from "../../components/input/textareComment";
import Meta from "../../components/meta"

export const getStaticProps: GetStaticProps = async (context) => {
  const id: any = context.params?.id;
  const kutikomi: Kutikomi=await showKutikomis(id);
  const jugyo: Class=await showJugyo(kutikomi.jugyo_id);
  const comments: Comment[]=await fetchComment(id);
  return{
    props: {
        kutikomi,
        jugyo,
        comments
    },
    revalidate: 120
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking', 
  };
};

type Factor={
  kutikomi: any;
  jugyo: Class;
  comments: Comment[];
}

type CommentInput={
  name: string;
  day: string;
  comment: string;
  kutikomi_id: string;
}

const ShowJugyo: NextPage<Factor> = ({kutikomi, jugyo, comments}) => {
  const now = new Date();
  const [comment, setComment]=useState<CommentInput>({
    name: "",
    day: `${now.getFullYear()}/${(now.getMonth() + 1)}/${now.getDate()}`,
    comment: "",
    kutikomi_id: kutikomi.id,
  })
  const [newComments, setNewComments]=useState<Comment[]>([]);

  const updateCreateTextForm=(e: ChangeEvent<HTMLTextAreaElement>)=>{
    setComment({ ...comment, [e.target.name]: e.target.value });
  }
  const updateRegisterForm = (e: ChangeEvent<HTMLInputElement>) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const register = () => {
    if(!comment.comment || comment.comment.length>=150)return;
        axios
          .post('/api/createComment', comment)
          .then((res: AxiosResponse) => {
            setNewComments([{
              id: res.data,
              name: comment.name,
              day: comment.day,
              comment: comment.comment,
              replies: [],
            }, ...newComments]);
            setComment({...comment, comment: ""})
          })
          .catch((err: AxiosError) => {
            console.log(err)
          });
  };


  return (
    <>
      <Meta pageTitle={`${jugyo.class_name}`} pageDesc={`${jugyo.class_name}のページ`}></Meta>
      <Header></Header>
      <Frame>
        <KutikomiArticle kutikomi={kutikomi} jugyo={jugyo}></KutikomiArticle>
        <div className="bg-white pl-3 mt-4">
          <h1 className=" pt-4 pb-4 border-gray-300 font-semibold">コメント({comments.length})</h1>
          <input
          type="text"
          name="name"
          value={comment.name}
          onChange={updateRegisterForm}
          placeholder="名前(省略可)"
          className="mb-2 p-1 border border-gray-500 w-60 "/>
          
          <TextareaComment
          holder="コメント"
          name="comment"
          value={comment.comment}
          updateTextarea={updateCreateTextForm}
          uploadTextarea={register}></TextareaComment>
        </div>

          {newComments.length+comments.length==0 ? <NotFoundC te="コメントをしよう！！"></NotFoundC> : ""}
        <ul className="bg-white mb-20">
          {newComments.map((comment: Comment, index: number)=>
          <CommentChoice key={index} comment={comment}></CommentChoice>
          )}
          <Comments25 Comments={comments}></Comments25>
        </ul>
      </Frame>
      <Footer></Footer>
    </>
  );
};

export default ShowJugyo;