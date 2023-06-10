import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';

type JugyoForm={
  class_name: string;
  teacher_name: string,
  faculty: string;
  campus: string;
  field: string;
  url: string;
  content: string
};


export async function createJugyo(Jugyo: JugyoForm){
  axios
  .post('/api/createJugyo', Jugyo)
  .then((res: AxiosResponse) => {
  })
  .catch((err: AxiosError) => {
    console.log(err)
  });
}