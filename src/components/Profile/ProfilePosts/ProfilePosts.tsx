/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import tw from 'tailwind-styled-components';
import { useDispatch } from 'react-redux';
import { changeSelectedPost } from '../../../redux/selectedPost';
import Img from '../../Reusable/components/Img';
import getPostInfo from '../../../firebase/firestore/getInfo/getPostInfo';

const PostsDiv = tw.div`
  w-11/12
  mx-auto
  gap-3
  flex
  flex-wrap
`;

interface PostProps {
  id: string;
  photoUrl: string;
}

interface ProfilePostsProps {
  posts: Array<PostProps>;
}

function ProfilePosts({ posts }: ProfilePostsProps) {
  const dispatch = useDispatch();

  const showPostModal = async (id: string) => {
    document.querySelectorAll('dialog')[1]?.showModal();
    dispatch(changeSelectedPost({ show: true, postInfo: null }));
    const data = await getPostInfo(id);
    dispatch(changeSelectedPost({ show: true, postInfo: data }));
  };

  const showModal = () => {
    document.querySelector('dialog')?.showModal();
  };

  if (posts?.length === 0) {
    return (
      <div className="py-44">
        <PostsDiv>
          <button
            className="mx-auto"
            onClick={showModal}
          >
            <i className="fa-solid fa-image text-9xl mx-auto text-gray-400" />
            <p className="font-bold text-gray-500">Add New Post</p>
          </button>
        </PostsDiv>
      </div>
    );
  }
  return (
    <PostsDiv>
      {posts?.map((post) => (
        <button
          onClick={() => {
            showPostModal(post.id);
          }}
        >
          <Img
            link={post.photoUrl}
            height={17.5}
            width={17.5}
          />
        </button>
      ))}
    </PostsDiv>
  );
}

export default ProfilePosts;
