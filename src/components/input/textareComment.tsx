import { ChangeEvent } from "react";
type Props={
  name: string;
  holder: string;
  value: string;
  updateTextarea:  (e:  ChangeEvent<HTMLTextAreaElement>)=>void;
  uploadTextarea:  VoidFunction;
}


const TextareaComment:React.FC<Props>=({ name, holder, value, updateTextarea, uploadTextarea})=>{

  return (
      <>
        <section id={name} className="pb-6">
          <div  className=" pr-3  flex " >
              <textarea
              name={name}
              placeholder={holder}
              onChange={updateTextarea}
              value={value}
              maxLength={150} 
              className="resize-none border border-gray-500 w-full  p-1"></textarea>
              <button onClick={uploadTextarea} className="p-1 bg-indigo-500 text-white rounded-r-sm">go</button>
          </div>
          {value.length<=150 ? <p className="text-xs">({value.length}/150)</p> : <p className="text-red-500 text-xs">({value.length}/150)</p>}
        </section>
      </>
  );
}

export default TextareaComment