import { Link } from 'react-router-dom';
import Stats from '../Reusable/Stats';
import UserNamePicture from '../Reusable/UserNamePicture';

function UserInfo() {
  return (
    <div className="flex flex-col gap-3 w-56">
      <Link to="/profile/:id">
        <UserNamePicture
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
  );
}

export default UserInfo;
