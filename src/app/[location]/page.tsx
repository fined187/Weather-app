import HomeBtn from "../components/HomeBtn";

type Props = {
  params: {
    location: string
  }
}
//  http://api.weatherapi.com/v1/current.json?key=8def50ea49fc4a4681380225231111&q=Seoul&aqi=no
export default function Detail({params}: Props) {
  const name = params.location === 'seoul' ? '서울' : '';

  return (
    <>
      <h1>{name}의 3일 예보</h1>
      <HomeBtn />
    </>
  )
}