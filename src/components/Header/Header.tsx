/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import tw from 'tailwind-styled-components';
import CreatePostModal from './CreatePostModal.tsx/CreatePostModal';
import SearchInput from './SearchInput/SearchInput';
import Logo from './Logo/Logo';
import IconsBar from './IconsBar/IconsBar';

export const HeaderContainer = tw.div`
  shadow-md
  sticky
  top-0
  w-full
  flex
  border-b
  p-4
  justify-between
  px-96
  text-gray-800
  bg-white
`;

function Header() {
  return (
    <HeaderContainer>
      <CreatePostModal />
      <Logo />
      <SearchInput />
      <IconsBar />
    </HeaderContainer>
  );
}

export default Header;
