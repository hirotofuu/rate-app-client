import Link from "next/link"
import { NextPage, GetStaticProps, GetServerSideProps } from 'next';
import {getIndexArticle} from '../../libs/fetchFunc'
import Header from '../../components/header'
import Frame from '../../components/frame'
import JugyoChoice from '../../components/jugyoChoice'

 const Home: NextPage = () => {
  return (
    <>

      <Header></Header>
      <Frame>
        <h1>変わる心についていけないよ</h1>
      </Frame>

    </>
  );
};

export default Home;