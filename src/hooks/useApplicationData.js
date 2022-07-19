import axios from "axios";
import { useState, useEffect } from "react"

export function useApplicationData() {

  const setDay = selectedDay => setState({ ...state, selectedDay });

  const [state, setState] = useState({
    selectedDay: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  console.log(state)

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, 
                                  appointments: all[1].data, 
                                  interviewers: all[2].data
      }))
    })
  }, [])


  const bookInterview = function(id, interview, processed = true) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      setState({
        ...state,
        appointments
      })
    })
    .then(() => {
      if (processed) {        
        let days = state.days;
        days.map(day => {
          if (day.appointments.includes(id)) {
            day.spots --;
          }
          return day;
        })
      }
    })
  }


  const cancelInterview = function(id, interview, processed = true) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, { interview })
    .then(() => {
      setState({
        ...state,
        appointments
      })
    })
    .then(() => {
      if (processed) {        
        let days = state.days;
        days.map(day => {
          if (day.appointments.includes(id)) {
            day.spots ++;
          }
          return day;
        })
      }
    })
  }

  return { state, setDay, bookInterview, cancelInterview };
}