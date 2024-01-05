const About = () => {
    return (
    <div className="flex scroll-mx-1.5 mt-28">
    <div className="w-1/2 flex items-center">
      <img src="bg1.png" className="w-771 h-771 flex-shrink-0" />
    </div>

    <div className="w-3/4 flex flex-col justify-center mx-auto">
      <h1 className="text-3xl md:text-5xl text-center text-white font-bold scroll-mx-1">
        About
      </h1>
      <p className="text-white text-center text-lg md:text-3xl my-5 mr-10">
        Write Fit specializes in crafting engaging content marketing materials
        for fitness businesses and websites. It also features <br />a dedicated
        fitness writing blog to inspire and educate industry professionals.
      </p>
    </div>
  </div>);
  };
  
  export default About;