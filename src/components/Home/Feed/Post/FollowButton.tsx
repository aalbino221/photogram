/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react';
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
  const [followed, setFollowed] = useState(false);

  const follow = () => {
    if (!followed) {
      followUser(postUserId, currentUserId);
    } else {
      unfollowUser(postUserId, currentUserId);
    }
    setFollowed(!followed);
  };

  useEffect(() => {
    async function fetchData() {
      const isFollowed = await getFollowed(postUserId);
      setFollowed(isFollowed);
    }
    fetchData();
  }, [postUserId]);

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
