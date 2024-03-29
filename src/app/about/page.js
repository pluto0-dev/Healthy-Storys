'use client'
import { Directus } from "@directus/sdk";

const About = async () => {
  const directus = new Directus('http://localhost:8055')

  const publicData = await directus.items('about').readByQuery({sort: ['id']});
  console.log(publicData.data)
  publicData.data.forEach(item => {
    console.log(item.info);
  });
  //bg-[url('/bg3.png')] bg-center bg-cover
  return (
    <div className="flex scroll-mx-1.5 h-screen bg-[url('/bg2.png')] bg-center bg-cover ">
      <div className="w-1/2 flex items-center">
        <img src="bg1.png" className="w-771 h-771 flex-shrink-0 " />
      </div>

      <div className="w-3/4 flex flex-col justify-center mx-auto ">
        <h1 className="text-3xl text-center text-white font-bold scroll-mx-1 ">
          เกี่ยวกับ
        </h1>
        {publicData.data.map((item, index) => {
        if (item.info) {
          return (
            <p key={index} className="text-white text-center bg-black/50 rounded-md p-1 text-2xl  my-5 mr-20">
              {item.info}
            </p>
          );
        }
      })}

      </div>
    </div>
  );
};

export default About;
