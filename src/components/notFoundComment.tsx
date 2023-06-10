type Props={
  te: string;
}

const NotFoundC:React.FC<Props>=({te})=>{
  return (
      <>
        <section className="text-center pt-10 pb-6 bg-white">
          <h2 className="text-6xl">😿</h2>
          <h3 className="mt-6 text-lg">ここには何もありません</h3>
          <h3 className="text-lg">{te}</h3>
        </section>
      </>
  );
}

export default NotFoundC