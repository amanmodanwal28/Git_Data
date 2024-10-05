/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import MarqueeWithBack from "../Component/MarqueeWithBack";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
import useFetchDataWithIp from '../Api/useFetchDataWithIp';
import '../Css/Music.css';

const Music = () => {
  const [fileList, setFileList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);
  const { serverIp } = useFetchDataWithIp();

  useEffect(() => {
    if (serverIp) {
      fetch(`${serverIp}/music`)
        .then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(data => setFileList(data))
        .catch(error => console.error('Error fetching files:', error));
    }
  }, [serverIp]);

  useEffect(() => {
    if (fileList.length > 0 && !selectedCategory) {
      const firstCategory = fileList.find(file => file.type === 'directory');
      if (firstCategory) setSelectedCategory(firstCategory.name);
    }
  }, [fileList, selectedCategory]);

  const categories = fileList.filter(file => file.type === 'directory').slice(0, 4);

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
  

  const renderSongs = (category) => {
    const songs = fileList.find(file => file.name === category)?.children || [];
    return songs.map((song, index) => {
      const isPlaying = currentSong === song.name;
      return (
        <li
          key={song.name || `${category}-${index}`}
          className={isPlaying ? 'highlight' : ''}
          style={isPlaying ? { backgroundColor: '#f0f8ff', fontWeight: 'bold' } : {}}
          onClick={() => handleSongClick(song.name, index)} // Move click handler here
        >
          <span>
            {index + 1}. {capitalizeFirstLetter(song.name)}
          </span>
        </li>
      );
    });
  };


  const handleSongClick = (songName, index) => {
    if (currentSong === songName) return;

    setCurrentSong(songName);
    setCurrentSongIndex(index);

    if (audioRef.current) {
      audioRef.current.pause(); // Pause if playing
      audioRef.current.src = `${serverIp}/music/${selectedCategory}/${songName}`;
      audioRef.current.load();
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };

  const handleNextSong = () => {
    const songs = fileList.find(file => file.name === selectedCategory)?.children || [];
    const nextIndex = (currentSongIndex + 1) % songs.length;
    handleSongClick(songs[nextIndex].name, nextIndex);
  };

  const handlePreviousSong = () => {
    const songs = fileList.find(file => file.name === selectedCategory)?.children || [];
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    handleSongClick(songs[prevIndex].name, prevIndex);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleNextSong);
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight') audioRef.current.currentTime += 5;
        if (e.key === 'ArrowLeft') audioRef.current.currentTime -= 5;
        if (e.code === 'Space') audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        // window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentSongIndex, fileList, selectedCategory]);

  return (
    <>
      <MarqueeWithBack />
      <Banner />
      <div
        className="music-container"
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
      >
        <div style={{ flex: '1', padding: '10px', overflow: 'hidden' }}>
          <h2>Music Categories:</h2>
          <div className="category-container">
            {categories.map(renderCategory)}
          </div>
          {selectedCategory && (
            <>
              <h2>Songs in {capitalizeFirstLetter(selectedCategory)}:</h2>
              <ul
                className="file-list"
                style={{
                  padding: '0',
                  listStyle: 'none',
                  margin: '0',
                  height: 'calc(100% - 180px)',
                  overflowY: 'scroll',
                }}
                onContextMenu={(e) => e.preventDefault()}
              >
                {renderSongs(selectedCategory)}
              </ul>
            </>
          )}
        </div>
        <div
          className="audio-controls"
          style={{
            backgroundColor: 'teal',
            padding: '8px',
            textAlign: 'center',
            borderTop: '1px solid #ddd',
            marginTop: '10px',
          }}
        >
          <span
            style={{ display: 'block', marginBottom: '1px', color: 'white' }}
          >
            {currentSong
              ? `Now Playing: ${currentSong}`
              : 'Select a song to play'}
          </span>
          <audio
            ref={audioRef}
            controls
            style={{ width: '80%', marginTop: '5px' }}
            controlsList="nodownload"
            preload="none"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>

      <Footer />
    </>
  )
};

export default Music;
