import { Link } from 'react-router-dom';
import BtnIcon from './BtnIcon/BtnIcon';
import UserDropdown from './UserDropdown/UserDropdown';
import useCurrentUser from '../../../hooks/currentUser';

export default function IconsBar() {
  const [userName] = useCurrentUser();
  const showModal = () => {
    if (userName === '') {
      return;
    }
    document.querySelector('dialog')?.showModal();
  };
  return (
    <div className="flex gap-6">
      <BtnIcon
        classProp="fa-regular fa-square-plus text-xl "
        onClick={showModal}
      />
      <Link to="/">
        <BtnIcon classProp="fa-solid fa-house text-lg" />
      </Link>
      <BtnIcon classProp="fa-solid fa-comment" />
      <UserDropdown />
    </div>
  );
}
