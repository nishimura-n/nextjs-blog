import { getAllPostIds, getPostData } from "@/lib/post";
import Layout from "../../components/Layout";
import utilStyles from "../../styles/utils.module.css";
import Head from "next/head";

//動的ルーティング設定のための関数。pathsがルーティング設定になっている(開発環境なら毎回リクエスト時に実行される、本番環境ならビルド時だけ実行される。)。
//idがとりうる値のリストを返す
export async function getStaticPaths() {
  //ブログ投稿データのファイル名(id)を取得。
  const paths = getAllPostIds();
  return {
    paths, //どのパスが事前にレンダリングされるのか決める。
    fallback: false, //paths以外を404表示にする
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
      </article>
    </Layout>
  );
}
