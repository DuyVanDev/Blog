import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className='container flex flex-col md:flex-row w-full py-8 items-center justify-between text-[14px] '>
      <p>© 2024 CopyRights NVD </p>
      <dir className='flex gap-5'>
        <Link href='/contact'>Contact</Link>
        <Link href='/'>Terms of Service</Link>
        <Link href='/' target='_blank'>
          Privacy Policy
        </Link>
      </dir>
    </div>
  );
};

export default Footer;
