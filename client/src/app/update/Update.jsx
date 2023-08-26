const Update = ({ setOpenUpdate, user }) => {
  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form></form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
