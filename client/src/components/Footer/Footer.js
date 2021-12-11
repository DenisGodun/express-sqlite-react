import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.container}>
        <div className={style.footer__row}>
          <div className={`${style.footer__item} ${style.footer_item_logo}`}>AppCo</div>
          <div className={style.footer__item}>All rights reserved by ThemeTags</div>
          <div className={style.footer__item}>Copyrights © 2021. </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;