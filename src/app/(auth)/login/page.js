const Login = () => {
  return (
    <>
      <div className="h-screen bg-[#cbd7ce]">
        <div className="absolute inset-x-52 inset-y-50 card card-side bg-white shadow-md w-3/4 h-3/4 mt-16">
          <figure>
            <img src="/img.png" alt="workout" />
          </figure>
          <form className="flex justify-center card-body mx-24">
            <div className="form-control">
              <h1 className="mt-1 text-black font-bold text-5xl">Hello!</h1>
              <h2 className="text-black text-lg mt-10">
                Welcome Back
              </h2>

              <div className="input-box my-2">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="input input-bordered w-full max-w-xs bg-[#cbd7ce] placeholder-[#587F61] text-[#587F61]"
                  required
                />
              </div>
              
              <div className="input-box my-2">
                <input
                  type="password"
                  placeholder="Create password"
                  className="input input-bordered w-full max-w-xs bg-[#cbd7ce] placeholder-[#587F61] text-[#587F61]"
                  required
                />
              </div>
              
              <div className="flex w-11/12 justify-center rounded-md bg-[#587F61] my-2  px-2 py-3 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52] ">
                <input type="Submit" value="Sign in" className="max-w-xs" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
