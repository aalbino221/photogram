import tw from 'tailwind-styled-components';
import Feed from './Feed';
import UserInfo from './UserInfo';

const HomeContainer = tw.div`
  flex
  mx-96
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
