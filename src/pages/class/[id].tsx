import Link from "next/link"
import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import {showJugyo, fetchKutikomis} from '../../libs/fetchFunc'
import type {Class} from "../../types/class"
import type {Kutikomi} from "../../types/kutikomi"
import Footer from "../../components/footer"
import Header from '../../components/header'
import Frame from '../../components/frame'
import JugyoTitle from '../../components/jugyoMidasi'
import NotFound from '../../components/notFound'
import Kutikomis25 from "../../components/25/kutikomi25"
import Meta from "../../components/meta"

export const getStaticProps: GetStaticProps = async (context) => {
  const id: any = context.params?.id
  const Jugyo: Class=await showJugyo(id)
  const kutikomis: Kutikomi[]=await fetchKutikomis(id)
  return{
    props: {
        Jugyo,
        kutikomis
    },
    revalidate: 120
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking', 
  };
};

type Factor={
  Jugyo: Class;
  kutikomis: Kutikomi[];
}


const ShowJugyo: NextPage<Factor> = ({Jugyo, kutikomis}) => {
  let stars: number=0;
  for(const x of kutikomis){
    stars=stars+x.rate;
  }
  
  return (
    <>
      <Meta pageTitle={`授業ページ`} pageDesc={`授業ページ`}></Meta>
      <Header></Header>
      <JugyoTitle jugyo={Jugyo} starNum={stars!=0 ? stars/kutikomis.length : 0}></JugyoTitle>
      <Frame>
        <Link href={`/create/kutikomi/${Jugyo.class_name}/${Jugyo.teacher_name}/${Jugyo.id}`} className="w-full block text-center p-2 mt-2 text-white font-semibold bg-indigo-500 rounded-full ">口コミを投稿</Link>
        <h1 className="mt-4 mb-6 pb-1 border-b-2 border-gray-400">口コミ一覧({kutikomis.length})</h1>
        <div className="pb-64">
          {kutikomis.length==0 ? <NotFound buttonName="口コミを投稿しましょう" type={true} url={`/create/kutikomi/${Jugyo.class_name}/${Jugyo.teacher_name}/${Jugyo.id}`}></NotFound> : ""}
          <ul>
            <Kutikomis25 Kutikomis={kutikomis}></Kutikomis25>
          </ul>
        </div>
      </Frame>
      <Footer></Footer>
    </>
  );
};

export default ShowJugyo;