import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';


export async function deleteJugyo(id: any, api_token: string ){
  axios
  .delete(`/api/deleteJugyo/${id}?api_token=${api_token}`)
  .then((res: AxiosResponse) => {
  })
  .catch((err: AxiosError) => {
    console.log(err)
  });
}

export async function deleteKutikomi(id: any, api_token: string){
  axios
  .delete(`/api/deleteKutikomi/${id}?api_token=${api_token}`)
  .then((res: AxiosResponse) => {
  })
  .catch((err: AxiosError) => {
    console.log(err)
  });
}

export async function deleteComment(id: any, api_token: string){
  axios
  .delete(`/api/deleteComment/${id}?api_token=${api_token}`)
  .then((res: AxiosResponse) => {
  })
  .catch((err: AxiosError) => {
    console.log(err)
  });
}

export async function deleteReply(id: any, api_token: string){
  axios
  .delete(`/api/deleteReply/${id}?api_token=${api_token}`)
  .then((res: AxiosResponse) => {
  })
  .catch((err: AxiosError) => {
    console.log(err)
  });
}


export async function deleteJ(deletee: (id: string, apiToken: string)=>void, i: string, a: string){
  if (confirm('本当に削除しますか？')) {
    deletee(i, a);
  }
}


