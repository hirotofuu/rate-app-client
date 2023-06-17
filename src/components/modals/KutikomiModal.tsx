import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useState, ChangeEvent } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import InputFactor from "../inputFactor"
import Button from "../button";
import axios from '../../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

type RegisterForm={
  attend: string;
  type: string;
  day: string;
  text: string;
  test: string;
  task: string;
  comment: string;
  evaluate: string;
  rate: number;
  jugyo_id: string;
};

type Props = {
  isOpen: boolean;
  registerForm: RegisterForm,
  onClose: VoidFunction;
  onPush: VoidFunction;
};




const KutikomiModal:React.FC<Props> = ({ isOpen, onClose, registerForm, onPush }) => {
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
                <h1 className="font-semibold">確認</h1>
                <button onClick={onClose}><FontAwesomeIcon icon={faXmark} className="text-2xl"/></button>
              </div>


              <div className="overflow-x-scroll h-72">
              
                <InputFactor title="出席" content={registerForm.attend}></InputFactor>
                <InputFactor title="形式" content={registerForm.type}></InputFactor>
                <InputFactor title="教科書" content={registerForm.text}></InputFactor>
                <InputFactor title="課題" content={registerForm.task}></InputFactor>
                <InputFactor title="難易度" content={registerForm.evaluate}></InputFactor>
                <InputFactor title="まとめ" content={registerForm.comment}></InputFactor>
                <InputFactor title="評価" content={registerForm.rate}></InputFactor>
              </div>
              

              <Button onPush={onPush}>送信</Button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default KutikomiModal;