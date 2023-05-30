/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import Post from './Post';
import getPosts from '../../../firebase/firestore/getInfo/getPosts';
import { PostInfo } from '../../Reusable/interfaces/posts';
import Img from '../../Reusable/components/Img';
import placeholder from '../../../assets/placeholder-image (1).png';

function Feed() {
  const [posts, setPost] = useState<Array<PostInfo> | null>(null);
  useEffect(() => {
    async function getData() {
      const data = await getPosts(1000);
      setPost(data);
      console.log(data);
      return data;
    }
    getData();
    console.log('Oi do Feed');
  }, []);
  return (
    <div className="mx-10 flex flex-col gap-2">
      {posts != null &&
        posts.map((post: any) => (
          <Post
            key={post}
            postId={post}
          />
        ))}
      {posts == null && <p>Loading...</p>}
      {posts != null && posts.length === 0 && (
        <div>
          <Img
            link={placeholder}
            height={30}
            width={30}
          />
          <h1 className="flex justify-center text-2xl font-semibold -mt-7">
            No posts...
          </h1>
        </div>
      )}
    </div>
  );
}

export default Feed;
