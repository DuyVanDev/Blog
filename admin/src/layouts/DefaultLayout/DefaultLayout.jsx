import PropTypes from "prop-types";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
      </div>
      <div className="mt-[100px]">
      {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};



export default DefaultLayout;
