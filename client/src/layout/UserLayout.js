import Header from "@/components/Header/Header";
import Footer from "@/components/footer/Footer";

const UserLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};



export default UserLayout;
