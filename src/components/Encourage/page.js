// components/PopUp.js
'use client'
import React, { useEffect, useState } from "react";
import { Directus } from "@directus/sdk";
import Cookies from "js-cookie";

const PopUp = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [motivation, setMotivation] = useState("");
  const directus = new Directus("http://localhost:8055");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const closePopUpHandler = () => setShowPopUp(false);
  const authToken = Cookies.get("token");

  useEffect(() => {
    const logging = () => {
      try {
        // Check if the authToken exists in cookies
        const isLoggedIn = !!authToken;
        setIsLoggedIn(isLoggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    logging();
  }, [authToken]);

  useEffect(() => {
    const fetchMotivation = async () => {
      try {
        const response = await directus.items("encourage").readByQuery();
        console.log(response);

        const data = response.data;

        data.forEach((item) => {
          console.log(item.motivation);
        });

        const motivations = data.map((item) => item.motivation);
        const randomMotivation =
          motivations[Math.floor(Math.random() * motivations.length)];

        setMotivation(randomMotivation);
        setShowPopUp(true);

        const dialogElement = document.getElementById("my_modal_2");
        dialogElement.show();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const timer = setInterval(() => {
      fetchMotivation();
    }, 5000000000);

    return () => {
      clearInterval(timer);
    };
  }, [directus, isLoggedIn]);

  return (
    <>
      {showPopUp && isLoggedIn && (
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box bg-[#FFF] text-black drop-shadow-md absolute end-5 mr-16 bottom-64">
          <div className="modal-header flex justify-between items-center text-3xl p-3">🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉</div>
            <p className="py-4 text-3xl flex justify-center text-center w-full h-full p-5">{motivation}</p>
            <div className=" modal-backdrop">
              <button
                className="text-black absolute top-3 right-4 text-xl"
                onClick={closePopUpHandler}
              >
                x
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default PopUp;
