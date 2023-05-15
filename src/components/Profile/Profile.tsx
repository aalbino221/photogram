import tw from 'tailwind-styled-components';
import ProfileInfo from './ProfileInfo';
import ProfilePosts from './ProfilePosts';

const ProfileContainer = tw.div`
  mx-auto
  w-6/12
  flex
  py-16
  flex-col
  gap-12
`;

export default function Profile() {
  return (
    <ProfileContainer>
      <ProfileInfo />
      <ProfilePosts />
    </ProfileContainer>
  );
}
