import { NextPage, GetStaticProps } from 'next';
import {useApiToken} from "../hooks/useApiToken"
import {getIndexArticle} from '../libs/fetchFunc';
import type {Class} from "../types/class";
import Jugyos25 from "../components/25/jugyo25";
import Header from '../components/header';
import Footer from '../components/footer';
import Frame from '../components/frame';
import Filter from '../components/filterBox';

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
  const {apiToken}=useApiToken();
  return (
    <>

      <Header></Header>
      <Frame>
        <Filter faculty="" campus="" class_name="" teacher_name=""></Filter>
        <h1 className="mt-10 mb-5 border-b-4 border-gray-300 font-semibold">一覧</h1>
        <ul className="mb-60">
        <Jugyos25 Jugyos={Jugyo}></Jugyos25>
        </ul>
      </Frame>
      <Footer></Footer>

    </>
  );
};

export default Home;