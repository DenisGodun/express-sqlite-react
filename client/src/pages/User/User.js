import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SelectDate from "../../components/SelectDate/SelectDate";
import axiosInstance from "../../http/httpInstance";
import { formatDate } from "../../utils/formatDate";

import style from "./User.module.scss";

const User = () => {
  let params = useParams();

  const [data, setData] = useState([]);
  const [userFullName, setUserFullName] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [requestDate, setRequestDate] = useState([null,null]);

  const fetchData = () => {
    setIsLoadingData(true);
    axiosInstance
      .get(`/api/user`, {
        params: {
          id: params.id,
          from: requestDate[0],
          to: requestDate[1]
        }
      })
      .then((response) => {
        setIsLoadingData(false);
        setUserFullName(`${response.data.result.first_name} ${response.data.result.last_name}`);
        setData(response.data.result.data);
      })
      .catch((error) => {
        setIsLoadingData(false);
        console.log(error);
      });
  }
  useEffect( () => {
    fetchData();
  }, [requestDate]);

  const BreadcrumbList = [<Link to='/'>Main page</Link>, 
                          <Link to='/users'>User satistics</Link>,
                          `${userFullName}`];


  const make = (date) => {
    setRequestDate([formatDate(date[0]), formatDate(date[1])]);
  }

  return(
    <>
      <Breadcrumb items={BreadcrumbList}/>
      <div className={style.userInfo}>
        <div className={style.container}>
          <div className={style.userInfo__row}>
            <div className={style.userInfo__title}>{userFullName} {isLoadingData && (<span className={style.loading}>Loading...</span>)} </div>
            <div className="">
              <SelectDate updateData={make} />
            </div>
          </div>
          <div className={style.userInfo__statistic}>
            <h4>Clicks {!data.length && !isLoadingData && (<span className={style.loading}>(no info)</span>)}</h4>
            <div>
              <ResponsiveContainer width={'99%'} aspect={4/1}>
                <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="date" stroke="#CCCCCC" axisLine={false} tickLine={false} padding={{ left: 40 }}/>
                  <YAxis dataKey="clicks" stroke="#CCCCCC" axisLine={false} tickLine={false} />
                  <Tooltip/>
                  <CartesianGrid stroke="#F1F1F1" vertical={false}/>
                  <Line type="monotone" dataKey="clicks" stroke="#3A80BA" strokeWidth={4} dot={false} activeDot={{ stroke: '#3A80BA;', strokeWidth: 2, r: 10 }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>  
          </div>
          <div className={style.userInfo__statistic}>
            <h4>Vievs {!data.length && !isLoadingData && (<span className={style.loading}>(no info)</span>)}</h4>
            <div>
              <ResponsiveContainer width={'99%'} aspect={4/1}>
                <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="date" stroke="#CCCCCC" axisLine={false} tickLine={false} padding={{ left: 40 }}/>
                  <YAxis dataKey="page_views" stroke="#CCCCCC" axisLine={false} tickLine={false} />
                  <Tooltip/>
                  <CartesianGrid stroke="#F1F1F1" vertical={false}/>
                  <Line type="monotone" dataKey="page_views" stroke="#3A80BA" strokeWidth={4} dot={false} activeDot={{ stroke: '#3A80BA;', strokeWidth: 2, r: 10 }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>  
          </div>            
        </div>
      </div>
    </>
  )
}

export default User;