import Link from "next/link"
import { NextPage, GetStaticProps, GetServerSideProps } from 'next';
import {getIndexArticle} from '../libs/fetchFunc'
import type {Class} from "../types/class"
import Header from '../components/header'
import Frame from '../components/frame'
import Filter from '../components/filterBox'

import JugyoChoice from '../components/choices/jugyoChoice'

export const getStaticProps: GetStaticProps = async () => {
  const Jugyo: Class[]=await getIndexArticle();
  return{
    props: {
        Jugyo,
    },
  };
}

type Factor={
  Jugyo: Class[];
}

 const Home: NextPage<Factor> = ({Jugyo}) => {
  return (
    <>

      <Header></Header>
      <Frame>
        <Filter faculty="" campus="" class_name="" teacher_name=""></Filter>
        <h1 className="mt-10 mb-5 border-b-4 border-gray-300 font-semibold">一覧</h1>
        <ul>
          {Jugyo.map((jugyoo: any, index: any)=>
          <JugyoChoice key={index} jugyo={jugyoo}></JugyoChoice>
          )}
        </ul>
      </Frame>

    </>
  );
};

export default Home;