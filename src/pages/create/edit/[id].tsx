import { NextPage, GetServerSideProps } from 'next';
import { ChangeEvent, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from '../../../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import type {Class} from "../../../types/class"
import {showJugyo} from '../../../libs/fetchFunc'
import Button from "../../../components/button"
import Header from "../../../components/header"
import Footer from '../../../components/footer';
import Canceal from "../../../components/canceal"
import InputNo from "../../../components/input/inputTextNo"
import Select from "../../../components/input/select"
import Meta from "../../../components/meta"
import {faculty_contents} from "../../../libs/faculty" 
import {campus_contents} from "../../../libs/campus" 


type RegisterForm={
  id: string;
  class_name: string;
  teacher_name: string,
  faculty: string;
  campus: string;
  field: string;
  url: string;
  content: string;
};


export const getServerSideProps: GetServerSideProps= async (context) => {
  const id: string | string[]=context.params?.id ? context.params?.id : "";
  const Jugyo: Class=await showJugyo(id)
  return{
    props: {
        Jugyo,
    },
  };
}


type Factor={
  Jugyo: Class;
}


const EditJugyo: NextPage<Factor> = ({Jugyo}) => {
  
  const [registerForm, setRegisterForm]=useState<RegisterForm>({
    id: Jugyo.id,
    class_name: Jugyo.class_name,
    teacher_name: Jugyo.teacher_name,
    faculty: Jugyo.faculty,
    campus:Jugyo.campus,
    field: Jugyo.field ? Jugyo.field : "",
    url: Jugyo.url ? Jugyo.url : "",
    content: Jugyo.content ? Jugyo.content : ""
  })

  const router=useRouter();


  const updateSelectTextForm=(e: ChangeEvent<HTMLSelectElement>)=>{
      setRegisterForm({ ...registerForm, [e.target.name]: e.target.value  });
  }

  const updateRegisterForm = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };


  const register =useCallback(async (e: any) => {
    e.preventDefault();
    if(!(Jugyo.faculty==registerForm.faculty && Jugyo.url==registerForm.url && Jugyo.field==registerForm.field && Jugyo.campus==registerForm.campus)){
      axios.put('/api/jugyoEdit', registerForm)
            .then((res: AxiosResponse) => {
              router.push(`/class/${Jugyo.id}`);
            })
            .catch((err: AxiosError) => {
              console.log(err)
            });
    }
        } , [registerForm]);


  return (

      <>
        <Meta pageTitle={`${registerForm.class_name}の編集ページ`} pageDesc={`${registerForm.class_name}の編集ページ`}></Meta>
        <Header></Header>
        <div className="container mx-auto mb-5">
          <div className="max-w-xl p-5 mx-auto xl:border-4 lg:border-4 md:border-4 my-2 xl:my-10 lg:my-10 md:my-10   bg-white rounded-md">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700">授業編集</h1>
              <p className="mb-8 text-gray-400">間違った情報を登録するのはやめましょう</p>
            </div>

            <section className="mb-6">
              <label id="class_name" className="text-sm mb-2 text-gray-600">授業名</label>
              <p className=" py-2 text-sm">{registerForm.class_name}</p>
            </section>
            <section className="mb-6">
              <label id="teacher_name" className="text-sm mb-2 text-gray-600">担当名</label>
              <p className=" py-2 text-sm">{registerForm.teacher_name}</p>
            </section>

            <form>

              <Select key="faculty" title="学部" name="faculty" value={registerForm.faculty} contents={faculty_contents} updateSelect={updateSelectTextForm}></Select>

              <Select key="campus" title="キャンパス" name="campus" value={registerForm.campus} contents={campus_contents} updateSelect={updateSelectTextForm}></Select>

              <InputNo key="field" title="分野(省略可)" name="field" holder="例）関連科目" value={registerForm.field} updateInput={updateRegisterForm}></InputNo>

              <InputNo key="url" title="シラバスURL(省略可)" name="url" holder="" value={registerForm.url} updateInput={updateRegisterForm}></InputNo>

              
              <Button onPush={register}>更新</Button>

              <Canceal></Canceal>

            </form>
          </div>
        </div>
        <Footer></Footer>
      </>


  )
}

export default EditJugyo