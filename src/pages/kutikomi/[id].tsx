import Link from "next/link"
import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import {showJugyo, showKutikomis} from '../../libs/fetchFunc'
import Frame from '../../components/frame'
import Header from '../../components/header'
import KutikomiArticle from '../../components/kutikomiArticle'

export const getStaticProps: GetStaticProps = async (context) => {
  const id: any = context.params?.id
  const kutikomi: any=await showKutikomis(id)
  const jugyo: any=await showJugyo(kutikomi.jugyo_id)
  return{
    props: {
      factor: {
        kutikomi,
        jugyo
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
      <Frame>
        <KutikomiArticle kutikomi={factor.kutikomi} jugyo={factor.jugyo}></KutikomiArticle>
      </Frame>

    </>
  );
};

export default ShowJugyo;