import { useState, useEffect } from 'react'
import MarqueeWithBack from '../Component/MarqueeWithBack'
import { useNavigate } from 'react-router-dom';
import useFetchDataWithIp from '../Api/useFetchDataWithIp'
import Banner from '../Component/Banner'
import Footer from '../Component/Footer'
import '../Css/AttendentLoginData.css'

const AttendentLoginData = () => {
  const [status, setStatus] = useState('both')
  const [selectedDate, setSelectedDate] = useState('all Dates') // New state for date filter
  const [existingRequests, setExistingRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [popupMessage, setPopupMessage] = useState('')
  const [popupType, setPopupType] = useState('') // 'success' or 'error'
  const [showPopup, setShowPopup] = useState(false) // Control visibility
  const { serverIp, data, loading, fetchError } = useFetchDataWithIp()
  const navigate = useNavigate();

  // Polling interval in milliseconds
  const POLLING_INTERVAL = 1000
    // Pagination states

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;



  // Function to format the date as DD-MM-YYYY
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JS
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

// Function to format time in 24-hour format (HH:MM:SS)
function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}


  const generateLast7Days = () => {
    const days = [];
    days.push('All Dates');
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate =  formatDate(date)
      days.push(formattedDate);
    }
    return days;
  }
  

  const last7Days = generateLast7Days()

  // Handle updates when data is fetched
  useEffect(() => {
    if (data) {
      setExistingRequests(data) // Set existing requests when data is fetched
      setFilteredRequests(data) // Initially, show all data in filteredRequests
    }
  }, [data])

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value
    setStatus(selectedStatus)
    // Apply filtering based on status and date
    filterRequests(selectedStatus, selectedDate)
  }

  const handleDateChange = (e) => {
    const selectedDate = e.target.value
    setSelectedDate(selectedDate)
    // Apply filtering based on status and date
    filterRequests(status, selectedDate)
  }

  const filterRequests = (status, date) => {
    let filtered = existingRequests

    if (status === 'open') {
      filtered = filtered.filter((req) => req.status.trim().toLowerCase() === 'open')
    } else if (status === 'close') {
      filtered = filtered.filter((req) => req.status.trim().toLowerCase() === 'close')
    }

    // Filter by date
    if (date !== 'All Dates') {
      filtered = filtered.filter((req) => req.date === date)
      console.log(filtered)
      console.log(date)
    }

    setFilteredRequests(filtered)
  }

  const handleActionTakenChange = (index, newAction) => {
    const updatedRequests = [...filteredRequests]
    updatedRequests[index].actionTaken = newAction
    setFilteredRequests(updatedRequests)
  }

  // Handle status change and update data on the server
  const handleStatusChange = (index, newStatus) => {
    const requestToUpdate = existingRequests[index]

    // Update the request's properties
    const updatedRequest = {
      ...requestToUpdate,
      status: newStatus,
      date: formatDate(new Date()), // Custom formatted current date
      time: formatTime(new Date()), // Custom formatted current time in 24-hour format
      actionTaken: requestToUpdate.actionTaken || '', // Ensure actionTaken is included
    }

    // Update existingRequests directly to show changes in the UI immediately
    const updatedRequests = [...existingRequests]
    updatedRequests[index] = updatedRequest

    setFilteredRequests(updatedRequests)
    setExistingRequests(updatedRequests) // Update the existing requests to show in table immediately

    // Update data on the server
    fetch(`${serverIp}/data/${requestToUpdate.pnr}/${index}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRequest),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update data')
        }
        return response.json()
      })
      .then(() => {
        setPopupMessage('Status updated successfully!')
        setPopupType('success')
        setShowPopup(true)
      })
      .catch((error) => {
        console.error('Update error:', error)
        // Revert changes if there's an error
        setFilteredRequests(existingRequests)
        setPopupMessage('Failed to update status, please try again.')
        setPopupType('error')
        setShowPopup(true)
      })
  }



  const closePopup = () => {
    setShowPopup(false)
    setPopupMessage('')
    setPopupType('')
  }

  // Calculate the data to display for the current page
  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  // Pagination control functions
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredRequests.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <>
      <MarqueeWithBack />
      <Banner />
      <h1 className="attendent-title">Service Request Staff</h1>
      <div className="attendent-container">
          {/* Service Status Dropdown */}
          <div className="attendent-dropdown">
            <label className="attendent-dropdown-label" htmlFor="statusFilter">
              Service Status Sort:
            </label>
            <select
              id="statusFilter"
              value={status}
              onChange={handleFilterChange}
            >
              <option value="both">Both</option>
              <option value="open">Open</option>
              <option value="close">Close</option>
            </select>
          </div>

          {/* Date Filter Dropdown */}
          <div className="attendent-dropdown">
            <label className="attendent-dropdown-label" htmlFor="dateFilter">
              Date Filter:
            </label>
            <select
              id="dateFilter"
              value={selectedDate}
              onChange={handleDateChange}
            >
              {last7Days.map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

      </div>
      {loading && <p>Loading...</p>}
      {fetchError && <p className="error">{fetchError}</p>}

      <div className="attendent-table-container">
        <table className="attendent-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>PNR</th>
              <th>Passenger Name</th>
              <th>Contact Number</th>
              <th>Seat Number</th>
              <th>Service Type</th>
              <th>Complaint</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action Taken</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.length > 0 ? (
              currentRequests.map((request, index) => (
                <tr key={index}>
                  <td>{index + 1 + indexOfFirstRequest}</td>
                  <td>{request.pnr || 'N/A'}</td>
                  <td>{request.passengerName || 'N/A'}</td>
                  <td>{request.contactNumber || 'N/A'}</td>
                  <td>{request.seatNumber || 'N/A'}</td>
                  <td>{request.serviceType || 'N/A'}</td>
                  <td>{request.complaint || 'N/A'}</td>
                  <td>{request.date || 'N/A'}</td>
                  <td>{request.time || 'N/A'}</td>

                  <td>
                    {request.status.trim().toLowerCase() === 'open' ? (
                      <input
                        type="text"
                        onChange={(e) =>
                          handleActionTakenChange(index, e.target.value)
                        }
                        placeholder="Write your action here"
                      />
                    ) : (
                      request.actionTaken
                    )}
                  </td>

                  <td>
                    {request.status.trim().toLowerCase() === 'open' ? (
                      <select
                        value={request.status}
                        onChange={(e) =>
                          handleStatusChange(index, e.target.value)
                        }
                      >
                        <option value="open">Open</option>
                        <option value="close">Close</option>
                      </select>
                    ) : (
                      request.status
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No requests found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredRequests.length / itemsPerPage)}
        </span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredRequests.length / itemsPerPage)}>
          Next
        </button>
      </div>


      {/* Popup Notification */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className={`popup-notification ${popupType}`}>
            <p>{popupMessage}</p>
            <button onClick={closePopup}>OK</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default AttendentLoginData
