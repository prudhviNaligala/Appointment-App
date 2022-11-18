// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    date: '',
    appointmentList: [],
    isFiltered: false,
  }

  onFilter = () => {
    const {isFiltered} = this.state

    this.setState({isFiltered: !isFiltered})
  }

  onChangeInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddNewAppointment = event => {
    event.preventDefault()
    const {titleInput, date} = this.state
    const formatDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formatDate,
      isLiked: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      date: '',
    }))
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isLiked: !eachAppointment.isLiked}
        }
        return eachAppointment
      }),
    }))
  }

  filteredAppointment = () => {
    const {appointmentList, isFiltered} = this.state
    if (isFiltered) {
      return appointmentList.filter(each => each.isLiked === true)
    }
    return appointmentList
  }

  render() {
    const {titleInput, date, isFiltered} = this.state
    const filteredClassName = isFiltered ? 'filter-filled' : 'filter-empty'
    const filteredAppointment = this.filteredAppointment()

    return (
      <div className="bg-container">
        <div className="card-container">
          <form className="form" onSubmit={this.onAddNewAppointment}>
            <div className="input-container">
              <h1 className="heading">Add Appointment</h1>
              <label className="label-txt" htmlFor="Title">
                TITLE
              </label>
              <input
                id="Title"
                className="input"
                type="text"
                placeholder="Title"
                onChange={this.onChangeInput}
                value={titleInput}
              />
              <label className="label-txt" htmlFor="Date">
                DATE
              </label>
              <input
                id="Date"
                className="input"
                type="date"
                onChange={this.onChangeDate}
                value={date}
              />
              <button className="btn" type="submit">
                Add
              </button>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </form>
          <hr className="line" />
          <div className="star-container">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className={`filter-style ${filteredClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="un-order">
            {filteredAppointment.map(eachAppointment => (
              <AppointmentItem
                eachAppointment={eachAppointment}
                key={eachAppointment.id}
                toggleIsLiked={this.toggleIsLiked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
