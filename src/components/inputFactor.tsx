type Props={
  title: string;
  content: string | number;
}

const InputFactor:React.FC<Props>=({title, content})=>{

  return (
      <>
        <section className="mb-3">
          <label id="teacher_name" className="text-sm mb-1 text-gray-600">{title}</label>
          <p className=" py-1 text-sm">{content}</p>
        </section>
      </>
  );
}

export default InputFactor