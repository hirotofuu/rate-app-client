import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useState, ChangeEvent } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import InputNo from "../input/inputTextNo";
import Button from "../button";
import axios from '../../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

type Props = {
  type: boolean;
  isOpen: boolean;
  onClose: VoidFunction;
};

type isExist={
  class_name: string;
  teacher_name: string;
};


const Modal:React.FC<Props> = ({ isOpen, type, onClose }) => {
  const router=useRouter()
  const [registerForm, setRegisterForm]=useState<isExist>({
    class_name: '',
    teacher_name: '',
  })

  const updateRegisterForm = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value.replace(/\s+/g, "") });
  };

  const register = () => {
    const apiCode=type ? "isExistJugyo" : "isExistJugyoToJugyo";
    if(!(registerForm.class_name && registerForm.teacher_name))return 0;
    if(registerForm.class_name.length>30 || registerForm.teacher_name.length>30)return 0;
        axios
          .get(`/api/${apiCode}/${registerForm.class_name}/${registerForm.teacher_name}`)
          .then((res: AxiosResponse) => {
            onClose()
            if(!res.data.redirect_url){
              router.push({
                pathname:'/create/jugyo',
                query: { class_name: registerForm.class_name, teacher_name: registerForm.teacher_name}
              });
            }else{
              router.push(res.data.redirect_url);
            }

          })
          .catch((err: AxiosError) => {
            console.log(err)
          });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-30" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl ">

              <div className="flex justify-between mb-6 text-xl">
                <h1 className="font-semibold">授業入力</h1>
                <button onClick={onClose}><FontAwesomeIcon icon={faXmark} className="text-2xl"/></button>
              </div>

              <InputNo key="class_name" title="授業名(空白や「・」は使わないでください)" name="class_name" holder="例)世界史b" value={registerForm.class_name} updateInput={updateRegisterForm}></InputNo>

              <InputNo key="teacher_name" title="担当名(空白や「・」は使わないでください)" name="teacher_name" holder="例)山田渡辺、ジョンマイケル" value={registerForm.teacher_name} updateInput={updateRegisterForm}></InputNo>

              <Button onPush={register}>送信</Button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;