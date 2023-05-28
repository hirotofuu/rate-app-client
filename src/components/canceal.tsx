import { useRouter } from "next/router"
const Canceal=()=>{
  const router=useRouter()
  const goBack=()=>{
    router.back()
  }
  return(
    <>
      <button 
      onClick={goBack}
      className="w-full mt-6 p-2 text-white bg-gray-500 rounded-md  focus:outline-none"               
      >キャンセル</button>

    </>
  )
}

export default Canceal