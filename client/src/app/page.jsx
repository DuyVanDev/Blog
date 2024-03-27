
"use client"
// import Banner from "@/components/Banner/Banner";
import RootLayout from "./layout";
import { Banner, Card, PopularPosts, PopularWriters } from "@/components";
import { CATEGORIES, popular, posts } from "@/utils/dummyData";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import Categories from "@/components/Categories";
import { Pagination } from "@mui/material";

export default function Home() {
  const [ data, setData ] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5167/api/BlogPost/pagination?page=${currentPage}&pageSize=10`
      );
      const result = await response.json();
      const filterData = result?.data?.filter(item => item?.isApprove == true)
      setData(filterData);
      setTotalPages(Math.ceil(result.totalCount / 10)); 
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage]);
  const handleChange = (event, value) => {
    setIsLoading(true)
    setCurrentPage(value);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };
  const randomIndex = Math.floor(Math.random() * data.length);
  console.log(data)


  if (data?.length < 1)
    return (
      <div className='w-full h-full py-8 flex items-center justify-center'>
        <span className='text-lg text-slate-500'>No Post Available</span>
      </div>
    );
  return (
    <div className='py-10 2xl:py-5'>
      <Banner post={data[randomIndex]} />

      <div className='px-0 lg:pl-20 2xl:px-20 '>
        {/* Categories */}
        <div className='mt-6 md:mt-0'>
          <p className='text-2xl font-semibold text-gray-600 '>
            Chủ đề
          </p>
          
            {/* {CATEGORIES.map((cat) => (
              <Link
                href={`/blog/asd`}
                className={`flex items-center justify-center gap-3 ${cat.color} text-white font-semibold text-base px-4 py-2 rounded cursor-pointer`}
                key={cat.label}
              >
                {cat?.icon}
                <span>{cat.label}</span>
              </Link>
            ))} */}
            <Categories />
        </div>

        {/* Blog Post */}
        <div className='w-full flex flex-col md:flex-row gap-10 2xl:gap-20'>
          {/* LEFT */}
          <div className='w-full md:w-2/3 flex flex-col gap-y-28 md:gap-y-14'>
            {data?.map((post, index) => (
              <Card key={post?.postID} post={post} index={index} />
            ))}

            <div className='w-full flex items-cemter justify-center'>
            <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
            </div>
          </div>

          {/* RIGHT */}
          <div className='w-full md:w-1/4 flex flex-col gap-y-12'>
            {/* POPULAR POSTS */}
            <PopularPosts posts={popular?.posts} />

            {/* POPULAR WRITERS */}
            <PopularWriters data={popular?.writers} />
          </div>
        </div>
      </div>
    </div>
    // <div className="   ">
    //   {/* <Image
    //       className={styles.img}
    //       src={Hero} // Path to your image inside the public directory
    //       alt="Background Image"
    //     /> */}
    //   <Banner />
    //   <div className="container">
    //   <MainTitle />
    //   <div className="flex gap-8">
    //     <div className="basis-8/12">
    //       <div>
    //         <AllPost />
    //       </div>
    //     </div>
    //     <div className="basis-4/12">
    //       <Sidebar />
    //     </div>
    //   </div>
    //   </div>
    // </div>

    
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <RootLayout layoutType={"user"}>
      {page}
    </RootLayout>
  )
}