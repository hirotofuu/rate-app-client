import type {Class} from "../types/class";
import Jugyos25 from "../components/25/jugyo25";
import Header from '../components/header';
import Footer from '../components/footer';
import Frame from '../components/frame';
import Filter from '../components/filterBox';
import { useState, useEffect } from 'react';
import {useFetch} from "./../hooks/useFetch"
import Meta from "../components/meta"





export default function Home() {
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

