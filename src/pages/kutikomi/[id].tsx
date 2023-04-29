import Link from "next/link"
import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import {showJugyo, showKutikomis} from '../../libs/fetchFunc'
import Header from '../../components/header'

export const getStaticProps: GetStaticProps = async (context) => {
  const id: any = context.params?.id
  const kutikomi: any=await showKutikomis(id)
  return{
    props: {
      factor: {
        kutikomi,
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
      <h1>s</h1>
    </>
  );
};

export default ShowJugyo;