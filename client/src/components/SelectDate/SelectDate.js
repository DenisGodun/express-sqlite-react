import { forwardRef, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import style from "./SelectDate.module.scss";

import iconCalendar from "../../assets/images/svg/icons/icon-calendar.svg";

const SelectDate = ({updateData}) => {
  const [dateRange, setDateRange] = useState([new Date(Date.parse("2019-10-01")), new Date(Date.parse("2019-10-31"))]);
  const [startDate, endDate] = dateRange;

  const Input = forwardRef(({ value, onClick }, ref) => (
    <div className={style.dateInput}>
      <div className={style.dateInput__title}>
        Select date range  
      </div>
      <div className={style.dateInput__dateForm} onClick={onClick} ref={ref}>
        <div className={style.dateInput__row}>
          <div className={style.dateInput__icon}>
            <img src={iconCalendar} alt="" />
          </div>
          <div className={style.dateInput__value}>
            {value}  
          </div>
        </div>
      </div>
    </div>
  ));

  const handleCalendarClose = () => {
    updateData(dateRange);
  }
  const handleCalendarOpen = () => console.log("Calendar opened");

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}

      monthsShown={2}
      dateFormat="MMM d, yyyy"
      
      customInput={<Input />}

      onCalendarClose={handleCalendarClose}
      onCalendarOpen={handleCalendarOpen}
    />
  );
}

export default SelectDate;