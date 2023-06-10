import { ChangeEvent } from "react";
type Props={
  title: string;
  name: string;
  values: string[];
  updateInput:  (e:  ChangeEvent<HTMLInputElement>)=>void;
}

const RadioInput:React.FC<Props>=({title, name, values, updateInput})=>{

  return (
      <>
        <section key={name} className="mb-6">
          <label id={name} className="text-sm text-gray-600">{title}</label>
          <ul className="flex gap-1">
            {values.map((value: string, index: number)=>

              <li key={index} id={value} className="flex">
                <input
                  type="radio"
                  name={name}
                  required
                  className="px-3 py-2"
                  value={value}
                  onChange={updateInput}
                /><span className="text-sm p-2">{value}</span>
              </li>
            )}
          </ul>
        </section>
      </>
  );
}

export default RadioInput