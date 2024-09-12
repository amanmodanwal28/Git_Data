var modal = document.getElementById('myModal')
var triggerVideo = document.getElementById('video-player')
var video_ad = document.getElementById('video_ad')
var seekbar_ad = document.getElementById('seekbar_ad')
var seekbar_ad2_img = document.getElementById('seekbar_ad2_img')
var image_ad = document.getElementById('image_ad')
var seeking = false
var userTimeInSecond = 5
    //var userTimeInMinute = 0.1
var adInterval = userTimeInMinute * 60
var adTimes = []
var playedAds = [] // Array to track which ads have been played
video_ad.disablePictureInPicture = true

// console.log(adInterval)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Example handling
if (userTimeInMinute === 'The file is blank.') {
    userTimeInMinute = 0.1
    adInterval = userTimeInMinute * 60
    console.log('No data found.', userTimeInMinute)
    console.log('adInterval  is 1 :', adInterval, 'seconds')
} else if (
    userTimeInMinute === 'Error reading the file.' ||
    userTimeInMinute === 'File not found.'
) {
    userTimeInMinute = 0.1
    adInterval = userTimeInMinute * 60
    console.log('adInterval  is 2:', adInterval, 'seconds')
} else if (userTimeInMinute == 0) {
    userTimeInMinute = 0.1
    adInterval = userTimeInMinute * 60
    console.log('userTimeInMinute was 0. Using default values.')
    console.log('adInterval is 3:', adInterval, 'seconds')
} else {
    // Process the actual file content if it's a valid number
    adInterval = userTimeInMinute * 60
    console.log('Processing actual file content.')
    console.log('adInterval is 4:', adInterval, 'seconds')
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define a function to check if a given file is a video
function isVideo(file) {
    var videoExtensions = ['mp4', 'webm', 'ogg']
    var extension = file.split('.').pop().toLowerCase()
    return videoExtensions.includes(extension)
}

// Calculate timestamps for ads at intervals of adInterval seconds
triggerVideo.addEventListener('loadedmetadata', function() {
    var duration = triggerVideo.duration
    for (var i = adInterval; i < duration; i += adInterval) {
        adTimes.push(i)
    }
    advertisementFiles

    // Listen for triggerVideo timeupdate event
    triggerVideo.addEventListener('timeupdate', function() {
        var progress = Math.floor(triggerVideo.currentTime)
        if (
            adTimes.includes(progress) &&
            !playedAds.includes(progress) &&
            !seeking
        ) {
            modal.style.display = 'block'
                // Randomly select an advertisement if available
            var advertisementCount = Object.keys(advertisementFiles).length
            console.log(advertisementCount)
            if (advertisementCount > 0) {
                var randomAdIndex = Math.floor(Math.random() * advertisementCount)
                var advertisementVideoInArray = Object.values(advertisementFiles)
                var randomAdPath =
                    directory + '/' + advertisementVideoInArray[randomAdIndex]
                console.log('Random Advertisement index: ' + randomAdIndex)

                console.log('randomAdPath  ', randomAdPath)
                if (isVideo(randomAdPath)) {
                    // If the randomly selected ad is a video
                    video_ad.src = randomAdPath
                    video_ad.style.display = 'block'
                    triggerVideo.style.visibility = 'hidden' // Hide triggerVideo
                    video_ad.play()
                    image_ad.style.display = 'none'
                    seekbar_ad.style.display = 'block'
                    seekbar_ad2_img.style.display = 'none'
                } else {
                    // If the randomly selected ad is an image
                    image_ad.src = randomAdPath
                    image_ad.style.display = 'block'
                    triggerVideo.style.visibility = 'hidden' // Hide triggerVideo
                    video_ad.style.display = 'none'
                    seekbar_ad.style.display = 'none'
                    seekbar_ad2_img.style.display = 'block'
                    triggerVideo.pause() // Pause the main video
                    playedAds.push(progress) // Add the time point to the array of played ads
                    closeFullscreen(triggerVideo)
                    closePictureInPicture(triggerVideo)

                    var displayTime = 15000 // 5 seconds
                    var elapsed = 0
                    var interval = 100 // Update interval in milliseconds

                    var imageAdInterval = setInterval(function() {
                        elapsed += interval
                        seekbar_ad2_img.value = Math.floor((elapsed / displayTime) * 100)
                            //console.log(seekbar_ad2_img.value)
                            // console.log(elapsed)

                        if (elapsed >= displayTime) {
                            clearInterval(imageAdInterval)
                            console.log('clear')
                            image_ad.style.display = 'none'
                            seekbar_ad2_img.style.display = 'none'
                            video_ad.style.display = 'none'
                            triggerVideo.play()
                            modal.style.display = 'none'
                        }
                    }, interval)
                }
                triggerVideo.pause() // Pause the main video
                playedAds.push(progress) // Add the time point to the array of played ads
            } else {
                console.log('No advertisement videos available.')
            }
        }
    })
})

// Listen for triggerVideo play event
triggerVideo.addEventListener('play', function() {
    modal.style.display = 'none'
    triggerVideo.style.visibility = 'visible' // Show triggerVideo
})

function closeFullscreen() {
    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    ) {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen()
        }
    }
}

function closePictureInPicture() {
    if (
        document.pictureInPictureElement ||
        document.webkitPictureInPictureElement ||
        document.msPictureInPictureElement
    ) {
        if (document.exitPictureInPicture) {
            document.exitPictureInPicture()
        } else if (document.webkitExitPictureInPicture) {
            /* Safari */
            document.webkitExitPictureInPicture()
        } else if (document.msExitPictureInPicture) {
            /* IE11 */
            document.msExitPictureInPicture()
        }
    }
}

// Listen for triggerVideo seeking event
triggerVideo.addEventListener('seeking', function() {
    seeking = true
})

// Listen for triggerVideo seeked event
triggerVideo.addEventListener('seeked', function() {
    seeking = false
})

// Listen for video_ad timeupdate event
video_ad.addEventListener('timeupdate', function() {
    var duration = Math.floor(video_ad.duration)
        // console.log(duration)
        // console.log("va",Math.floor(video_ad.currentTime))
    if (isFinite(duration)) {
        var value = (100 / duration) * video_ad.currentTime
        seekbar_ad.value = Math.floor(value)
    } else {
        // Handle non-finite duration (e.g., set seekbar value to 0)
        seekbar_ad.value = 0
    }
})

// Listen for video_ad ended event
video_ad.addEventListener('ended', function() {
    triggerVideo.play()
})

// document.body.addEventListener('contextmenu', function(event) {
//     event.preventDefault()
// })

// // JavaScript for Advertisement Modal and Video
// var modal = document.getElementById('myModal')
// var triggerVideo = document.getElementById('video-player')
// var video_ad = document.getElementById('video_ad')
// var seeking = false

// var adTimes = []
// var playedAds = [] // Array to track which ads have been played
// video_ad.disablePictureInPicture = true
// //triggerVideo.disablePictureInPicture = true;

// // Calculate timestamps for ads at intervals of adInterval seconds
// triggerVideo.addEventListener('loadedmetadata', function () {
//   var duration = triggerVideo.duration
//   var adTimes = []
//   var userTimeInMinute = .3
//   var adInterval = userTimeInMinute * 60
//   for (var i = adInterval; i < duration; i += adInterval) {
//     adTimes.push(i)
//   }

//   // Listen for triggerVideo timeupdate event
//   triggerVideo.addEventListener('timeupdate', function () {
//     var progress = Math.floor(triggerVideo.currentTime)
//     if (adTimes.includes(progress) && !playedAds.includes(progress) && !seeking) {
//       modal.style.display = 'block'
//       triggerVideo.style.visibility = 'hidden' // Hide triggerVideo
//       // Randomly select an advertisement if available
//         var advertisementCount = Object.keys(advertisementVideos).length
//         console.log(advertisementCount)
//         console.log(Object.values(advertisementVideos)) // they show currect sequence of video
//       if (advertisementCount >= 0) {
//           var randomAdIndex = Math.floor(Math.random() * advertisementCount)
//           var advertisementVideoInArray = Object.values(advertisementVideos)
//           var randomAdPath = directory + '/' + advertisementVideoInArray[randomAdIndex]
//           console.log('Random Advertisement index: ' + randomAdIndex)
//         console.log('Random Advertisement Path: ' + randomAdPath) // check the path and name of the video being played
//         video_ad.src = randomAdPath // Set the source of the advertisement video
//         video_ad.play() // Play the advertisement
//         triggerVideo.pause() // Pause the main video
//         playedAds.push(progress) // Add the time point to the array of played ads
//         closeFullscreen(triggerVideo)
//         closePictureInPicture(triggerVideo)
//       } else {
//         console.error('No advertisement videos available.')
//       }
//     }
//   })
// })

// // Listen for triggerVideo play event
// triggerVideo.addEventListener('play', function () {
//   modal.style.display = 'none'
//   triggerVideo.style.visibility = 'visible' // Show triggerVideo
// })

// // Function to close fullscreen mode
// function closeFullscreen () {
//   if (
//     document.fullscreenElement ||
//     document.webkitFullscreenElement ||
//     document.msFullscreenElement
//   ) {
//     if (document.exitFullscreen) {
//       document.exitFullscreen()
//     } else if (document.webkitExitFullscreen) {
//       /* Safari */
//       document.webkitExitFullscreen()
//     } else if (document.msExitFullscreen) {
//       /* IE11 */
//       document.msExitFullscreen()
//     }
//   }
// }

// // Function to close Picture-in-Picture mode
// function closePictureInPicture () {
//   if (
//     document.pictureInPictureElement ||
//     document.webkitPictureInPictureElement ||
//     document.msPictureInPictureElement
//   ) {
//     if (document.exitPictureInPicture) {
//       document.exitPictureInPicture()
//     } else if (document.webkitExitPictureInPicture) {
//       /* Safari */
//       document.webkitExitPictureInPicture()
//     } else if (document.msExitPictureInPicture) {
//       /* IE11 */
//       document.msExitPictureInPicture()
//     }
//   }
// }

// // Listen for triggerVideo seeking event
// triggerVideo.addEventListener('seeking', function () {
//   seeking = true
// })

// // Listen for triggerVideo seeked event
// triggerVideo.addEventListener('seeked', function () {
//   seeking = false
// })

// // Listen for video_ad timeupdate event
// video_ad.addEventListener('timeupdate', function () {
//   var duration = video_ad.duration
//   if (isFinite(duration)) {
//     var value = (100 / duration) * video_ad.currentTime
//     seekbar_ad.value = value
//   } else {
//     // Handle non-finite duration (e.g., set seekbar value to 0)
//     seekbar_ad.value = 0
//   }
// })

// // Listen for video_ad ended event
// video_ad.addEventListener('ended', function () {
//   triggerVideo.style.visibility = 'visible' // Show triggerVideo
//   triggerVideo.play()
// })

// // Disable right-click menu on video player
// triggerVideo.addEventListener('contextmenu', function (event) {
//   event.preventDefault()
// })

// document.body.addEventListener('contextmenu', function (event) {
//   event.preventDefault()
// })