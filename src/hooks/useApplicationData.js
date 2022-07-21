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


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, 
                                   appointments: all[1].data, 
                                   interviewers: all[2].data
      }))
    })
  }, [])


  const bookInterview = function(id, interview, processed = true) {
    const editing = state.appointments[id].interview !== null

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
      let days = [...state.days];
      if (processed) {        
        const modifiedDays = days.map(day => {
          const updatedDay = {...day}
          if (updatedDay.appointments.includes(id) && !editing) {
            updatedDay.spots --;
          }
          return updatedDay;
        })
        setState({
          ...state, 
          days: modifiedDays,
          appointments
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
      let days = [...state.days]
      if (processed) {        
        const modifiedDays = days.map(day => {
          const updatedDay = {...day}
          if (updatedDay.appointments.includes(id)) {
            updatedDay.spots ++;
          }
          return updatedDay;
        })
        setState({
          ...state,
          days: modifiedDays,
          appointments
        })
      }
    })
  }

  return { state, setDay, bookInterview, cancelInterview };
}