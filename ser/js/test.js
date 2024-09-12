document.addEventListener('DOMContentLoaded', function () {
  const audioPlayer = document.getElementById('audioPlayer')
  const playlistItems = document.getElementById('playlistItems')
  const folderSelect = document.getElementById('folderSelect')

  let audioCtx
  let source
  let analyser
  let playlist = []
  let currentTrackIndex = 0
  let currentFolder = 'hindi' // Default folder set to "hindi"
  let startX = 0
  let scrollLeft = 0
  let isDown = false

  function fetchAudioFiles (folder) {
    return fetch(`get_audio_files.php?folder=${folder}`).then(response =>
      response.json()
    )
    updateActivePlaylistItem()

  }

  function buildPlaylist () {
    playlistItems.innerHTML = '' // Clear previous items
    playlist.forEach((track, index) => {
      const songContainer = document.createElement('div')
      songContainer.classList.add('playlist-item')

      const indexElement = document.createElement('p')
      indexElement.classList.add('index')
      indexElement.textContent = index + 1 // Start index from 1
      songContainer.appendChild(indexElement)

      const songInfo = document.createElement('div')
      songInfo.classList.add('song-info')

      const songTitle = document.createElement('p')
      songTitle.textContent = track
      songInfo.appendChild(songTitle)

      // Create canvas for waveform visualization
      const waveformCanvas = document.createElement('canvas')
      waveformCanvas.width = 80
      waveformCanvas.height = 60
      waveformCanvas.classList.add('waveform')
      waveformCanvas.setAttribute('data-index', index)
      songContainer.appendChild(waveformCanvas)

      songContainer.appendChild(songInfo)

      playlistItems.appendChild(songContainer)

      songContainer.addEventListener('click', () =>
        playAudio(index, currentFolder, waveformCanvas)
      )
    })
  }

  function updateActivePlaylistItem () {
    const playlistItems = document.querySelectorAll('.playlist-item')

    playlistItems.forEach((item, index) => {
      if (index === currentTrackIndex && playlist[currentTrackIndex] === document.getElementById('songtitle').innerHTML) {
        item.classList.add('active')
        // Show waveform canvas for the active track
        const waveformCanvas = item.querySelector('.waveform')
        if (waveformCanvas) {
          waveformCanvas.style.display = 'block'
        }
      } else {
        item.classList.remove('active')
        // Hide waveform canvas for non-active tracks
        const waveformCanvas = item.querySelector('.waveform')
        if (waveformCanvas) {
          waveformCanvas.style.display = 'none'
        }
      }
    })
  }
  

  function playAudio (trackIndex, folder, waveformCanvas) {
    if (trackIndex >= 0 && trackIndex < playlist.length) {
      const audioFilePath = `content/music/${folder}/${playlist[trackIndex]}`
      audioPlayer.src = audioFilePath
      document.getElementById('songtitle').innerHTML = playlist[trackIndex]
      audioPlayer.play()

      currentTrackIndex = trackIndex
      updateActivePlaylistItem()

      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        analyser = audioCtx.createAnalyser()
        analyser.connect(audioCtx.destination)
      }

      if (!source) {
        source = audioCtx.createMediaElementSource(audioPlayer)
        source.connect(analyser)
      } else {
        // Update the HTMLMediaElement the existing MediaElementSourceNode is connected to
        // source.mediaElement = audioPlayer;
      }

      visualize(waveformCanvas)
    }
  }

  function visualize (canvas) {
    const ctx = canvas.getContext('2d')
    const WIDTH = 90
    const HEIGHT = 40
    const PILLAR_WIDTH = 5
    const SPACING = 5
    const NUM_PILLARS = Math.floor(WIDTH / (PILLAR_WIDTH + SPACING))

    function draw () {
      requestAnimationFrame(draw)

      ctx.clearRect(0, 0, WIDTH, HEIGHT)

      const dataArray = new Uint8Array(analyser.fftSize)
      analyser.getByteFrequencyData(dataArray)

      const step = Math.floor(dataArray.length / NUM_PILLARS)

      for (let i = 0; i < 5; i++) {
        const value = dataArray[i * step]
        const height = (value / 255) * HEIGHT

        const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT)
        gradient.addColorStop(0, 'blue') // Start color
        gradient.addColorStop(1, 'red') // End color

        ctx.fillStyle = gradient

        ctx.fillRect(
          i * (PILLAR_WIDTH + SPACING),
          HEIGHT - height,
          PILLAR_WIDTH,
          height
        )
      }
    }

    draw()
  }

  function playNext () {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length
    playAudio(currentTrackIndex, currentFolder)
  }

  folderSelect.addEventListener('click', function (event) {
    const selectedFolder = event.target
      .closest('.music_box')
      .getAttribute('data-folder')
    if (selectedFolder !== currentFolder) {
      currentFolder = selectedFolder
      fetchAudioFiles(selectedFolder)
        .then(data => {
          playlist = data
          buildPlaylist()
          
        })
        .catch(error => console.error('Error fetching audio files:', error))

      // Remove active class from all folders
      document.querySelectorAll('.music_box').forEach(music_box => {
        music_box.classList.remove('active')
      })

      // Add active class to the clicked folder
      event.target.closest('.music_box').classList.add('active')
       // Update active playlist item based on current track index
        updateActivePlaylistItem();
    }
  })

  fetchAudioFiles(currentFolder)
    .then(data => {
      playlist = data
      buildPlaylist()
      
    })
    .catch(error => console.error('Error fetching audio files:', error))

  audioPlayer.addEventListener('ended', function () {
    playNext()
  })

  //    this is use to   drag the folder //
  folderSelect.addEventListener('mousedown', e => {
    isDown = true
    startX = e.pageX - folderSelect.offsetLeft
    scrollLeft = folderSelect.scrollLeft
  })

  folderSelect.addEventListener('mouseleave', () => {
    isDown = false
  })

  folderSelect.addEventListener('mouseup', () => {
    isDown = false
  })

  folderSelect.addEventListener('mousemove', e => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - folderSelect.offsetLeft
    const walk = (x - startX) * 3 // Adjust scrolling speed here
    folderSelect.scrollLeft = scrollLeft - walk
  })
})


