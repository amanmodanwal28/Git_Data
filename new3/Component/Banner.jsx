/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import '../Css/Banner.css' // Adjust the path if needed
import useFetchDataWithIp from '../Api/useFetchDataWithIp'

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mediaUrl, setMediaUrl] = useState('')
  const { serverIp } = useFetchDataWithIp()
  const [fileList, setFileList] = useState([]) // Media file list from API
  const [isVideo, setIsVideo] = useState(false) // To track if the current media is a video

  // Fetch media list from the API
  useEffect(() => {
    if (serverIp) {
      fetch(`${serverIp}/add`) // API endpoint to fetch media files
        .then((response) => response.json())
        .then((mediaData) => {
          setFileList(mediaData) // Assuming the API returns an array of media items
        })
        .catch((error) => console.error('Error fetching media list:', error))
    }
  }, [serverIp])

  // Generate a random index from the file list
  const getRandomIndex = () => {
    return Math.floor(Math.random() * fileList.length)
  }

  // Update media URL based on the current media index
  useEffect(() => {
    const loadMedia = () => {
      if (fileList.length > 0) {
        const currentMedia = fileList[currentIndex] // Get the media object at the current index
        // console.log(currentMedia)
        if (currentMedia && currentMedia.name) {
          const mediaUrl = `${serverIp}/add/${currentMedia.name}` // Construct the media URL
          setMediaUrl(mediaUrl)
          // Check if the current media is a video
          const isVideoMedia =
            currentMedia.name.endsWith('.mp4') ||
            currentMedia.name.endsWith('.webm')
          setIsVideo(isVideoMedia)
        }
      }
    }

    loadMedia()

    let intervalId
    if (!isVideo) {
      // For images, change media after 5 seconds
      intervalId = setInterval(() => {
        setCurrentIndex(getRandomIndex()) // Randomly select next media
      }, 5000)
    }

    return () => clearInterval(intervalId) // Clean up the interval on unmount
  }, [currentIndex, fileList, serverIp, isVideo])

  // Handle the video end event to select the next media randomly
  const handleVideoEnd = () => {
    setCurrentIndex(getRandomIndex()) // Randomly select the next media
  }

  const currentMedia = fileList[currentIndex] || {} // Current media object

  return (
    <div className="banner">
      <div className="media-container">
        {mediaUrl &&
          (currentMedia.name?.endsWith('.mp4') ||
          currentMedia.name?.endsWith('.webm') ? (
            <video
              key={currentMedia.name}
              src={mediaUrl}
              autoPlay
              loop={false} // Video plays once
              muted
              onEnded={handleVideoEnd} // Move to the next media after the video ends
              onContextMenu={(e) => e.preventDefault()}
            />
          ) : (
            <img
              key={currentMedia.name}
              src={mediaUrl}
              alt={currentMedia.name}
              onContextMenu={(e) => e.preventDefault()}
            />
          ))}
      </div>
    </div>
  )
}

export default Banner
