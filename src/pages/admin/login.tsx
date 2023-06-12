import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import axios from '../../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import Button from "../../components/button"
import InputNo from "../../components/input/inputTextNo"
import InputPassword from "../../components/input/inputPassword"
import {useApiToken} from "../../hooks/useApiToken"



type RegisterForm={
  email: string;
  password: string;

};



const EditJugyo: NextPage = () => {

  const router=useRouter();

  const {apiToken, setApiToken}=useApiToken()
  
  const [registerForm, setRegisterForm]=useState<RegisterForm>({
    email: "",
    password: "",
  })


  const updateRegisterForm = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };


  const register = () => {
    if(!registerForm.email || !registerForm.password)return 0;
    axios
          .post('/api/Login', registerForm)
          .then((res: AxiosResponse) => {
            setApiToken(res.data);
            router.push("/")
          })
          .catch((err: AxiosError) => {
            console.log(err);
          });
  };


  return (

      <>
      <h1>ログイン</h1>
        <div className="container mx-auto mb-5">
          <div className="max-w-xl p-5 mx-auto xl:border-4 lg:border-4 md:border-4 my-2 xl:my-10 lg:my-10 md:my-10   bg-white rounded-md">
            


              <InputNo key="email" title="mail" name="email" holder="" value={registerForm.email} updateInput={updateRegisterForm}></InputNo>

              <InputPassword key="password" title="password" name="password" holder="" value={registerForm.password} updateInput={updateRegisterForm}></InputPassword>

              
              <Button onPush={register}>送信</Button>

          </div>
        </div>
      </>


  )
}

export default EditJugyo