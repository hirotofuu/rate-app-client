import { NextPage, GetStaticProps, GetServerSideProps } from 'next';
import {filterArticle} from '../libs/fetchFunc';
import {createRef, useCallback, useEffect, useState} from 'react';
import type {Class} from "../types/class";
import {useFetch} from "./../hooks/useFetch";
import Footer from '../components/footer';
import Header from '../components/header';
import Frame from '../components/frame';
import Filter from '../components/filterBox';
import NotFound from "../components/notFound";
import Jugyos25 from "../components/25/jugyo25";
import Meta from "../components/meta"



export const getServerSideProps: GetServerSideProps = async (context) => {

  const class_name: any=context.query.class_name;;
  const filteredArticle: Class[]=await filterArticle("all", "all", class_name, "all");
  return{
    props: {
        filteredArticle,
        class_name,
    },
  };
}

type Factor={
  filteredArticle: Class[];
  faculty: string;
  campus: string;
  class_name: string;
  teacher_name: string;
}

 const Search: NextPage<Factor> = ({filteredArticle, faculty, campus, class_name, teacher_name}) => {
  const ref = createRef<HTMLUListElement>()
  const [Jugyo, setJugyo] = useState<Class[]>([])
  const scrollToBottomOfList = useCallback(() => {
    ref!.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [ ref ])

  return (
    <>
      <Meta pageTitle={`検索結果`} pageDesc={`検索結果`}></Meta>
      <Header></Header>
      <Frame>

          <ul className="mb-96" ref={ref}>
            <h1 className="pt-10 mb-5 border-b-4 border-gray-300 font-semibold">検索結果 ({filteredArticle.length})</h1>

            {filteredArticle.length==0 ? <NotFound type={false} buttonName="授業を投稿しましょう" url={`/create/jugyo`}></NotFound> : ""}

            <Jugyos25 Jugyos={filteredArticle}></Jugyos25>
          </ul>

      </Frame>
      <Footer></Footer>
    </>
  );
};

export default Search;