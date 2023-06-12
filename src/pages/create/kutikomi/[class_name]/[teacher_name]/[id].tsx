import { NextPage, GetServerSideProps } from 'next';
import { ChangeEvent, useState, useEffect } from 'react';
import axios from '../../../../../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import ReactStarsRating from 'react-awesome-stars-rating';
import Footer from '../../../../../components/footer';
import Button from "../../../../../components/button"
import Header from "../../../../../components/header"
import Canceal from "../../../../../components/canceal"
import Textarea from "../../../../../components/input/textarea"
import RadioInput from "../../../../../components/input/radioInput"

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: any = context.params?.id
  const class_name: any = context.params?.class_name
  const teacher_name: any = context.params?.teacher_name
  
  return{
    props: {
        id,
        class_name,
        teacher_name
    },
  };
}

type Factor={
  id: string;
  class_name: string;
  teacher_name: string;
}

const Register: NextPage<Factor> = ({id, class_name, teacher_name}) => {
  const router = useRouter();
  const now = new Date();
  
  const [registerForm, setRegisterForm]=useState<RegisterForm>({
    attend: '',
    type: '',
    day: `${now.getFullYear()}/${(now.getMonth() + 1)}/${now.getDate()}`,
    text: '',
    task: '',
    test: '',
    comment: '',
    evaluate: '',
    rate: 0,
    jugyo_id: id,
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

  const register = () => {
    if(!(registerForm.attend && registerForm.type && registerForm.day && registerForm.text && registerForm.task && registerForm.test && registerForm.comment && registerForm.evaluate))return 0;
    if(registerForm.task.length>500 || registerForm.test.length>500 || registerForm.comment.length>500)return 0;
    axios
    .post('/api/createKutikomi', registerForm)
    .then((res: AxiosResponse) => {
      console.log('success');
      router.push(`/class/${id}`);
    })
    .catch((err: AxiosError) => {
      console.log(err)
    });
  };



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
              <p className=" py-2 text-sm">{class_name}</p>
            </section>
            <section className="mb-6">
              <label id="teacher_name" className="text-sm mb-2 text-gray-600">担当名</label>
              <p className=" py-2 text-sm">{teacher_name}</p>
            </section>

            <form action={`/class/${id}`}>
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

              <Button onPush={register}>登録</Button>

              <Canceal></Canceal>
               
            </form>


          </div>
        </div>
        <Footer></Footer>
      </div>

  )
}

export default Register