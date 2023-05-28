import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import {showJugyo} from '../../../libs/fetchFunc'
import type {Class} from "../../../types/class"
import { ChangeEvent, useState, useEffect } from 'react';
import axios from '../../../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import ReactStarsRating from 'react-awesome-stars-rating';
import Header from "../../../components/header"
import Canceal from "../../../components/canceal"
import Textarea from "../../../components/input/textarea"
import RadioInput from "../../../components/input/radioInput"

type RegisterForm={
  attend: string;
  type: string,
  day: string;
  text: string;
  test: string;
  task: string;
  comment: string;
  evaluate: string;
  rate: number;
  jugyo_id: string;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id: any = context.params?.id
  const Jugyo: Class=await showJugyo(id)
  return{
    props: {
      factor: {
        Jugyo,
      }
    },
    revalidate: 30
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking', 
  };
};


const Register: NextPage = ({factor}: any) => {
  const router = useRouter();

  
  const [registerForm, setRegisterForm]=useState<RegisterForm>({
    attend: '',
    type: '',
    day: '',
    text: '',
    task: '',
    test: '',
    comment: '',
    evaluate: '',
    rate: 0,
    jugyo_id: factor.Jugyo.id,
  })



  const updateRegisterForm = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const updateCreateTextForm=(e: ChangeEvent<HTMLTextAreaElement>)=>{
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  }

  const onChangeStar = (value: number) => {
    setRegisterForm({ ...registerForm, rate:value  });
  };

  const register = (event: any) => {
    if(!(registerForm.attend && registerForm.type && registerForm.day && registerForm.text && registerForm.task && registerForm.test && registerForm.comment && registerForm.evaluate))return 0
    axios
    .post('/api/createKutikomi', registerForm)
    .then((res: AxiosResponse) => {
      console.log('success');
      router.push(`/class/${factor.Jugyo.id}`);
    })
    .catch((err: AxiosError) => {
      console.log(err)
    });
  };

  useEffect(()=>{
    const now = new Date();
    setRegisterForm({ ...registerForm, day: `${now.getFullYear()}/${(now.getMonth() + 1)}/${now.getDate()}` })
  }, [])


  return (

      <div>
        <Header></Header>
        <div className="container mx-auto mb-5">
          <div className="max-w-xl p-5 mx-auto xl:border-4 lg:border-4 md:border-4 my-2 xl:my-10 lg:my-10 md:my-10   bg-white rounded-md">
            <div className="text-center mb-8">
              <h1 className="my-3 text-3xl font-semibold text-gray-700">口コミ登録</h1>
              <h2 className="text-gray-400">口コミを登録して、見聞を広めよう!!!</h2>
            </div>
            <section className="mb-6">
              <label id="class_name" className="text-sm mb-2 text-gray-600">授業名</label>
              <p className=" py-2 text-sm">{factor.Jugyo.class_name}</p>
            </section>
            <section className="mb-6">
              <label id="teacher_name" className="text-sm mb-2 text-gray-600">担当名</label>
              <p className=" py-2 text-sm">{factor.Jugyo.teacher_name}</p>
            </section>

            <form onSubmit={register} action={`/class/${factor.Jugyo.id}`}>
              <RadioInput key="attend" title="出席" name="attend" values={["ある", "ない"]}
              updateInput={updateRegisterForm}></RadioInput>

              <RadioInput key="type" title="形式" name="type" values={["対面", "オンデマンド", "zoom"]}
              updateInput={updateRegisterForm}></RadioInput>


              <RadioInput key="text" title="教科書" name="text" values={["必要", "不必要",]}
              updateInput={updateRegisterForm}></RadioInput>


              <Textarea key="task" title="課題" name="task" holder="ない場合は「ない」と入力しよう" value={registerForm.task} updateTextarea={updateCreateTextForm}></Textarea>


              <Textarea key="test" title="テスト" name="test" holder="ない場合は「ない」と入力しよう" value={registerForm.test} updateTextarea={updateCreateTextForm}></Textarea>


              <RadioInput key="evaluate" title="難易度" name="evaluate" values={["易", "普", "難", "超難"]}
              updateInput={updateRegisterForm}></RadioInput>


              <Textarea key="comment" title="まとめ" name="comment" holder="" value={registerForm.comment} updateTextarea={updateCreateTextForm}></Textarea>


              <section className="mb-6">
                <label id="rate" className="text-sm text-gray-600">総合評価</label>
                <ReactStarsRating
                id="rate"
                onChange={onChangeStar}
                isEdit={true}
                value={registerForm.rate}
                selectedValue={()=>{}}
                className="flex"
                />
              </section>

              <Canceal></Canceal>

              <input
                  type="submit"
                  className="mt-4 w-full px-2 py-2 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none cursor-pointer"
               />                
            </form>


          </div>
        </div>

      </div>

  )
}

export default Register