/* eslint-disable react/button-has-type */
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import UserNamePicture from '../Reusable/UserNamePicture';
import placeholder from '../../assets/lindy-fav.jpeg';
import Img from '../Reusable/Img';

const PostContainer = tw.div`
  w-min
  border-2
  gap-2
  flex
  flex-col
  pt-4
  pb-1
  bg-white
`;

function Post() {
  return (
    <PostContainer>
      <div className="px-4">
        <Link to="/profile/:id">
          <UserNamePicture
            imgSize={3}
            fontSize="lg"
          />
        </Link>
      </div>
      <Img
        link={placeholder}
        height={30}
        width={35}
      />
      <div className="px-2">
        <div className="flex">
          <i className="fa-regular fa-heart text-2xl pr-2" />
          <i className="fa-regular fa-comment-dots text-2xl" />
        </div>
        <p className="font-bold">2 Likes</p>
        <div id="comments">
          <p>
            <span className="pr-1 font-bold">Bing Chilling:</span>
            Comentário 1
          </p>
          <p>
            <span className="pr-1 font-bold">Ding Chilling:</span>
            Comentário 2
          </p>
          <p className="text-gray-400">View all comments</p>
        </div>
      </div>
      <div className="border-t px-2 py-1">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-11/12 outline-none text-gray-800"
        />
        <button className="text-gray-500 1/12">Post</button>
      </div>
    </PostContainer>
  );
}

export default Post;
