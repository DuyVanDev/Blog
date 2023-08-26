"use client";
import React, { useContext, useState } from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import Post from "@/components/Post/Post";

const Profile = () => {
  const searchParams = useSearchParams();
  const userParams = searchParams.get("id");
  const [modal, setModal] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  // const [ newTitle, setNewTitle ] = useState("")
  // const [ newDesc, setNewDesc ] = useState("")
  const [openUpdate, setOpenUpdate] = useState(false);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());


  const { data, error, isLoading } = useSWR(
    `http://localhost:5167/api/BlogPost/post/?userId=${userParams}`,
    fetcher
  );
  
  console.log(data)

  // const handleSave = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await fetch("http://localhost:9000/api/post/64ca1dce71113eaa9c925e7a", {
  //       method : "PUT",
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({title : newTitle, desc: newDesc})
  //     })
  //     .then((data) => {
  //       console.log(data)
  //       setModal(false)
  //     }) 
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }

  // const handleClick = async (id) => {
  //   // setModal(true);
  //   const res = await getData(id);
  //   // await setDataEdit(res)
  //   //  setNewTitle(res[0].title)
  //   // setNewDesc(res[0].desc)
  // };

  return (
    <div className="container ">
      <div className="content">
        <div className="info"></div>
        <div className="blogs">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data?.map((post) => (
              <Post post={post} userParams={userParams} key={post.postID}/>
            ))
          )}
        </div>
      </div>
      {/* {modal && dataEdit.length > 0 ? (
        <form action="">
          <div className={styles.editContainer}>
          <div className={styles.editContent}>
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
            <input value={newDesc} onChange={(e) => setNewDesc(e.target.value)}/>
            
          </div>
          <button onClick={handleSave}>Save</button>
        </div>
        </form>
      ) : <div>Loading...</div>} */}
    </div>
  );
};

export default Profile;
