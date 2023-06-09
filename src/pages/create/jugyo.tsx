import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { ChangeEvent, useState, useCallback } from 'react';
import axios from '../../libs/axios';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import JugyoModal from "../../components/modals/JugyoModal"
import Canceal from "../../components/canceal"
import Header from "../../components/header"
import Button from "../../components/button"
import InputNo from "../../components/input/inputTextNo"
import Select from "../../components/input/select"
import Footer from '../../components/footer';
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const class_name: any = context.query.class_name
  const teacher_name: any = context.query.teacher_name
  
  return{
    props: {
        class_name,
        teacher_name
    },
  };
}

type Factor={
  class_name: string;
  teacher_name: string;
}


const Register: NextPage<Factor> = ({class_name, teacher_name}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl]=useState<string>('')
  const [registerForm, setRegisterForm]=useState<RegisterForm>({
    class_name: class_name,
    teacher_name: teacher_name,
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
      router.push("/")
    })
    .catch((err: AxiosError) => {
    });
  };

  const { executeRecaptcha } = useGoogleReCaptcha();
  const onSubmit = useCallback(async (e: any) => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }
    const reCaptchaToken = await executeRecaptcha('kutikomi');
    
    
    const apiEndPoint = '/api/enquiry';
  const isOk = await fetch(apiEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: reCaptchaToken,
    }),
  });
  if(isOk.ok){
    console.log(isOk)
    setIsOpen(true);
  }
  } , [executeRecaptcha]
  );


  return (

      <>
        <Header></Header>
        <div className="container mx-auto mb-5">
          <div className="max-w-xl p-5 mx-auto xl:border-4 lg:border-4 md:border-4 my-2 xl:my-10 lg:my-10 md:my-10   bg-white rounded-md">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700">授業登録</h1>
              <p className="mb-8 text-gray-400">授業を登録して、見聞を広めよう!!!<br/>（すでに登録されている授業の場合、その授業のページにとばされます）</p>
            </div>
            <section className="mb-6">
              <label id="class_name" className="text-sm mb-2 text-gray-600">授業名</label>
              <p className=" py-2 text-sm">{class_name}</p>
            </section>
            <section className="mb-6">
              <label id="teacher_name" className="text-sm mb-2 text-gray-600">担当名</label>
              <p className=" py-2 text-sm">{teacher_name}</p>
            </section>
              <Select key="faculty" title="学部" name="faculty" value={registerForm.faculty} contents={faculty_contents} updateSelect={updateSelectTextForm}></Select>

              <Select key="campus" title="キャンパス" name="campus" value={registerForm.campus} contents={campus_contents} updateSelect={updateSelectTextForm}></Select>

              <InputNo key="field" title="分野(省略可)" name="field" holder="例）関連科目" value={registerForm.field} updateInput={updateRegisterForm}></InputNo>

              <InputNo key="url" title="シラバスURL(省略可)" name="url" holder="" value={registerForm.url} updateInput={updateRegisterForm}></InputNo>



              <Button onPush={onSubmit}>確認</Button>

              <Canceal></Canceal>


          </div>
        </div>
        <Footer></Footer>
        <JugyoModal onPush={register} onClose={()=>setIsOpen(false)} isOpen={isOpen} registerForm={registerForm}></JugyoModal>
      </>


  )
}

export default Register