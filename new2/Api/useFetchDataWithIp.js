
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import ips from '../Api/ips.json'


const checkIpWithTimeout = (ip) => {
  return Promise.race([
    fetch(`${ip}/data`).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      return response.json()
    }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 1000)
    ),
  ])
}

const useFetchDataWithIp = () => {
  const [serverIp, setServerIp] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  const fetchServerIp = async () => {
    try {
      const ipsData = ips.ips // Accessing the imported JSON data
      return ipsData
    } catch (error) {
      setFetchError('Failed to fetch IP list')
      throw error
    }
  }

  const checkWorkingIp = async (ips) => {
    const ipFetchPromises = ips.map((ip) =>
      checkIpWithTimeout(ip).catch(() => null)
    )

    const results = await Promise.all(ipFetchPromises)
    const workingData = results.find((data) => data !== null)
    if (workingData) {
      const workingIp = ips[results.indexOf(workingData)]
      setServerIp(workingIp)
      setData(workingData)
    } else {
      setFetchError('No working IP found to fetch data.')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchServerIp()
      .then((ips) => checkWorkingIp(ips))
      .catch((_error) => setLoading(false))
  }, [])

  return { serverIp, data, loading, fetchError }
}

export default useFetchDataWithIp
