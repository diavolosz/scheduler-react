import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss'

function DayListItem(props) {

  let listClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  })

  const formatSpots = (spots) => {
    if (spots === 0) {
      return 'no spots remaining'
    } else if (spots === 1) {
      return '1 spot remaining'
    } else if (spots > 1) {
      return `${spots} spots remaining`
    }
  }

  return (
    <li data-testid="day" className={listClass} onClick={props.setDay} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  )
}

export default DayListItem;