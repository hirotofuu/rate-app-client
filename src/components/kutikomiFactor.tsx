const KutikomiFactor=(props: any)=>{

  return (
      <>
        <div className="flex gap p-2 mx-2 border-b-2">
          <h3 className="w-1/5 p-2 text-sm font-semibold border-blue-500">{props.title}</h3>
          <p className="w-4/5 p-2 text-sm border-l-2">{props.content ? props.content : "記述なし"}</p>
        </div>
      </>
  );
}

export default KutikomiFactor