"use client";
// components/PopUp.js

import React, { useEffect, useState } from "react";
import { Directus } from "@directus/sdk";

const PopUp = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [motivation, setMotivation] = useState("");
  const directus = new Directus("http://localhost:8055");

  const closePopUpHandler = () => setShowPopUp(false);

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
    }, 500000000);

    return () => {
      clearInterval(timer);
    };
  }, [directus]);

  return (
    <>
      {showPopUp && (
        <div className="fixed right-0 top-0 m-4">
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box bg-cyan-700 text-gray-200 drop-shadow-md relative ">
              <p className="py-4 text-2xl flex justify-center">🎉{motivation}🎉</p>
              <button
                className="text-gray-200 absolute top-3 right-4 text-xl"
                onClick={closePopUpHandler}
              >
                x
              </button>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};

export default PopUp;
