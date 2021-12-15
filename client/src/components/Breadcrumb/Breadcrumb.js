import { Link } from "react-router-dom";

import style from "./Breadcrumb.module.scss";

const Breadcrumb = ({items}) => {
  return(
    <div className={style.breadcrumb}>
      <div className={style.container}>
        <ul className={style.breadcrumb__list}>
          {
              items.map((item, index) => {
                return (
                  <li key={index}>{item}</li>
                );
            })}
        </ul>  
      </div>
    </div>
  )
}

export default Breadcrumb;