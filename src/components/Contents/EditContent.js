const EditContent = () => {
    return (
      <>
        <div className="flex justify-end mr-[300px]">
          <div className="w-[166px] h-[60px] px-10 py-2.5 rounded-md bg-[#587F61] text-white text-2xl font-bold shadow-sm hover:bg-[#4a6b52] mt-20 flex ">
            <input type="Submit" value="Update" className="" />
          </div>
        </div>
  
        <div className="mt-2">
          <div class="flex items-center justify-center w-full ">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-[1110px] h-[504px] rounded-[20px] border-gray-400 border-4 cursor-pointer bg-zinc-300  hover:bg-gray-400 "
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6 ">
                <svg
                  class="w-8 h-8 mb-4 text-neutral-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 w-[354.36px] text-center text-neutral-500 text-5xl font-normal">
                  <span class="font-semibold">Click to upload</span>
                </p>
                <p class="mb-2 w-[354.36px] text-center text-neutral-500 text-xl font-normal">
                  <span class="font-semibold">or drag and drop</span>
                </p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
            </label>
          </div>
  
          <div className="input-box flex justify-center mt-5">
            <div className="text-black text-2xl font-bold my-auto mr-5">
              Video clip name
            </div>
            <input
              type="text"
              placeholder="Please enter the name of your video clip"
              className="input w-[850px] h-[50px] px-5 py-2.5 bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex"
              required
            />
          </div>
          <div className="input-box flex justify-start mt-5 ml-[312px]">
            <div className="text-black text-2xl font-bold  mr-[125px] ">
              Details
            </div>
            <textarea
              type="text"
              placeholder="Describe the details of your video clip."
              className="input w-[850px] h-[134px] px-5 py-2.5 bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex"
              required
            />
          </div>
        </div>
      </>
    );
  };
  export default EditContent;
  