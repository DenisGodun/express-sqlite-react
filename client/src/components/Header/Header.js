import { Link } from "react-router-dom";

import style from './Header.module.scss';

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.header__row}>
          <Link to="/">
            <div className={style.header__title}>AppCo</div>  
          </Link> 
        </div>
      </div>
    </header>
  );
}

export default Header;