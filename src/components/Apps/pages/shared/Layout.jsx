import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Footer from "./Footer";
import style from "../../../../styles/Layout.module.css";

function Layout({ children }) {
  return (
    <div className={style.PageLayout}>
      <SideBar />
      <TopBar />
      <main className="container-fluid">{children}</main>
      <Footer />
    </div>
  );
}

export default (Layout);
