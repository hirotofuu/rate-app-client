import { ChangeEvent } from "react";
type Props={
  title: string;
  name: string;
  holder: string;
  value: string;
  updateInput:  (e:  ChangeEvent<HTMLInputElement>)=>void;
}

const InputNo:React.FC<Props>=({title, name, holder, value, updateInput})=>{
  return (
      <>
        <section className="mb-6">
          {title ? <label id={name} className="text-sm text-gray-600">{title}</label> : ""}
          <input
            type="text"
            name={name}
            placeholder={holder}
            maxLength={50} 
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 text-sm  rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            value={value}
            onChange={updateInput}
          />
        </section>
      </>
  );
}

export default InputNo