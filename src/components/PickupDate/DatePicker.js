import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

const DatePick = () => {
    const [startDate,setStartDate]=useState(new Date());
    return(
        <DatePicker 
        selected={startDate}
        onChange={date => setStartDate(date)} />
    );
};

export default DatePick;