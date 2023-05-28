import Link from "next/link";
const NotFound=(props: any)=>{
  const buttonName: string=props.buttonName
  const url: string=props.url
  return (
      <>
        <section className="text-center mt-10">
          <h2 className="text-6xl">😿</h2>
          <h3 className="mt-6 text-lg">ここには何もありません</h3>
          <Link href={url} className=" p-1 text-blue-500 font-semibold rounded-full hover:underline">{buttonName}</Link>
        </section>
      </>
  );
}

export default NotFound