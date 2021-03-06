import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import { useVisualMode } from "hooks/useVisualMode";

function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const CONFIRM = "CONFIRM"
  const DELETING = "DELETING"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //object destructuring from the obect returned by useVisualMode 
  const { mode, transition, back } = useVisualMode(props.interview? SHOW : EMPTY)

  const save = function(student, interviewer) {
    if (student && interviewer) {
      const interview = {
        student: student,
        interviewer
      };
      transition(SAVING)
      props
        .bookInterview(props.id,interview)
        .then(() =>{transition(SHOW)})
        .catch((error) => transition(ERROR_SAVE, true));

    }
  }

  const deletes = function() { 
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(()=> {transition(EMPTY)})
    .catch((error) => transition(ERROR_DELETE, true));
  }

  
  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer} 
          onDelete = {()=>{transition(CONFIRM)}}
          onEdit = {()=>transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING &&
        <Status message = "Saving" />
      }

      {mode === DELETING &&
        <Status message = "Deleting" />
      }

      {mode === CONFIRM &&
        <Confirm 
          message = "Are you sure you would like to delete?"
          onConfirm = {deletes} onCancel = {back}/>
      }

      {mode === EDIT &&
        <Form 
          student = {props.interview.student}
          interviewer = {props.interview.interviewer.id}
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save}
        />
      }

      {mode === ERROR_SAVE && 
        <Error 
          message="Create appointment failed, error connecting to server"
          onClose={back}
        />
      }

      {mode === ERROR_DELETE && 
        <Error 
          message="Delete appointment failed, error connecting to server"
          onClose={back}
        />
      }
    </article>
  )
}

export default Appointment;