import Link from "next/link"
import { useState } from "react";
import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import {showJugyo, fetchKutikomis} from '../../libs/fetchFunc'
import type {Class} from "../../types/class"
import Header from '../../components/header'
import Modal from '../../components/modal'
import Frame from '../../components/frame'
import JugyoTitle from '../../components/jugyoMidasi'
import NotFound from '../../components/notFound'
import KutikomiChoice from '../../components/choices/kutikomiChoice'

export const getStaticProps: GetStaticProps = async (context) => {
  const id: any = context.params?.id
  const Jugyo: Class=await showJugyo(id)
  const kutikomis: any=await fetchKutikomis(id)
  return{
    props: {
      factor: {
        Jugyo,
        kutikomis
      }
    },
    revalidate: 30
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking', 
  };
};


const ShowJugyo: NextPage = ({factor}: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Header></Header>
      <JugyoTitle jugyo={factor.Jugyo}></JugyoTitle>
      <Frame>
        <Link href={`/create/kutikomi/${factor.Jugyo.class_name}/${factor.Jugyo.teacher_name}/${factor.Jugyo.id}`} className="w-full block text-center p-2 mt-2 text-white font-semibold bg-indigo-500 rounded-full ">口コミを投稿</Link>
        <h1 className="mt-4 mb-6 pb-1 border-b-2 border-gray-400">口コミ一覧</h1>
        {factor.kutikomis.length==0 ? <NotFound buttonName="口コミを投稿しましょう" url={`/create/kutikomi/${factor.Jugyo.class_name}/${factor.Jugyo.teacher_name}/${factor.Jugyo.id}`}></NotFound> : ""}
        <ul>
          {factor.kutikomis.map((kutikomi: any, index: any)=>
            <KutikomiChoice key={index} kutikomi={kutikomi}></KutikomiChoice>
            )}
        </ul>
      </Frame>
    </>
  );
};

export default ShowJugyo;