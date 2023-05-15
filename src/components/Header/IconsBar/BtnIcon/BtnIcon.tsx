/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import { Button, Icon } from '../../reusable';

interface BtnIconProps {
  classProp?: string;
  onClick?: () => void;
}

export default function BtnIcon({
  classProp,
  onClick = () => {},
}: BtnIconProps) {
  return (
    <Button onClick={onClick}>
      <Icon className={classProp} />
    </Button>
  );
}
