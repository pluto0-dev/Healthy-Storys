const Fighting = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card w-2/4 h-4/6 bg-[#eef2ef] shadow-xl flex flex-col items-center justify-between">
        <div className="absolute top-0 right-0 m-4">
          <input
            type="Submit"
            value="Skip"
            className="bg-[#587F61] text-white px-4 py-2 rounded-full shadow-md"
          />
        </div>
        <div className="card-body relative">
          <div className="card-title text-center">
            Fill in the details to calculate your calories
          </div>
        </div>
        <form className="flex card-body text-[#587F61] flex-col items-center">
          <div className="form-control">
            <div className="input-box mb-2 mx-6">
              Age
              <input
                type="text"
                placeholder="Enter your age"
                className="input input-bordered w-full max-w-ws bg-[#cbd7ce] placeholder-[#587F61] mx-2"
                required
              />
            </div>
            <div className="inline-flex items-center mx-6">
              Gender
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                className="radio checked:bg-[#587F61] mx-1"
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                className="radio checked:bg-[#587F61] mx-1"
              />
              <label htmlFor="female">Female</label>
            </div>

            <div className="input-box my-2 mx-6">
              Height
              <input
                type="text"
                placeholder="Enter your height"
                className="input input-bordered w-full max-w-xs bg-[#cbd7ce] placeholder-[#587F61] text-[#587F61] mx-2"
                required
              />
            </div>
            <div className="input-box my-2 mx-6">
              Weight
              <input
                type="text"
                placeholder="Enter your weight"
                className="input input-bordered w-full max-w-xs bg-[#cbd7ce] placeholder-[#587F61] text-[#587F61] mx-2"
                required
              />
            </div>

            <div className="dropdown mx-6">
              Activity
              <div tabIndex={0} role="button" className="btn m-1 bg-[#cbd7ce] ">
                Select Activity
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-[#cbd7ce] rounded-box w-52"
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

            <div className="inline-flex mt-4">
              <div className="flex w-6/12 justify-center rounded-md bg-[#587F61] mx-2 py-3 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52] ">
                <input type="Submit" value="Calculate" className="max-w-xs" />
              </div>
              <div className="flex w-6/12 justify-center rounded-md bg-[#587F61] mx-2 py-3 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52] ">
                <input type="Submit" value="Clear" className="max-w-xs" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Fighting;
