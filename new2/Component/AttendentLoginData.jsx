import { useState, useEffect } from 'react';
import MarqueeWithBack from "../Component/MarqueeWithBack";
import useFetchDataWithIp from '../Api/useFetchDataWithIp'
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
import '../Css/AttendentLoginData.css';

const AttendentLoginData = () => {
    const [status, setStatus] = useState('both');

    const [existingRequests, setExistingRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState(''); // 'success' or 'error'
    const [showPopup, setShowPopup] = useState(false); // Control visibility
    const { serverIp, data, loading, fetchError } = useFetchDataWithIp()


  // Handle updates when data is fetched
  useEffect(() => {
    if (data) {
      setExistingRequests(data) // Set existing requests when data is fetched
      setFilteredRequests(data) // Initially, show all data in filteredRequests
    }
  }, [data])






    const handleFilterChange = (e) => {
        const selectedStatus = e.target.value;
        setStatus(selectedStatus);

        if (selectedStatus === 'open') {
            setFilteredRequests(existingRequests.filter(req => req.status.trim().toLowerCase() === 'open'));
        } else if (selectedStatus === 'close') {
            const closeRequests = existingRequests.filter(req => req.status.trim().toLowerCase() === 'close');
            setFilteredRequests(closeRequests);
        } else {
            setFilteredRequests(existingRequests);
        }
    };


     const handleActionTakenChange = (index, newAction) => {
       const updatedRequests = [...filteredRequests]
       updatedRequests[index].actionTaken = newAction
       setFilteredRequests(updatedRequests)
     }

  // Handle status change and update data on the server
  const handleStatusChange = (index, newStatus) => {
    const updatedRequests = [...filteredRequests]
    const requestToUpdate = updatedRequests[index]

     updatedRequests[index] = {
       ...requestToUpdate,
       status: newStatus,
       date: new Date().toLocaleDateString(), // Current date
       time: new Date().toLocaleTimeString(), // Current time
       actionTaken: requestToUpdate.actionTaken || '', // Ensure actionTaken is included
     }

    setFilteredRequests(updatedRequests)

    // Update data on the server
    fetch(`${serverIp}/data/${requestToUpdate.pnr}/${index}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...updatedRequests[index],
      }),
    })
     .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update data');
                }
                return response.json();
            })
            .then(() => {
                setPopupMessage('Status updated successfully!');
                setPopupType('success');
                setShowPopup(true);
            })
            .catch((error) => {
                console.error('Update error:', error);
                updatedRequests[index].status = requestToUpdate.status; // Revert on error
                setFilteredRequests(updatedRequests);
                setPopupMessage('Failed to update status, please try again.');
                setPopupType('error');
                setShowPopup(true);
            });
    };



    const closePopup = () => {
        setShowPopup(false);
        setPopupMessage('');
        setPopupType('');
    };



    return (
        <>
            <MarqueeWithBack />
            <Banner />
            <h1 className="attendent-title">Service Request Staff</h1>
            <div className="attendent-container">
                <div className="attendent-dropdown">
                    <label className="attendent-dropdown-label" htmlFor="statusFilter">Service Status Sort:</label>
                    <select id="statusFilter" value={status} onChange={handleFilterChange}>
                        <option value="both">Both</option>
                        <option value="open">Open</option>
                        <option value="close">Close</option>
                    </select>
                </div>
            </div>
            {loading && <p>Loading...</p>}
            {fetchError && <p className="error">{fetchError}</p>}

            <div className="attendent-table-container">
                <table className="attendent-table">
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
                            <th>Action Taken</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((request, index) => (
                                <tr key={index}>
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
                                                onChange={(e) => handleActionTakenChange(index, e.target.value)}
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
                                                onChange={(e) => handleStatusChange(index, e.target.value)}
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
                                <td colSpan="10">No requests found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
    );
};

export default AttendentLoginData;
