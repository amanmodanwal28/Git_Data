/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import MarqueeWithBack from '../Component/MarqueeWithBack';
import Banner from '../Component/Banner';
import Footer from '../Component/Footer';
import useFetchDataWithIp from '../Api/useFetchDataWithIp';
import '../Css/Videos.css';

const Videos = () => {
  const [fileList, setFileList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [advertisementTimes, setAdvertisementTimes] = useState([]);
  const [advertisementData, setAdvertisementData] = useState([]);
  const videoRef = useRef(null);
  const { serverIp } = useFetchDataWithIp();


  useEffect(() => {
    if (serverIp) {
      Promise.all([
        fetch(`${serverIp}/videos`),
        fetch(`${serverIp}/advertisment`),
        fetch(`${serverIp}/database/videoAdvertismentTime.txt`),
      ])
      .then(([moviesResponse, advertResponse, advertTimeResponse]) => {
        return Promise.all([
          moviesResponse.json(),
          advertResponse.json(),
          advertTimeResponse.json(),
        ]);
      })
      .then(([moviesData, advertData, advertTime]) => {
        setFileList(moviesData);
        setAdvertisementData(advertData);
        setAdvertisementTimes(advertTime); // Convert to seconds
      })
      .catch((error) => console.error('Error fetching files:', error));
    }
  }, [serverIp]);

  useEffect(() => {
    if (fileList.length > 0 && !selectedCategory) {
      const firstCategory = fileList.find((file) => file.type === 'directory');
      if (firstCategory) {
        setSelectedCategory(firstCategory.name);
      }
    }
  }, [fileList, selectedCategory]);

  const categories = fileList.filter((file) => file.type === 'directory').slice(0, 4);

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const renderCategory = (category) => (
    <div
      key={category.name}
      className="category-box"
      onClick={() => setSelectedCategory(category.name)}
    >
      <strong>{capitalizeFirstLetter(category.name)}</strong>
    </div>
  );
  

  const renderPosters = (category) => {
    const videos = fileList.find((file) => file.name === category)?.children || [];
    return videos.map((video, index) => {
      const videoName = video.name;
      const jpgPosterPath = `${serverIp}/videos/${category}/${videoName.replace('.mp4', '.jpg')}`;
      const pngPosterPath = `${serverIp}/videos/${category}/${videoName.replace('.mp4', '.png')}`;
      const defaultImage = `${serverIp}/default_img/folder_img.png`;
      return (
        <div
          key={videoName || `${category}-${index}`}
          className="poster"
          onClick={() => handleVideoClick(videoName, index)}
        >
          <img
            src={jpgPosterPath}
            alt={videoName}
            className="poster-image"
            loading="lazy"
            onError={(e) => {
              // Fallback to .png if .jpg fails
              e.target.onerror = () => {
                // Fallback to .jpeg if both .jpg and .png fail
                e.target.src = defaultImage;
              };
              e.target.src = pngPosterPath;
            }}
          />
          <div className="video-name">{capitalizeFirstLetter(videoName).replace('.mp4', '')}</div>
        </div>
      );
    });
  };


  const handleVideoClick = (videoName, index) => {
    setCurrentVideo(videoName);
  };


  useEffect(() => {
    if (currentVideo && videoRef.current) {
      const videoUrl = `${serverIp}/videos/${selectedCategory}/${currentVideo}`;
      videoRef.current.src = videoUrl; // Set the video source directly to the URL
      videoRef.current.addEventListener('ended', handleNextVideo);


      return () => {
      };
    }
  }, [currentVideo, serverIp, selectedCategory]);

  const handleNextVideo = () => {
    const videos = fileList.find((file) => file.name === selectedCategory)?.children || [];
    if (currentVideoIndex >= videos.length - 1) {
      handleVideoClick(videos[0].name, 0);
    } else {
      handleVideoClick(videos[currentVideoIndex + 1].name, currentVideoIndex + 1);
    }
  };



  return (
    <>
      <MarqueeWithBack />
      <Banner />
      <div className="video-container">
        <div className="categories-heading">
          <h2>Video Categories:</h2>
        </div>
        <div
          className="category-container"
          onContextMenu={(e) => e.preventDefault()}
        >
          {categories.map(renderCategory)}
        </div>

        {selectedCategory && (
          <>
            <div className="type-heading">
              <h2>Videos in {capitalizeFirstLetter(selectedCategory)}:</h2>
            </div>
            <div
              className="poster-container"
              onContextMenu={(e) => e.preventDefault()}
            >
              {renderPosters(selectedCategory)}
            </div>
            {currentVideo && (
              <div className="current-video">
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  controlsList="nodownload"
                  disablePictureInPicture
                  width="600"
                  preload="metadata" 
                  onContextMenu={(e) => e.preventDefault()}
                >
                  Your browser does not support the video tag.
                </video>
                <div className="current-videoName">
                  <strong>Now Playing:</strong>{' '}
                  {currentVideo.replace('.mp4', '')}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  )
};

export default Videos;