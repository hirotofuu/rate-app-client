import Select from "../components/input/select"
import InputNo from "../components/input/inputTextNo"
import { useState, ChangeEvent } from "react"
import {faculty_contents} from "../libs/faculty" 
import {campus_contents} from "../libs/campus" 
import { useRouter } from "next/router"

type Props={
  faculty: string;
  campus: string;
  class_name: string;
  teacher_name: string;
}

const Filter: React.FC<Props>=({faculty, campus, class_name, teacher_name})=>{
  const router=useRouter()
  const [registerForm, setRegisterForm]=useState<Props>({
    faculty: faculty,
    campus: campus,
    class_name: class_name,
    teacher_name: teacher_name,
  })

const reset=()=>{
  setRegisterForm({
    faculty: "",
    campus: "",
    class_name: "",
    teacher_name: "",   
  })
}
const goFilter=()=>{
  router.push({
    pathname:'/search',
    query: {faculty: registerForm.faculty ? registerForm.faculty : "all", campus: registerForm.campus ? registerForm.campus : "all", class_name: registerForm.class_name ? registerForm.class_name : "all", teacher_name: registerForm.teacher_name ? registerForm.teacher_name : "all"},
  });
}

  const updateSelectTextForm=(e: ChangeEvent<HTMLSelectElement>)=>{
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value  });
}

const updateRegisterForm = (e: ChangeEvent<HTMLInputElement>) => {
  setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
};

  
  return(

    <>
    <section className="border-4 p-4 mt-4 mb-4 bg-white ">
      <h1 className="mb-6 font-semibold">絞り込み検索</h1>
      <Select key="faculty" title="学部" name="faculty" value={registerForm.faculty} contents={faculty_contents} updateSelect={updateSelectTextForm}></Select>
      <Select key="campus" title="キャンパス" name="campus" value={registerForm.campus} contents={campus_contents} updateSelect={updateSelectTextForm}></Select>

      <InputNo key="class_name" title="授業名" name="class_name" holder="" value={registerForm.class_name} updateInput={updateRegisterForm}></InputNo>
      <InputNo key="teacher_name" title="担当名" name="teacher_name" holder="" value={registerForm.teacher_name} updateInput={updateRegisterForm}></InputNo>
      <div className="flex gap-40">
        <button onClick={reset} className="p-2  font-semibold bg-gray-500 text-white rounded-lg">リセット</button>
        <button onClick={goFilter} className="p-2  font-semibold bg-indigo-500 text-white rounded-lg">検索する</button>
      </div>

    </section>
      

    </>
  )
}

export default Filter