import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show student={props.student} interviewer={props.interviewer}/> :  <Empty />}
    </article>
  )
}

export default Appointment;