import { NextPage,} from 'next';
import Frame from '../components/frame';
import Header from '../components/header';
import Meta from "../components/meta"

 const About: NextPage = () => {
  return (
    <>
    <Meta pageTitle={`このサイトについて`} pageDesc={`このサイトについて`}></Meta>
    <Header></Header>
    <Frame>
      <div>
        <section>
          <h1 className="mb-1 mt-6 font-semibold border-b-2">このサイトについて</h1>
          <p>このサイトは慶應大学の授業について口コミを投稿するサイトです。</p>
        </section>
        <section>
          <h1 className="mb-1 mt-6 font-semibold border-b-2">授業登録</h1>
          <p>口コミを投稿するにも授業がなければ出来ません。このサイトに口コミを投稿したい授業がない場合、まず授業を投稿しましょう。授業の投稿方法は右上にある「授業+」を押し授業名、担当者めいを入力します。すでに投稿されている授業の場合、授業のページに飛ばされます。その後、フォームに従い入力して投稿しましょう。</p>
        </section>
        <section>
          <h1 className="mb-1 mt-6 font-semibold border-b-2">口コミ登録</h1>
          <p>口コミ登録も授業登録と同じ要領です。しかし、授業ページから口コミを投稿を押すと授業名と担当者名を入力する工程をスキップできます。</p>
        </section>
        <section>
          <h1 className="mb-1 mt-6 font-semibold border-b-2">口コミ・授業編集、登録・口コミをするときのルール</h1>
          <p>・個人情報を書き込むことをお控えください。された場合、その記述は削除の対象になります。</p>
          <p>・特定の人物への誹謗中傷をお控えください。された場合、その記述は削除の対象になります。</p>
          <p>・過度に性的な表現をお控えください。された場合、その記述は削除の対象になります。</p>
          <p>・故意に間違った情報を入力するのをおやめくださいされた場合、その記述は削除の対象になります。</p>
        </section>
      </div>
    </Frame>
      

    </>
  );
};

export default About;