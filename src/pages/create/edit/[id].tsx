import { NextPage, GetServerSideProps } from 'next';
import { ChangeEvent, useState } from 'react';
import axios from '../../../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import type {Class} from "../../../types/class"
import {showJugyo} from '../../../libs/fetchFunc'
import Header from "../../../components/header"
import Canceal from "../../../components/canceal"
import InputNo from "../../../components/input/inputTextNo"
import Select from "../../../components/input/select"
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
  content: string
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: any = context.params?.id
  const Jugyo: Class=await showJugyo(id)
  return{
    props: {
      factor: {
        Jugyo,
      }
    },
  };
}




const EditJugyo: NextPage = ({factor}: any) => {
  const Jugyo=factor.Jugyo

  
  const [registerForm, setRegisterForm]=useState<RegisterForm>({
    id: Jugyo.id,
    class_name: Jugyo.class_name,
    teacher_name: Jugyo.teacher_name,
    faculty: Jugyo.faculty,
    campus:Jugyo.campus,
    field: Jugyo.field,
    url: Jugyo.url,
    content: Jugyo.content
  })



  const updateSelectTextForm=(e: ChangeEvent<HTMLSelectElement>)=>{
      setRegisterForm({ ...registerForm, [e.target.name]: e.target.value  });
  }

  const updateRegisterForm = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };


  const register = () => {
        axios
          .put('/api/jugyoEdit', registerForm)
          .then((res: AxiosResponse) => {
            console.log("seccess")
          })
          .catch((err: AxiosError) => {
            console.log(err)
          });
  };


  return (

      <>
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

            <form onSubmit={register} action={`/class/${factor.Jugyo.id}`}>

              <Select key="faculty" title="学部" name="faculty" value={registerForm.faculty} contents={faculty_contents} updateSelect={updateSelectTextForm}></Select>

              <Select key="campus" title="キャンパス" name="campus" value={registerForm.campus} contents={campus_contents} updateSelect={updateSelectTextForm}></Select>

              <InputNo key="field" title="分野(省略可)" name="field" holder="例）関連科目" value={registerForm.field} updateInput={updateRegisterForm}></InputNo>

              <InputNo key="url" title="シラバスURL(省略可)" name="url" holder="" value={registerForm.url} updateInput={updateRegisterForm}></InputNo>

              <Canceal></Canceal>
              
              <input 
              type="submit" 
              className="w-full mt-4 p-2 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none cursor-pointer"
              value="更新"                
              />

            </form>
          </div>
        </div>
      </>


  )
}

export default EditJugyo