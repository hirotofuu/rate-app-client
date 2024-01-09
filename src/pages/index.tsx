import type {Class} from "../types/class";
import { NextPage, GetStaticProps, GetServerSideProps } from 'next';
import Jugyos25 from "../components/25/jugyo25";
import Header from '../components/header';
import Footer from '../components/footer';
import Frame from '../components/frame';
import Filter from '../components/filterBox';
import { useState, useEffect } from 'react';
import {getIndexArticle} from "../libs/fetchFunc"
import {useFetch} from "./../hooks/useFetch"
import Meta from "../components/meta"


export const getStaticProps: GetStaticProps = async () => {
  const data = await getIndexArticle();


  // 取得したデータをpropsとしてコンポーネントに渡す
  return {
    props: {
      data
    },
    // ページは10秒ごとに再検証（再レンダリング）されます
    revalidate: 120,
  };
}

type Factor={
  data: any;
}


const Home: NextPage<Factor> = ({data})=> {
  const [Jugyo, setJugyo] = useState<Class[]>([])
  const {data: J} = useFetch(`/api/fetchIndexJugyo`)
  useEffect(()=>{
    if (J) {
      setJugyo(J.data);
    }
  }, [J])
  return (
    <>
      <Meta pageTitle={`トップページ`} pageDesc={`慶應大学の授業掲示板`}></Meta>
      <Header></Header>
      <Frame>
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