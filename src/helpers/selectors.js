export default function getAppointmentsForDay(state, day) {
  if(state.days) {
    const selectedDay = state.days.filter(Day => Day.name === day)[0];
    if(selectedDay) {
      const appointments = selectedDay.appointments.map((id) => {
        console.log(state.appointments[id])
        return state.appointments[id]
      })
      return appointments;
    }
  }
  return [];
}