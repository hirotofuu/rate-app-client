import Link from "next/link"
import { useState } from "react";
import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import {showJugyo, fetchKutikomis} from '../../libs/fetchFunc'
import type {Class} from "../../types/class"
import type {Kutikomi} from "../../types/kutikomi"
import Header from '../../components/header'
import Frame from '../../components/frame'
import JugyoTitle from '../../components/jugyoMidasi'
import NotFound from '../../components/notFound'
import KutikomiChoice from '../../components/choices/kutikomiChoice'

export const getStaticProps: GetStaticProps = async (context) => {
  const id: any = context.params?.id
  const Jugyo: Class=await showJugyo(id)
  const kutikomis: Kutikomi[]=await fetchKutikomis(id)
  return{
    props: {
        Jugyo,
        kutikomis
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

type Factor={
  Jugyo: Class;
  kutikomis: Kutikomi[];
}


const ShowJugyo: NextPage<Factor> = ({Jugyo, kutikomis}) => {
  return (
    <>
      <Header></Header>
      <JugyoTitle jugyo={Jugyo}></JugyoTitle>
      <Frame>
        <Link href={`/create/kutikomi/${Jugyo.class_name}/${Jugyo.teacher_name}/${Jugyo.id}`} className="w-full block text-center p-2 mt-2 text-white font-semibold bg-indigo-500 rounded-full ">口コミを投稿</Link>
        <h1 className="mt-4 mb-6 pb-1 border-b-2 border-gray-400">口コミ一覧</h1>
        {kutikomis.length==0 ? <NotFound buttonName="口コミを投稿しましょう" type={true} url={`/create/kutikomi/${Jugyo.class_name}/${Jugyo.teacher_name}/${Jugyo.id}`}></NotFound> : ""}
        <ul>
          {kutikomis.map((kutikomi: any, index: any)=>
            <KutikomiChoice key={index} kutikomi={kutikomi}></KutikomiChoice>
            )}
        </ul>
      </Frame>
    </>
  );
};

export default ShowJugyo;