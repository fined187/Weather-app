'use client';
import { useRouter } from "next/navigation";
import '../global.css';

export default function HomeBtn() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/');
  }

  return (
    <>
      <button onClick={handleClick}>홈으로</button>
    </>
  )
}