import Link from "next/link"
import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import {showJugyo, fetchKutikomis} from '../../libs/fetchFunc'
import type {Class} from "../../types/class"
import Header from '../../components/header'
import Frame from '../../components/frame'
import JugyoTitle from '../../components/jugyoMidasi'
import KutikomiChoice from '../../components/kutikomiChoice'

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
  return (
    <>
      <Header></Header>
      <JugyoTitle jugyo={factor.Jugyo}></JugyoTitle>
      <Frame>
        <h1 className="mt-8 mb-6 pb-1 border-b-2 border-gray-400">口コミ一覧</h1>
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