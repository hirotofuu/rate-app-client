import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react';
import axios from '../../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import Canceal from "../../components/canceal"
import Header from "../../components/header"
import Input from "../../components/input/inputText"
import InputNo from "../../components/input/inputTextNo"
import Select from "../../components/input/select"
import {faculty_contents} from "../../libs/faculty" 
import {campus_contents} from "../../libs/campus" 


type RegisterForm={
  class_name: string;
  teacher_name: string,
  faculty: string;
  campus: string;
  field: string;
  url: string;
  content: string
};


const Register: NextPage = () => {
  const router = useRouter();

  
  const [registerForm, setRegisterForm]=useState<RegisterForm>({
    class_name: '',
    teacher_name: '',
    faculty: '',
    campus: '',
    field: '',
    url: '',
    content: ''
  })



  const updateSelectTextForm=(e: ChangeEvent<HTMLSelectElement>)=>{
      setRegisterForm({ ...registerForm, [e.target.name]: e.target.value  });
  }

  const updateRegisterForm = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };


  const register = () => {
    if(!(registerForm.class_name && registerForm.teacher_name))return 0
    
        axios
          .post('/api/createJugyo', registerForm)
          .then((res: AxiosResponse) => {
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
              <h1 className="my-3 text-3xl font-semibold text-gray-700">授業登録</h1>
              <p className="mb-8 text-gray-400">授業を登録して、見聞を広めよう!!!<br/>（すでに登録されている授業の場合、その授業のページにとばされます）</p>
            </div>
            <form onSubmit={register} action="/">
              <Input key="class_name" title="授業名　(スペースや「・」は使わないでください)" name="class_name" holder="例）世界史A" value={registerForm.class_name} updateInput={updateRegisterForm}></Input>

              <Input key="teacher_name" title="担当者名　(スペースや「・」は使わないでください)" name="teacher_name" holder="例）渡辺田中, ナランチャギルガ" value={registerForm.teacher_name} updateInput={updateRegisterForm}></Input>

              <Select key="faculty" title="学部" name="faculty" value={registerForm.faculty} contents={faculty_contents} updateSelect={updateSelectTextForm}></Select>

              <Select key="campus" title="キャンパス" name="campus" value={registerForm.campus} contents={campus_contents} updateSelect={updateSelectTextForm}></Select>

              <InputNo key="field" title="分野(省略可)" name="field" holder="例）関連科目" value={registerForm.field} updateInput={updateRegisterForm}></InputNo>

              <InputNo key="url" title="シラバスURL(省略可)" name="url" holder="" value={registerForm.url} updateInput={updateRegisterForm}></InputNo>


              <Canceal></Canceal>

              <input 
              type="submit" 
              className="w-full mt-4 p-2 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none cursor-pointer"
              value="登録"                
              />


            </form>

          </div>
        </div>
      </>


  )
}

export default Register