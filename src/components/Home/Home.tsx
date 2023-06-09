import tw from 'tailwind-styled-components';
import Feed from './Feed/Feed';
import UserInfo from './UserInfo/UserInfo';

const HomeContainer = tw.div`
  flex
  mx-80
  px-6
  py-16
  gap-16
`;

function Home() {
  return (
    <HomeContainer>
      <UserInfo />
      <Feed />
    </HomeContainer>
  );
}

export default Home;
