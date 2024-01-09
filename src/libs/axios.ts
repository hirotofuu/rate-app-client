import Axios from 'axios'
 
const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_KEY,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
    withCredentials: true,
})
 
export default axios