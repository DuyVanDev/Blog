"use client";
import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import React from "react";
import Link from "next/link";
import { ConvertTime } from "@/common/ConvertTime";
import axios from "axios";

const DashPosts = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const handleApprove = async (id) => {
    const result = await axios.post(`http://localhost:5167/api/BlogPost/approve?postId=${id}`)

    if(result) {
    }

  }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <>
        <Table className="static shadow-md bg-transparent">
          <Table.Head>
            <Table.HeadCell>Tiêu đề</Table.HeadCell>
            <Table.HeadCell>Hình ảnh</Table.HeadCell>
            <Table.HeadCell>Ngày đăng</Table.HeadCell>
            <Table.HeadCell>Danh mục</Table.HeadCell>
            <Table.HeadCell>
              <span>Chi tiết</span>
            </Table.HeadCell>
            <Table.HeadCell>Trạng thái</Table.HeadCell>
          </Table.Head>
          {data.map((post) => (
            <Table.Body key={post.postId} className="divide-y">
              <Table.Row className="bg-transparent">
                <Table.Cell>
                  <Link className="text-inherit" href={`/`}>
                    {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell className="">
                  <Link href={`/a`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-20 h-10 object-cover bg-gray-500"
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell>{ConvertTime(post.createdAt)}</Table.Cell>
                <Table.Cell>{post.categoryName}</Table.Cell>

                <Table.Cell>
                  <Link
                    className="text-teal-500 hover:underline"
                    href={`/update-pos`}
                  >
                    <span>View</span>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => handleApprove(post?.postID)}
                    className="font-medium text-orange-500 hover:underline cursor-pointer"
                  >
                    Duyệt
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className="font-medium text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                </Table.Cell>
                
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {showMore && (
          <button
            // onClick={handleShowMore}
            className="w-full text-teal-500 self-center text-sm py-7"
          >
            Show more
          </button>
        )}
      </>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure">Yes, I'm sure</Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashPosts;
