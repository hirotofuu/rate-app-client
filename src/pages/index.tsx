import Link from "next/link"
import { NextPage, GetStaticProps, GetServerSideProps } from 'next';
import {getIndexArticle} from '../libs/fetchFunc'
import Header from '../components/header'
import Frame from '../components/frame'
import JugyoChoice from '../components/jugyoChoice'

export const getServerSideProps: GetServerSideProps = async () => {
  const categoryArticle: any=await getIndexArticle();
  return{
    props: {
      factor: {
        categoryArticle,
      }
    },
  };
}

 const Home: NextPage = ({factor}: any) => {
  return (
    <>

      <Header></Header>
      <Frame>
        <ul>
          {factor.categoryArticle.map((jugyoo: any, index: any)=>
          <JugyoChoice key={index} jugyo={jugyoo}></JugyoChoice>
          )}
        </ul>
      </Frame>

    </>
  );
};

export default Home;