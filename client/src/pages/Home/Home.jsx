import { Link } from "react-router-dom";

import style from "./Home.module.scss";

import bottomImage from "../../assets/images/svg/about-background.svg";
import mobileImage from "../../assets/images/png/mobile.png";
import iconDesign from "../../assets/images/svg/icons/icon-design.svg";
import iconSecure from "../../assets/images/svg/icons/icon-secure.svg";
import iconRetina from "../../assets/images/svg/icons/icon-retina.svg";

const Home = () => {
  return (
    <>
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
            <img src={mobileImage} alt="mobile" />
          </div>
        </div>
      </div>
      <div className={style.about__bottomImage}>
        <img src={bottomImage} alt="wave background" />
      </div>
    </div>
    <div className={style.benefits}>
      <div className={style.benefits__container}>
        <div className={style.benefits__header}>
          <h2>Why <span className={style.benefits_header_bold}>small business owners <br/> love</span> AppCo?</h2>
          <p>Our design projects are fresh and simple and will benefit your business <br/> greatly. Learn more about our work!</p>
        </div>
        <div className={style.benefits__row}>
          <div className={style.benefits__item}>
            <div className={style.benefits__body}>
              <div><img src={iconDesign} alt="icon-design" /></div>
              <h5>Clean Design</h5>
              <p>Increase sales by showing true dynamics of your website.</p>
            </div>
          </div>
          <div className={style.benefits__item}>
            <div className={style.benefits__body}>
              <div><img src={iconSecure} alt="icon-design" /></div>
              <h5>Secure Data</h5>
              <p>Build your online store’s trust using Social Proof & Urgency.</p>
            </div>
          </div>
          <div className={style.benefits__item}>
            <div className={style.benefits__body}>
              <div><img src={iconRetina} alt="icon-design" /></div>
              <h5>Retina Ready</h5>
              <p>Realize importance of social proof in customer’s purchase decision.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={style.contentFooter}>
      <div className={style.container}>
        <div className={style.contentFooter__row}>
          <div className={style.contentFooter__inputForm}>
            <input type="text" placeholder="Enter your email"/>
            <input type="submit" value="Subscribe"/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;