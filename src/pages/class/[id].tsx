import Link from "next/link"
import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import {showJugyo, fetchKutikomis} from '../../libs/fetchFunc'
import type {Class} from "../../types/class"
import Header from '../../components/header'

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
      <h1>s</h1>
    </>
  );
};

export default ShowJugyo;