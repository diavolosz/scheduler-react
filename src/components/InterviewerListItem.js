import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss"

function InterviewerListItem(props) {

  const {name, avatar} = props

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  const interviewerImageClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected
  })
  return (
    <li onClick={props.setInterviewer} className={interviewerClass}>
      <img
        className={interviewerImageClass}
        src={avatar}
        alt={name}
      />
      {props.selected && props.name}
    </li>
  )
}

export default InterviewerListItem;