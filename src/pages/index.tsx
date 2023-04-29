import Link from "next/link"
import { NextPage, GetStaticProps, GetServerSideProps } from 'next';
import {getIndexArticle} from '../libs/fetchFunc'
import Header from '../components/header'

export const getServerSideProps: GetServerSideProps = async (context) => {
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
      <h1>s</h1>
    </>
  );
};

export default Home;