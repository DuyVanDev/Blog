import Link from 'next/link';
import React from 'react'
import useSWR from 'swr';

const Categories = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, isLoading, mutate } = useSWR(
      `http://localhost:5167/api/Category`,
      fetcher
    );
  return (
    <div className='w-full flex flex-wrap py-10 gap-8'>
        {data?.map((cat) => (
              <Link
                href={`/blog/asd`}
                className={`flex items-center justify-center gap-3 bg-${cat?.color}   font-semibold text-base px-4 py-2 rounded cursor-pointer`}
                key={cat.categoryId}
              >
                {console.log(cat?.color)}
                <span>{cat.categoryName}</span>
              </Link>
            ))}
    </div>
  )
}

export default Categories