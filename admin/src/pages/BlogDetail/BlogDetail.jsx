import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { ConvertTime } from "../../common/ConvertTime";

const BlogDetail = () => {
  let { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5167/api/BlogPost/${id}`);

      const result = await response.json();

      setData(result);
    };

    fetchData();
  }, []);
  console.log(data)

  return <div className="container mt-4">
    <div className="w-full  px-0 md:px-10 py-8 2xl:px-20">
        <div className="w-full flex flex-col-reverse md:flex-row gap-2 gap-y-5 items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-8">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white">
              {data?.title}
            </h1>

            <div className="w-full flex items-center ">
              <span className="flex-1 text-rose-600 font-semibold">
                {data?.categoryName}
              </span>

              {/* <span className="flex flex-1 items-baseline text-2xl font-medium text-slate-700 dark:text-gray-400">
                {data?.views?.length}
                <span className="text-base text-rose-600">Views</span>
              </span> */}
            </div>

            <Link to={`profile/?id=${data?.userID}`} className="flex gap-3">
              <img
                src={data?.avatar}
                alt={data?.avatar}
                className="object-cover w-12 h-12  rounded-full"
              />
              <div className="">
                <p className="text-slate-800 dark:text-white font-medium">
                  {data?.username}
                </p>
                <span className="text-slate-600">
                  {ConvertTime(data?.createdAt)}
                </span>
              </div>
            </Link>
          </div>
          <img
            src={data?.image}
            alt={data?.title}
            className="w-full md:w-1/2 h-auto md:h-[360px] 2xl:h-[460px] rounded object-contain"
          />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-x-10  2xl:gap-x-28 mt-10">
          {/* LEFT */}
          <div className="w-full md:w-full flex flex-col text-black dark:text-gray-500 ">
            {data?.content && (
              <Markdown
                options={{ wrapper: "article" }}
                className="leading-[3rem] text-base 2xl:text-[20px]"
              >
                {data?.content}
              </Markdown>
            )}

            {/* COMMENTS SECTION */}
          </div>

          {/* RIGHT */}
          
        </div>
      </div>
  </div>;
};

export default BlogDetail;
