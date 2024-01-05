import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-[#eef2ef] fixed w-full z-10 top-0">
        <div className="navbar-start">
          <div className="dropdown">
          </div>
          <a className="btn btn-ghost text-2xl text-black ml-6 p-0">
            HealthStory
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">
            <li>
              <Link href='/' className="text-black">HOME</Link>
            </li>
            <li>
              <Link href='/about' className="text-black">ABOUT</Link>
            </li>
            <li>
              <Link href='/blogs' className="text-black">blogs</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end ">
          <Link href='/login' className="btn btn-ghost text-black">Login</Link>
          <div className="ml-3">
            <Link href='/register' className="btn btn-ghost btn-circle text-black bg-white drop-shadow-lg w-36 mr-6">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
