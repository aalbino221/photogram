/* eslint-disable react/jsx-one-expression-per-line */
import { useState, useEffect } from 'react';
import getUserInfo from '../../../firebase/firestore/getInfo/getUserInfo';

interface CommentProps {
  text: string;
  userId: string;
}

export default function Comment({ text, userId }: CommentProps) {
  const [name, setName] = useState('');
  useEffect(() => {
    async function getData() {
      const data = await getUserInfo(userId);
      setName(data.name);
    }
    getData();
  });
  return (
    <p>
      <span className="pr-1 font-bold">{name}:</span>
      <span className={name === 'deleted' ? 'line-through' : ''}>
        {name !== 'deleted' ? text : 'deleted'}
      </span>
    </p>
  );
}
