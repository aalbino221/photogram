/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeState } from '../../../../redux/change';
import followUser from '../../../../firebase/firestore/follow/followUser';
import unfollowUser from '../../../../firebase/firestore/follow/unfollowUser';
import getFollowed from '../../../../firebase/firestore/getInfo/getFollowed';

export default function FollowButton({
  currentUserId,
  postUserId,
}: {
  currentUserId: string;
  postUserId: string;
}) {
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(false);

  const follow = async () => {
    setFollowed(!followed);
    if (!followed) {
      await followUser(postUserId, currentUserId);
    } else {
      await unfollowUser(postUserId, currentUserId);
    }
    dispatch(changeState({ change: 1 }));
  };

  useEffect(() => {
    async function fetchData() {
      const isFollowed = await getFollowed(postUserId, currentUserId);
      setFollowed(isFollowed);
    }
    fetchData();
  }, [currentUserId, postUserId]);

  return (
    <div>
      {currentUserId !== '' && (
        <button
          className={`h-min rounded text-base font-medium ${
            followed ? 'text-gray-500' : 'text-blue-700'
          }`}
          onClick={() => follow()}
        >
          {followed ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
}
