import Layout, { siteTitle } from "@/components/Layout";
import styles from "../styles/Home.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { getPostsData } from "../lib/post";
import Head from "next/head";

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id,title,date,thumbnail
  console.log(allPostsData);
  return {
    props: {
      allPostsData,
    },
  };
}

// //SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          私はフロントエンドエンジニア志望の大学院生です。このサイトはNext.jsの練習のために作成しました。
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage}></img>
              </Link>
              <Link href={`/posts/${id}`}>
                <div className={utilStyles.boldText}>{title}</div>
              </Link>
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
