import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';



export async function getIndexArticle(){
    const res=axios
    .get('/api/fetchIndexJugyo')
    .then((response: AxiosResponse) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((err: AxiosError) => console.log(err));
    return res;
}

export async function filterArticle(faculty: string | string[], campus: string | string[], class_name: string | string[], teacher_name: string | string[]){
    const res=  axios
    .get(`/api/filterJugyo/${faculty}/${campus}/${class_name}/${teacher_name}`)
    .then((res: AxiosResponse) => {
      return res.data.data
    })
    .catch((err: AxiosError) => {
      console.log(err)
    });
    return res;
}

export async function showJugyo(id: string | string[]){
    const res=axios
    .get(`/api/showJugyo/${id}`)
    .then((response: AxiosResponse) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((err: AxiosError) => console.log(err));
    return res;
}

export async function fetchKutikomis(id: string | string[]){
    const res=axios
    .get(`/api/getKutikomi/${id}`)
    .then((response: AxiosResponse) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((err: AxiosError) => console.log(err));
    return res;
}

export async function showKutikomis(id: string | string[]){
    const res=axios
    .get(`/api/showKutikomi/${id}`)
    .then((response: AxiosResponse) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((err: AxiosError) => console.log(err));
    return res;
}