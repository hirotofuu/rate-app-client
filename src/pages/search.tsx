import Link from "next/link"
import { NextPage, GetStaticProps, GetServerSideProps } from 'next';
import {getIndexArticle} from '../libs/fetchFunc' 
import {filterArticle} from '../libs/fetchFunc'
import axios from '../libs/axios';
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
  const filteredArticle: any=await filterArticle(faculty, campus, class_name, teacher_name)
  return{
    props: {
      factor: {
        filteredArticle,
        faculty,
        campus,
        class_name,
        teacher_name
      }
    },
  };
}

 const Home: NextPage = ({factor}: any) => {
  return (
    <>

      <Header></Header>
      <Frame>
        <Filter  faculty={factor.faculty} campus={factor.campus} class_name={factor.class_name!="all" ? factor.class_name : ""} teacher_name={factor.teacher_name!="all" ? factor.teacher_name : ""}></Filter>
        <h1 className="mt-10 mb-5 border-b-4 border-gray-300 font-semibold">検索結果 ({factor.filteredArticle.length})</h1>
        {factor.filteredArticle.length==0 ? <NotFound buttonName="授業を投稿しましょう" url={`/create/jugyo`}></NotFound> : ""}
        <ul>
          {factor.filteredArticle.map((jugyoo: any, index: any)=>
          <JugyoChoice key={index} jugyo={jugyoo}></JugyoChoice>
          )}
        </ul>
      </Frame>

    </>
  );
};

export default Home;