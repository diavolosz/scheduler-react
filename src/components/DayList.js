import React from "react";
import DayListItem from "./DayListItem";


function DayList(props) {
  
  const days = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id} 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.selectedDay}
        setDay={() => props.onChange(day.name)}
      />
    )
  })
  return(
    <ul>
      {days}
    </ul>
  )
}

export default DayList