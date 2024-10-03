import { useState, useEffect } from 'react'
import MarqueeWithBack from "../Component/MarqueeWithBack";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
import '../Css/ExistingRequestForm.css';
import useFetchDataWithIp from '../Api/useFetchDataWithIp'


const ExistingRequestForm = () => {
  const [pnr, setPnr] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [existingRequests, setExistingRequests] = useState([])
  const { serverIp, data } = useFetchDataWithIp()

  // Handle updates when data is fetched
  useEffect(() => {
    if (data) {
      //setExistingRequests(data) // Set existing requests when data is fetched
         }
  }, [data])

  const handleCheckStatus = () => {
    if (!pnr) {
      setFetchError('PNR number is required.')
      return
    }
    if (pnr.length > 15) {
      setFetchError('PNR number must be at most 15 digits.')
      return
    }

    console.log('Checking status for PNR:', pnr)
    setLoading(true)
    setFetchError('')
    setExistingRequests([])

    fetch(`${serverIp}/data/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        return response.json()
      })
      .then((data) => {
        const requests = data.filter((entry) => entry.pnr === pnr)
        if (requests.length > 0) {
          setExistingRequests(requests)
        } else {
          setFetchError('No requests found for this PNR')
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error)
        setFetchError(error.message)
        setExistingRequests([])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <MarqueeWithBack />
      <Banner />
      <div className="form-container">
        {' '}
        {/* Container for the form */}
        <h3 className="form-heading">Existing Service Request</h3>
        <div className="form-group">
          <label htmlFor="existingPnr">PNR Number:</label>
          <input
            type="text"
            id="existingPnr"
            name="existingPnr"
            value={pnr}
            onChange={(e) => {
              // Limit input to 15 digits
              if (
                e.target.value.length <= 15 &&
                /^[0-9]*$/.test(e.target.value)
              ) {
                setPnr(e.target.value)
              }
            }}
            required
          />
        </div>
        <div className="button-group-Exist-request">
          <button className="button-Exist-request" onClick={handleCheckStatus}>
            Check Status
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {fetchError && (
          <div className="error-message">
            <p>Something went wrong</p>
          </div>
        )}
      </div>

      {/* Display existing requests if available */}
      {existingRequests.length > 0 && (
        <div className="existing-request-details-container">
          <div className="table-heading">
            <h4>Existing Request Details</h4>
          </div>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>PNR</th>
                  <th>Passenger Name</th>
                  <th>Contact Number</th>
                  <th>Seat Number</th>
                  <th>Service Type</th>
                  <th>Complaint</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action Taken</th>
                </tr>
              </thead>
              <tbody>
                {existingRequests.map((request, index) => (
                  <tr key={index}>
                    <td>{request.pnr || 'N/A'}</td>
                    <td>{request.passengerName || 'N/A'}</td>
                    <td>{request.contactNumber || 'N/A'}</td>
                    <td>{request.seatNumber || 'N/A'}</td>
                    <td>{request.serviceType || 'N/A'}</td>
                    <td>{request.complaint || 'N/A'}</td>
                    <td>{request.date || 'N/A'}</td>
                    <td>{request.time || 'N/A'}</td>
                    <td>{request.status || 'N/A'}</td>
                    <td>{request.actionTaken || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
};

export default ExistingRequestForm;