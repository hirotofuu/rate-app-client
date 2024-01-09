import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import InputFactor from "../inputFactor"
import Button from "../button";

import { useRouter } from 'next/router';

type RegisterForm={
  class_name: string;
  teacher_name: string,
  faculty: string;
  campus: string;
  field: string;
  url: string;
  content: string
};

type Props = {
  isOpen: boolean;
  registerForm: RegisterForm,
  onClose: VoidFunction;
  onPush: VoidFunction;
};




const JugyoModal:React.FC<Props> = ({ isOpen, onClose, registerForm, onPush }) => {
  const router=useRouter()




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
                <h1 className="font-semibold">確認（この内容でいいですか？）</h1>
                <button onClick={onClose}><FontAwesomeIcon icon={faXmark} className="text-2xl"/></button>
              </div>


              <div className="overflow-x-scroll h-72">
              
                <InputFactor title="授業名" content={registerForm.class_name}></InputFactor>
                <InputFactor title="担当者" content={registerForm.teacher_name}></InputFactor>
                <InputFactor title="学部" content={registerForm.faculty}></InputFactor>
                <InputFactor title="キャンパス" content={registerForm.campus}></InputFactor>
                <InputFactor title="科目" content={registerForm.field ? registerForm.field : "入力なし"}></InputFactor>
                <InputFactor title="url" content={registerForm.url ? registerForm.url : "入力なし"}></InputFactor>
              </div>
              

              <Button onPush={onPush}>送信</Button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default JugyoModal;