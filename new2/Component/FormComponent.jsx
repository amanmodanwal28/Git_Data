
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/FormComponent.css';
import useFetchDataWithIp from '../Api/useFetchDataWithIp'
const FormComponent = () => {
  const navigate = useNavigate()
  const [pnr, setPnr] = useState('')
  const [passengerName, setPassengerName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [seatNumber, setSeatNumber] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [complaint, setComplaint] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [pnrError, setPnrError] = useState('')
  const [contactError, setContactError] = useState('')
  const { serverIp, data } = useFetchDataWithIp()

  // Handle updates when data is fetched
  useEffect(() => {
    if (data) {
     // Initially, show all data in filteredRequests
    }
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pnrError || contactError) return

    const newEntry = {
      pnr,
      passengerName,
      contactNumber,
      seatNumber,
      serviceType,
      complaint,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      status: 'open',
      actionTaken: 'No_Action_Taken',
    }

    fetch(`${serverIp}/data/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    })
      .then((response) => {
        return response.json().then((data) => {
          if (!response.ok) {
            throw new Error(data.error || 'Failed to save data.')
          }
          return data
        })
      })
      .then((result) => {
        console.log('Data saved successfully:', result.message)
        setShowPopup(true)
        resetForm()
      })
      .catch((error) => {
        console.log('Error saving data to the API:', error.message)
        setErrorMessage('Data not saved due to some issue.')
        setShowErrorPopup(true)
      })
  }

  const resetForm = () => {
    setPnr('')
    setPassengerName('')
    setContactNumber('')
    setSeatNumber('')
    setServiceType('')
    setComplaint('')
    setPnrError('')
    setContactError('')
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false)
  }

  const handleExistingRequestClick = () => {
    // Redirect to the next page (e.g., "/existing-requests")
    navigate('/existing-requests') // Change this path to your desired route
  }

  const handlePnrChange = (e) => {
    const value = e.target.value
    if (/^\d*$/.test(value) && value.length <= 15) {
      setPnr(value)
      setPnrError('')
    } else if (value.length > 15) {
      setPnrError('Maximum it will be 15 digits')
    } else {
      setPnrError('Must be a number')
    }
  }

  const handleContactChange = (e) => {
    const value = e.target.value
    if (/^\d*$/.test(value) && value.length <= 10) {
      setContactNumber(value)
      setContactError('')
    } else if (value.length > 10) {
      setContactError('Must be exactly 10 digits')
    } else {
      setContactError('Must be a number')
    }
  }

  return (
    <>
      <h1>New Service Request</h1>
      <div className="form-container-Register">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pnr">PNR Number:</label>
            <input
              type="text"
              id="pnr"
              name="pnr"
              value={pnr}
              onChange={handlePnrChange}
              required
            />
            {pnrError && <span className="error-message">{pnrError}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="passengerName">Passenger Name:</label>
            <input
              type="text"
              id="passengerName"
              name="passengerName"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={contactNumber}
              onChange={handleContactChange}
              required
            />
            {contactError && (
              <span className="error-message">{contactError}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="seatNumber">Seat Number:</label>
            <input
              type="text"
              id="seatNumber"
              name="seatNumber"
              value={seatNumber}
              onChange={(e) => setSeatNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="serviceType">Services:</label>
            <select
              id="serviceType"
              name="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
            >
              <option value="">Select Service</option>
              <option value="Emergency">Emergency</option>
              <option value="Security">Security</option>
              <option value="Linen">Linen</option>
              <option value="Veg">Veg</option>
              <option value="Non Veg">Non Veg</option>
              <option value="Special Case">Special Case</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="complaint">Write Your Complaint Here:</label>
            <textarea
              id="complaint"
              name="complaint"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="button-group-Register">
            <button className="button-Register" type="submit">
              Submit
            </button>
            <button
              className="button-Register"
              type="button"
              onClick={handleExistingRequestClick}
            >
              Existing
            </button>
          </div>
        </form>

        {/* Popup for submission success */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>Your form is submitted successfully!</p>
              <button onClick={handleClosePopup}>OK</button>
            </div>
          </div>
        )}

        {/* Popup for error message */}
        {showErrorPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>{errorMessage}</p>
              <button onClick={handleCloseErrorPopup}>OK</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
};

export default FormComponent;