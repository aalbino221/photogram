import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Stats from '../../Reusable/components/Stats';
import UserNamePicture from '../../Reusable/components/UserNamePicture';
import lindy from '../../../assets/lindy.jpeg';

function UserInfo() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div>
      {user.currentUser !== '' ? (
        <div className="flex flex-col gap-3 w-56">
          <Link to="/profile/:id">
            <UserNamePicture
              imgLink={lindy}
              userName="lindy2"
              imgSize={4}
              fontSize="xl"
            />
          </Link>
          <div className="flex justify-between">
            <Stats
              name="Following"
              count={1}
            />
            <Stats
              name="Followers"
              count={1}
            />
            <Stats
              name="Posts"
              count={1}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserInfo;
