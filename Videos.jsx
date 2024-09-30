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
  const [posterList, setPosterList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  const { serverIp } = useFetchDataWithIp();

  useEffect(() => {
    if (serverIp) {
      Promise.all([
        fetch(`${serverIp}/videos`),
        fetch(`${serverIp}/poster/videos`)
      ])
        .then(([moviesResponse, posterResponse]) => {
          if (!moviesResponse.ok) throw new Error('Network response for movies was not ok');
          if (!posterResponse.ok) throw new Error('Network response for posters was not ok');
          return Promise.all([moviesResponse.json(), posterResponse.json()]);
        })
        .then(([moviesData, postersData]) => {
          setFileList(moviesData);
          setPosterList(postersData);
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

  const renderCategory = (category) => (
    <div
      key={category.name}
      className="category-box"
      onContextMenu={(e) => e.preventDefault()}
      onClick={() => setSelectedCategory(category.name)}
    >
      <strong>{category.name}</strong>
    </div>
  )

const renderPosters = (category) => {
  const videos = fileList.find((file) => file.name === category)?.children || []

  return videos.map((video, index) => (
    <div
      key={video.name || `${category}-${index}`}
      className="poster"
      onContextMenu={(e) => e.preventDefault()}
      onClick={() => handleVideoClick(video.name, index)}
    >
      <img
        src={`src/content/poster/videos/${category}/${video.name.replace(
          '.mp4',
          '.png'
        )}`} // Use .jpg format directly
        alt={video.name}
        className="poster-image"
      />
      <div className="video-name">{video.name.replace('.mp4', '')}</div>{' '}
      {/* Display the video name without the extension */}
    </div>
  ))
}



  const handleVideoClick = (videoName, index) => {
    setCurrentVideo(videoName);
    setCurrentVideoIndex(index);

    if (videoRef.current) {
      videoRef.current.src = `src/content/videos/${selectedCategory}/${videoName}`;
      videoRef.current.play();
    }
  };

  const handleNextVideo = () => {
    const videos = fileList.find((file) => file.name === selectedCategory)?.children || [];
    if (currentVideoIndex >= videos.length - 1) {
      handleVideoClick(videos[0].name, 0);
    } else {
      const nextVideo = videos[currentVideoIndex + 1];
      handleVideoClick(nextVideo.name, currentVideoIndex + 1);
    }
  };

  const handlePreviousVideo = () => {
    const videos = fileList.find((file) => file.name === selectedCategory)?.children || [];
    if (currentVideoIndex <= 0) {
      handleVideoClick(videos[videos.length - 1].name, videos.length - 1);
    } else {
      const prevVideo = videos[currentVideoIndex - 1];
      handleVideoClick(prevVideo.name, currentVideoIndex - 1);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', handleNextVideo);

      const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight' && videoRef.current) {
          videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5);
        } else if (e.key === 'ArrowLeft' && videoRef.current) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
        } else if (e.code === 'Space' && videoRef.current) {
          if (videoRef.current.paused) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        videoRef.current.removeEventListener('ended', handleNextVideo);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentVideoIndex, fileList, selectedCategory]);

  return (
    <>
      <MarqueeWithBack />
      <Banner />
      <div className="video-container">
        <h2>Video Categories:</h2>
        <div className="category-container">
          {categories.map(renderCategory)}
        </div>

        {selectedCategory && (
          <>
            <h2>Videos in {selectedCategory}:</h2>
            <div className="poster-container">
              {renderPosters(selectedCategory)}
            </div>
            {currentVideo && (
              <div className="current-video">
                <strong>Now Playing:</strong> {currentVideo}
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  controlsList="nodownload"
                  disablePictureInPicture
                  width="600"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source
                    src={`src/content/videos/${selectedCategory}/${currentVideo}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
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
