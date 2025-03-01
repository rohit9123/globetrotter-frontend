import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function Confetti() {
  const { width, height } = useWindowSize();
  
  return (
    <ReactConfetti
      width={width}
      height={height}
      numberOfPieces={200}
      recycle={false}
      gravity={0.2}
    />
  );
}