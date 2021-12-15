import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
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

  const BreadcrumbList = [<Link to='/'>Main page</Link>,"User satistics"];


  return (
    <>
    <Breadcrumb items={BreadcrumbList}/>
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
                    <td><Link to={`/user/${user.id}`}>{user.id}</Link></td>
                    <td><Link to={`/user/${user.id}`}>{user.first_name}</Link></td>
                    <td><Link to={`/user/${user.id}`}>{user.last_name}</Link></td>
                    <td><Link to={`/user/${user.id}`}>{user.email}</Link></td>
                    <td><Link to={`/user/${user.id}`}>{user.gender}</Link></td>
                    <td><Link to={`/user/${user.id}`}>{user.ip_adress}</Link></td>
                    <td><Link to={`/user/${user.id}`}>{user.total_clicks}</Link></td>
                    <td><Link to={`/user/${user.id}`}>{user.total_page_views}</Link></td>
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
                  setPage(page-1);  
                }
              }}
              className={ page > 1 ? style.pagination__prev : style.pagination__prev_inactive}>
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
                  setPage(page+1);  
                }
              }} 
              className={ page < totalCountPages ? style.pagination__next : style.pagination__next_inactive}>
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