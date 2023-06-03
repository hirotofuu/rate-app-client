import { NextPage, GetStaticProps, GetServerSideProps } from 'next';
import {filterArticle} from '../libs/fetchFunc'
import {createRef, useCallback, useEffect} from 'react'
import type {Class} from "../types/class"
import Header from '../components/header'
import Frame from '../components/frame'
import Filter from '../components/filterBox'
import NotFound from "../components/notFound"
import JugyoChoice from '../components/choices/jugyoChoice'


export const getServerSideProps: GetServerSideProps = async (context) => {
  const faculty: any=context.query.faculty
  const campus: any=context.query.campus
  const class_name: any=context.query.class_name
  const teacher_name: any=context.query.teacher_name
  const filteredArticle: Class[]=await filterArticle(faculty, campus, class_name, teacher_name)
  return{
    props: {
        filteredArticle,
        faculty,
        campus,
        class_name,
        teacher_name
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

 const Home: NextPage<Factor> = ({filteredArticle, faculty, campus, class_name, teacher_name}) => {
  const ref = createRef<HTMLUListElement>()
  
  const scrollToBottomOfList = useCallback(() => {
    ref!.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [ ref ])

  useEffect(()=>{
    scrollToBottomOfList()
  }, [filteredArticle])
  return (
    <>

      <Header></Header>
      <Frame>

        <Filter  faculty={faculty} campus={campus} class_name={class_name!="all" ? class_name : ""} teacher_name={teacher_name!="all" ? teacher_name : ""}></Filter>

          <ul className="mb-96" ref={ref}>
            <h1 className="pt-10 mb-5 border-b-4 border-gray-300 font-semibold">検索結果 ({filteredArticle.length})</h1>

            {filteredArticle.length==0 ? <NotFound type={false} buttonName="授業を投稿しましょう" url={`/create/jugyo`}></NotFound> : ""}

            {filteredArticle.map((jugyoo: any, index: any)=>
            <JugyoChoice key={index} jugyo={jugyoo}></JugyoChoice>
            )}
          </ul>

      </Frame>

    </>
  );
};

export default Home;