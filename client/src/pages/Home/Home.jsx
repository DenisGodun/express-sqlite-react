import { Link } from "react-router-dom";

import style from "./Home.module.scss";

import bottomImage from "../../assets/images/svg/about-background.svg";
import mobileImage from "../../assets/images/png/mobile.png";

const Home = () => {
  return (
    <div className={style.about}>
      <div className={style.container}>
        <div className={style.about__row}>
          <div className={style.about__body}>
            <h1><span className={style.about_title_bold}>Brainstorming</span> for desired perfect Usability</h1>
            <p>Our design projects are fresh and simple and will benefit your business greatly. Learn more about our work!</p>
            <div>
              <Link to="/users">Views Stats</Link>
            </div>
          </div>
          <div className={style.about__img}>
            <div>
              <img src={mobileImage} alt="mobile" />
            </div>
          </div>
        </div>
      </div>
      <div className={style.about__bottomImage}>
        <img src={bottomImage} alt="wave background" />
      </div>
    </div>
  );
}

export default Home;