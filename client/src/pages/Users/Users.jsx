import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../http/httpInstance";
import { getCountPages } from "../../utils/pagination.utils";

import style from "./Users.module.scss";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  const [totalCountPages, setTotalCountPages] = useState(0);

  const [firstPage, setfirstPage] = useState(0);
  const [lastPage, setlastPage] = useState(page+3);

  if(lastPage === page-1) {
    if(lastPage + 3 > totalCountPages) {
      setlastPage(totalCountPages);
    } else {
      setlastPage(page+3);  
    }
    setfirstPage(page-1);
  }
  if(firstPage === page) {
    setfirstPage(firstPage-4);
    setlastPage(page);
  }
  let pagesArray = [];
  for(let i = firstPage; i < lastPage; i++) {
    pagesArray.push(i + 1);
  }

  const fetchUsers = () => {
    setIsLoadingUsers(true);
    axiosInstance
      .get(`/api/users`, {
        params: {
          page: page,
          limit: limit
        }
      })
      .then((response) => {
        setIsLoadingUsers(false);
        //console.log("work??!!!");
        //console.log(response.data);
        setUsers(response.data.result.users);

        const totalCountUsers = response.data.result["total-count"];
        setTotalCountPages(getCountPages(totalCountUsers, limit));
      })
      .catch((error) => {
        setIsLoadingUsers(false);
        console.log(error);
      });
  }

  useEffect( () => {
    fetchUsers();
  }, [page]);

  return (
    <>
    <div className={style.breadcrumb}>
      <div className={style.container}>
        <ul className={style.breadcrumb__list}>
          <li><Link to="/">Main page</Link></li>  
          <li>User satistics</li>  
        </ul>  
      </div>
    </div>
    <div className={style.userStatistic}>
      <div className={style.container}>
        <h4>Users statistics {isLoadingUsers && (<span className={style.loading}>Loading...</span>)}</h4>
        <div className={style.userStatistic__scrollTable}>
          <table className={style.userStatistic__table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>IP address</th>
              <th>Total clicks</th>
              <th>Total page views</th>
            </tr>  
          </thead>
          <tbody>
            {!users.length && !isLoadingUsers && (
              <tr>
                <td colSpan={8} rowSpan={totalCountPages}>No users</td>
              </tr>
            )}
            {
              users.map((user, index) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.ip_adress}</td>
                    <td>{user.total_clicks}</td>
                    <td>{user.total_page_views}</td>
                  </tr>
                );
            })}
            </tbody>
          </table>
        </div>
        {users.length && (
        <div className={style.pagination}>
          <ul>
            <li 
              onClick={() => {
                if(page > 1) {
                  console.log("prev");
                  setPage(page-1);  
                }
              }} 
              className={style.pagination__prev_inactive}>
            </li>
            {users.length &&
              pagesArray.map((elem, index) => {
                return (
                  <li onClick={() => setPage(elem)} 
                      key={index} 
                      className={page === elem ? style.pagination__active : ""}
                      >
                        {elem}
                  </li>
                );
              })
            }
            <li 
              onClick={() => {
                if(page < totalCountPages) {
                  console.log("next");
                  setPage(page+1);  
                }
              }} 
              className={style.pagination__next}>
            </li>
          </ul>
        </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Users;