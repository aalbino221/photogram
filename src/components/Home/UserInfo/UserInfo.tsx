import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCurrentUser from '../../../hooks/currentUser';
import getUserInfo, {
  UserInfoProps,
} from '../../../firebase/firestore/getInfo/getUserInfo';
import Stats from '../../Reusable/components/Stats';
import UserNamePicture from '../../Reusable/components/UserNamePicture';

function UserInfo() {
  const [, userId] = useCurrentUser();
  const [info, setInfo] = useState<UserInfoProps | null>(null);

  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userId !== '') {
      getUserInfo(userId).then((data) => {
        setInfo(data);
      });
    } else if (userStorage !== null && userStorage !== '') {
      getUserInfo(userStorage).then((data) => {
        setInfo(data);
      });
    }
  }, [userId]);

  return (
    <div className="flex flex-col gap-3 w-56">
      {info !== null ? (
        <div>
          <Link to={`/profile/${userId}`}>
            <UserNamePicture
              imgLink={info?.profilePicture}
              userName={info?.name}
              imgSize={4}
              fontSize="xl"
            />
          </Link>
          <div className="flex justify-between">
            <Stats
              name="Following"
              count={info?.followingCount || 0}
            />
            <Stats
              name="Followers"
              count={info?.followerCount || 0}
            />
            <Stats
              name="Posts"
              count={info?.postCount || 0}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserInfo;
