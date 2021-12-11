import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import style from "./Layout.module.scss";

const Layout = ({children}) => {
  return (
    <div className={style.wrapper}>
      <Header/>
      <div className={style.content}>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout;