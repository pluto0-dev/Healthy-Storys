const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <div className="text-center text-white text-5xl font-normal font-['Lalezar'] mb-8 mt-28">
        Profile
      </div>
      <div className="flex items-center justify-center ml-6 mb-6">
        <div className="avatar mr-4">
          <div className="w-[136px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="avatar"
            />
          </div>
        </div>
        <button className="bg-[#587F61] text-white px-4 py-2 rounded-md shadow-md">
          Edit
        </button>
      </div>

      <div className="card w-2/4 h-3/6 bg-[#eef2ef] shadow-xl">
        <form className="card-body text-[#587F61]">
          <div className="form-control">
            <div className="input-box mb-2 ml-36 mr-0 mx-2">
              Username
              <input
                type="text"
                placeholder="Enter your username"
                className="input input-bordered w-2/4 max-w-ws bg-[#cbd7ce] placeholder-[#587F61] ml-4 "
                required
              />
            </div>
            <div className="input-box my-2 ml-36 mr-0">
              Age
              <input
                type="text"
                placeholder="Enter your age"
                className="input input-bordered w-2/4 max-w-ws bg-[#cbd7ce] placeholder-[#587F61] ml-16"
                required
              />
            </div>
            <div className="inline-flex items-center ml-36 mr-0 mx-2">
              Gender
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                className="radio checked:bg-[#587F61] ml-10"
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                className="radio checked:bg-[#587F61] ml-10"
              />
              <label htmlFor="female">Female</label>
            </div>

            <div className="input-box my-2 ml-36 mr-0 ">
              Height
              <input
                type="text"
                placeholder="Enter your height"
                className="input input-bordered w-2/4 max-w-ws bg-[#cbd7ce] placeholder-[#587F61] ml-11"
                required
              />
            </div>
            <div className="input-box my-2 ml-36 mr-0">
              Weight
              <input
                type="text"
                placeholder="Enter your weight"
                className="input input-bordered w-2/4 max-w-ws bg-[#cbd7ce] placeholder-[#587F61] ml-[41px]"
                required
              />
            </div>

            <div className="dropdown ml-36 mr-0">
              Activity
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 bg-[#cbd7ce] w-2/4 max-w-ws ml-[37px] border-none text-[#587F61]"
              >
                Select Activity
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-[#cbd7ce] flex items-start justify-start "
              >
                <li>
                  <a>Sedentary : little or no exercise</a>
                </li>
                <li>
                  <a>Light : exercise 1-3 times/week</a>
                </li>
                <li>
                  <a>Moderate : exercise 4-5 times/week</a>
                </li>
                <li>
                  <a>
                    Active : daily exercise or intencse exercise 3-4 times/week
                  </a>
                </li>
                <li>
                  <a>Very Active : intencse exercise 6-7 times/week</a>
                </li>
                <li>
                  <a>
                    Extra Active : very intencse exercise daily, or physical job
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-center mt-2">
              <div className="flex w-6/12 justify-center rounded-md bg-[#587F61] mx-2 py-3 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52] ">
                <input type="Submit" value="Calculate" className="max-w-xs" />
              </div>
            </div>
          </div>
        </form>
        </div>
    </div>
  );
};

export default Profile;
