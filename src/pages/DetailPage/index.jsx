import { useEffect, useState } from 'react';

export default function DetailPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const Url = import.meta.env.VITE_BASEURL;
        const apiKey = import.meta.env.VITE_VISITJEJU_APIKEY;
        // const response = await fatch(`http://api.visitjeju.net/vsjApi/contents/searchlist?apiKey=${}`)
        const response = await fetch(
          `https://api.visitjeju.net/vsjApi/contents/searchList?locale=kr&category=c1&page=2&cid=CONT_000000000500349&item=1&apiKey=${apiKey}`,
        );
        const result = await response.json();
        setData(result.items[0]);
        console.log(setData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 p-4">
      {data ? (
        <div className="max-w-4xl mx-auto">
          {/* 이미지 섹션 */}
          {/* <div className="fixed center w-[966px] h-[270px] top-0 left-0">
            <img
              src={data.repPhoto.photoid.imgpath}
              alt={data.title}
              className="fixed center w-[966px] h-[270px] top-0 left-0 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
              <h1 className="#ffffff text-2xl font-bold">{data.title}</h1>
            </div>
          </div> */}

          {/* Info 섹션 */}
          <section className="mt-8 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold flex items-center text-gray-10">
              <span className="mr-2">🔎</span> Info
            </h2>
            <p className="mt-4 text-gray-700">
              {data.description
                ? true
                : '그에 대한 설명 입니다. 성산일출봉은 제주도의 다른 오름들과는 달리 마그마가 물속에서 분출하면서 만들어진 수성화산체다. 화산활동시 분출된 뜨거운 마그마가 차가운 바닷물과 만나면서 화산재가 습기를 많이 머금어 끈끈한 성질을 띄게 되었고, 이것이 층을 이루면서 쌓인 것이 성산일출봉이다. \n바다 근처의 퇴적층은 파도와 해류에 의해 침식되면서 지금처럼 경사가 가파른 모습을 띄게 되었다. 생성 당시엔 제주 본토와 떨어진 섬이었는데, 주변에 모래와 자갈등이 쌓이면서 간조 때면 본토와 이어지는 길이 생겼고, 1940년엔 이곳에 도로가 생기면서 현재는 육지와 완벽하게 연결되어 있다.'}
            </p>
          </section>

          {/* About 섹션 */}
          <section className="mt-8 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold flex items-center text-gray-10">
              <span className="mr-2">📍</span> About
            </h2>
            <div id="map"></div>
            <div className="mt-4 space-y-4">
              <div>
                <img src={"../../../public/icons/sogea.svg"}></img>
                <h3 className="font-medium text-gray-10">소개</h3>
                <p className="text-gray-700">{data.introduction}</p>
              </div>
              <div>
                <img src='../../../public/icons/marker.svg'></img>
                <h3 className="font-medium text-gray-10">지도</h3>
                <p className="text-gray-700">
                  {data.address}
                </p>
              </div>
              <div>
                <img src='../../../public/icons/phone.svg'></img>
                <h3 className="font-medium text-gray-10">전화번호</h3>
                <p className="text-gray-700">{data.phoneno}</p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
}
