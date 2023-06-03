import Link from "next/link"
import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import {showJugyo, showKutikomis} from '../../libs/fetchFunc'
import type {Class} from "../../types/class"
import type {Kutikomi} from "../../types/kutikomi"
import Frame from '../../components/frame'
import Header from '../../components/header'
import KutikomiArticle from '../../components/kutikomiArticle'

export const getStaticProps: GetStaticProps = async (context) => {
  const id: any = context.params?.id
  const kutikomi: Kutikomi=await showKutikomis(id)
  const jugyo: Class=await showJugyo(kutikomi.jugyo_id)
  return{
    props: {
        kutikomi,
        jugyo
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
  kutikomi: Kutikomi;
  jugyo: Class;
}


const ShowJugyo: NextPage<Factor> = ({kutikomi, jugyo}) => {
  return (
    <>

      <Header></Header>
      <Frame>
        <KutikomiArticle kutikomi={kutikomi} jugyo={jugyo}></KutikomiArticle>
      </Frame>

    </>
  );
};

export default ShowJugyo;