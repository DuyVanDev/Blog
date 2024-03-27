import Link from "next/link";

const Logo = ({ type }) => {
  return (
    <div className=''>
      <Link
        href='/'
        className={`text-2xl font-semibold dark:text-white ${
          type && "text-white  text-4xl"
        }`}
      >
        Blog
        <span
          className={`text-3xl text-blue-500 ${type && " text-5xl font-bold"}`}
        >
          TDMU
        </span>
      </Link>
    </div>
  );
};

export default Logo;
