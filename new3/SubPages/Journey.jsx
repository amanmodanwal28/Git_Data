/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import MarqueeWithBack from '../Component/MarqueeWithBack'
import Banner from '../Component/Banner'
import Footer from '../Component/Footer'
import '../Css/Journey.css'
import useFetchDataWithIp from '../Api/useFetchDataWithIp'

const Journey = () => {
  const [journeyData, setJourneyData] = useState(null)
  const { serverIp } = useFetchDataWithIp() // Get server IP from the custom hook

  const fetchXMLData = async () => {
    if (!serverIp) {
      console.error('Server IP is not defined')
      return // Exit if serverIp is not available
    }

    try {
      // Use the API to fetch XML data
      const response = await fetch(`${serverIp}/database/papis_info.xml`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`) // Check if response is OK
      }
      const text = await response.text()

      // Parse XML using DOMParser
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(text, 'application/xml')

      // Helper function to get element text content with default value
      const getElementText = (tagName, defaultValue = 'N/A') => {
        const element = xmlDoc.getElementsByTagName(tagName)[0]
        return element ? element.textContent : defaultValue
      }

      // Extract data from the XML document
      const speed = getElementText('SPEED')
      const adtns = getElementText('ADTNS')
      const lrs = getElementText('LRS')
      const ss = getElementText('SS')
      const cs = getElementText('CS')
      const ns = getElementText('NS')
      const ds = getElementText('DS')

      // Create new data object
      const newData = {
        speed,
        adtns,
        lrs,
        ss,
        cs,
        ns,
        ds,
      }

      // Update state only if there's a change
      if (JSON.stringify(journeyData) !== JSON.stringify(newData)) {
        setJourneyData(newData)
      }
    } catch (error) {
      console.error('Error fetching XML:', error)
    }
  }

  useEffect(() => {
    if (serverIp) {
      fetchXMLData() // Fetch data initially if serverIp is available

      // Set up polling
      const intervalId = setInterval(fetchXMLData, 1000) // Poll every 10 seconds

      // Clean up on unmount
      return () => clearInterval(intervalId)
    }
  }, [serverIp, journeyData]) // Add serverIp to dependency array

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <MarqueeWithBack />
      <Banner />
      <div className="journey-info">
        {journeyData ? (
          <div className="journey-details">
            <h2 className="heading">Journey Information</h2>

            <table className="journey-table">
              <tbody>
                <tr>
                  <th>Source Station</th>
                  <td>{journeyData.ss}</td>
                </tr>
                <tr>
                  <th>Current Station</th>
                  <td>{journeyData.cs}</td>
                </tr>
                <tr>
                  <th>Next Station</th>
                  <td>{journeyData.ns}</td>
                </tr>
                <tr>
                  <th>Destination</th>
                  <td>{journeyData.ds}</td>
                </tr>
                <tr>
                  <th>Speed</th>
                  <td>{journeyData.speed} kmph</td>
                </tr>
                <tr>
                  <th>Approx Distance to Next Station</th>
                  <td>{journeyData.adtns} kms</td>
                </tr>
                <tr>
                  <th>Late Running Status</th>
                  <td>{journeyData.lrs}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading journey information...</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Journey
