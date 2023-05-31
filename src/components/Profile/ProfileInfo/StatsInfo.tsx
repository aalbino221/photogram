/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import FollowButton from '../../Home/Feed/Post/FollowButton';
import getUserInfo from '../../../firebase/firestore/getInfo/getUserInfo';

interface StatsInfoProps {
  name: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  id: string;
  currentUserId: string;
}

export default function StatsInfo({ stats }: { stats: StatsInfoProps }) {
  const change = useSelector((state: RootState) => state.change.change);
  const { name, currentUserId, id } = stats;
  const [followingCount, setFollowingCount] = useState(stats.followingCount);
  const [followerCount, setFollowerCount] = useState(stats.followerCount);
  const [postCount, setPostCount] = useState(stats.postCount);

  useEffect(() => {
    getUserInfo(id).then((info) => {
      setFollowingCount(info.followingCount);
      setFollowerCount(info.followerCount);
      setPostCount(info.postCount);
    });
  }, [change, id]);

  return (
    <div className="w-7/12 flex flex-col gap-3">
      <div className="flex gap-5">
        <h2 className="text-lg font-bold">{name}</h2>
        <FollowButton
          postUserId={id}
          currentUserId={currentUserId}
        />
        <button
          className=" rounded px-3 bg-gray-400 text-white"
          type="button"
        >
          Message
        </button>
      </div>
      <div className="flex gap-3">
        <div>
          <p className="text-gray-800 font-semibold">
            {followingCount} Following
          </p>
        </div>
        <div>
          <p className="text-gray-800 font-semibold">
            {followerCount} Followers
          </p>
        </div>
        <div>
          <p className="text-gray-800 font-semibold">{postCount} Posts</p>
        </div>
      </div>
    </div>
  );
}
