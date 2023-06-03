type Props={
  title: string;
  content: string | number;
}

const KutikomiFactor:React.FC<Props>=({title, content})=>{

  return (
      <>
        <div className="flex gap p-2 mx-2 border-b-2">
          <h3 className="w-1/5 p-2 text-sm font-semibold border-blue-500">{title}</h3>
          <p className="w-4/5 p-2 text-sm border-l-2">{content ? content : "記述なし"}</p>
        </div>
      </>
  );
}

export default KutikomiFactor