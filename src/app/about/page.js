'use client'
import { Directus } from "@directus/sdk";

const About = async () => {
  const directus = new Directus('http://localhost:8055')

  const publicData = await directus.items('about').readByQuery({sort: ['id']});
  console.log(publicData.data)
  publicData.data.forEach(item => {
    console.log(item.info);
  });

  return (
    <div className="flex scroll-mx-1.5 mt-28">
      <div className="w-1/2 flex items-center">
        <img src="bg1.png" className="w-771 h-771 flex-shrink-0" />
      </div>

      <div className="w-3/4 flex flex-col justify-center mx-auto">
        <h1 className="text-3xl md:text-5xl text-center text-black font-bold scroll-mx-1">
          About
        </h1>
        {publicData.data.map((item, index) => {
        if (item.info) {
          return (
            <p key={index} className="text-black text-center text-lg md:text-3xl my-5 mr-14">
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
