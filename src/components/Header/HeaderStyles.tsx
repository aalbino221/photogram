import tw from 'tailwind-styled-components';

const Icon = tw.i`
  text-xl
`;

const Button = tw.button`
  appearance-none
`;

export const HeaderContainer = tw.div`
  flex
  border-b
  p-4
  justify-between
  px-96
  text-gray-800
`;

export { Icon, Button };
