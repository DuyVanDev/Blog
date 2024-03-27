import { Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Layout } from "antd";
import { ConvertTime } from "../../common/ConvertTime";
const { Header, Sider, Content } = Layout;
const DashPosts = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
      width: "55%",
    },
    {
      title: "Hình ảnh ",
      dataIndex: "image",
      key: "image",
      align: "center",
    },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
      key: "bcreatedAtuy",
      align: "center",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      align: "center",
    },
  ];

  const handleApprove = async (id) => {
    const result = await axios.post(
      `http://localhost:5167/api/BlogPost/approve?postId=${id}`
    );

    if (result) {
    }
  };
  console.log(data);
  const dataa =
    Array.isArray(data) &&
    data?.map((item) => ({
      key: item?.Id,
      title: <p className="font-medium ">{item?.title}</p>,
      image: (
        <img
          src={item?.image}
          alt={item?.title}
          className="w-20 h-10 object-cover bg-gray-500"
        />
      ),
      createdAt: (
        <div className="flex items-center justify-center">
          {ConvertTime(item?.createdAt)}
        </div>
      ),
      category: (
        <div className="flex items-center justify-center">
          {item?.categoryName}
        </div>
      ),
      detail: (
        <Link
          className="text-teal-500 hover:underline flex items-center justify-center"
          to={`/bai-viet/${item?.postID}`}
        >
          <span>View</span>
        </Link>
      ),
      action: (
        <div>
          <span
            onClick={() => handleApprove(item?.postID)}
            className="font-medium text-orange-500 hover:underline cursor-pointer flex items-center justify-center"
          >
            Ẩn
          </span>
        </div>
      ),
    }));
  return (
    <div className="">
      <>
        <Layout className=" bg-black mb-[100px]  ">
          <Layout className=" w-full col-start-4 col-end-12  bg-white   max-lg:ml-0  py-4 ">
            {/* <Header
              className="bg-black"
              style={{
                padding: 0,
                margin: "0 16px",
                textAlign: "center",
              }}
            >
              <Button
                type="primary"
                shape="round"
                className="bg-primary font-bold"
              >
                Danh sach
              </Button>
            </Header> */}
            <Content className="">
              <Table columns={columns} dataSource={dataa} pagination={true} />
            </Content>
          </Layout>
        </Layout>
      </>

      <>
        {showMore && (
          <button
            // onClick={handleShowMore}
            className="w-full text-teal-500 self-center text-sm py-7"
          >
            Show more
          </button>
        )}
      </>

      {/* <Modal
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
      </Modal> */}
    </div>
  );
};

export default DashPosts;
