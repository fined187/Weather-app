import Link from 'next/link'
import style from './style.module.css'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const getCurrentWeather = async() => {
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Seoul&aqi=no`);
  return res.json();
};

export default function Home() {
  console.log(getCurrentWeather());
  return (
    <>
      <h1>날씨 앱</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">
            서울
          </Link>
        </li>
        <li>
          <Link href="/newyork">
            뉴욕
          </Link>
        </li>
        <li>
          <Link href="/london">
            런던
          </Link>
        </li>
      </ul>
    </>
  )
};