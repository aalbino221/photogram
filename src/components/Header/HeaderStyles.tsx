import tw from 'tailwind-styled-components';

const Icon = tw.i`
  text-xl
`;

const Button = tw.button`
  appearance-none
`;

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
  z-10
  bg-white
`;

export { Icon, Button };
