import { Link } from 'react-router-dom';
import { Button } from '../reusable';

export default function Logo() {
  return (
    <div>
      <Link to="/">
        <Button>
          <h1 className="font-semibold text-2xl font-unica">Photogram</h1>
        </Button>
      </Link>
    </div>
  );
}
