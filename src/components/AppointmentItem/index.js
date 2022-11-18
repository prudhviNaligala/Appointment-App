// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {eachAppointment} = props
  const {id, title, date, isLiked} = eachAppointment
  const imgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const clickMe = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  return (
    <li className="list-container">
      <div className="border-container">
        <div className="title-star">
          <p>{title}</p>
          <button
            type="button"
            // eslint-disable-next-line react/no-unknown-property
            testid="star"
            className="star-button"
            onClick={clickMe}
          >
            <img src={imgUrl} alt="star" className="star" />
          </button>
        </div>
        <p>Date :{date}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
