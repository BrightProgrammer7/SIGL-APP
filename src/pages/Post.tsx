import { google } from 'googleapis';
import React  from "react";
import { Link } from "react-router-dom";

import { map } from 'lodash';
interface Post {
  title: string;
  content: string;
}

async function getServerSideProps() {
  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

  const sheets = google.sheets({ version: 'v4', auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: import.meta.env.SHEET_ID,
    range: 'Sheet1!A2:A4',
  });

  // const posts: string[] = response.data.values.flat() || [];
  // posts: string[] = (response?.data.values as string[] | null)?.flat()
  const posts: Post[] = response?.data.values?.flat() as Post[]
  console.log(posts);
  // const [title, content] = response.data.values[0];

  return {
    posts: posts
  };

  // return response?.data.values.flat()
}

export async function getServerSide() {
  return await getServerSideProps();
}
// const posts: Post[] = [];
const Post: React.FC = async () => {
// export default async function Post() : Promise<JSX.Element> {
  
  // const posts = await getServerSideProps();
  const { posts } = getServerSide();


  return (
    <article>
      <h1>Posts</h1>
      <ul>
        {/* {post.map((v: Post, i: number) => ( */}
        {map(posts, (v: Post, i: number) => (
          <li key={v.title}>
            <Link to={`posts/${i + 2}`}>
              <a>{v.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default Post