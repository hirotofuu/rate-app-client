import { ChangeEvent } from "react";
type Props={
  title: string;
  name: string;
  value: string;
  contents: string[];
  updateSelect:  (e:  ChangeEvent<HTMLSelectElement>)=>void;
}


const Select:React.FC<Props>=({title, name, value, contents, updateSelect})=>{

  return (
      <>
        <section className="mb-6">
          <label id={name} className="block text-sm text-gray-600">{title}</label>
          <select name={name} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 block w-full p-2.5 "
          required
            value={value}
            onChange={updateSelect}
          >
          {contents.map((content: string, index: number)=>
          <option key={index} value={content}>{content}</option>
          )}

          </select>
        </section>
      </>
  );
}

export default Select