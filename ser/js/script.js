$(document).ready(function() {
    $('#autoWidth').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function() {
            $('#autoWidth').removeClass('cs-hidden')
        }
    })
})

$(document).ready(function() {
    $('#autoWidth1').lightSlider({
        autoWidth: true,
        loop: false,
        onSliderLoad: function() {
            $('#autoWidth1').removeClass('cs1-hidden')
        }
    })
})
$(document).ready(function() {
    $('#autoWidth2').lightSlider({
        autoWidth: true,
        loop: false,
        onSliderLoad: function() {
            $('#autoWidth2').removeClass('cs2-hidden')
        }
    })
})
$(document).ready(function() {
    $('#autoWidth3').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function() {
            $('#autoWidth3').removeClass('cs3-hidden')
        }
    })
})
$(document).ready(function() {
    $('#autoWidth4').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function() {
            $('#autoWidth4').removeClass('cs4-hidden')
        }
    })
})



// Disable text selection
document.body.style.userSelect = 'none'

// Function to prevent dragging and default actions
function preventDefaultDrag(event) {
    event.preventDefault()
}

// Wait for the DOM to fully load
// document.addEventListener('DOMContentLoaded', () => {
//     // Prevent dragging for images
//     const images = document.querySelectorAll('img')
//     images.forEach((img) => {
//         img.addEventListener('dragstart', preventDefaultDrag)
//         img.addEventListener('mousedown', preventDefaultDrag)
//         img.addEventListener('drag', preventDefaultDrag)
//     })

//     // Prevent dragging for links
//     const links = document.querySelectorAll('a')
//     links.forEach((link) => {
//         link.addEventListener('dragstart', preventDefaultDrag)
//         link.addEventListener('mousedown', preventDefaultDrag)
//         link.addEventListener('drag', preventDefaultDrag)
//     })

//     // Prevent dragging for buttons
//     const buttons = document.querySelectorAll('button')
//     buttons.forEach((button) => {
//         button.addEventListener('dragstart', preventDefaultDrag)
//         button.addEventListener('mousedown', preventDefaultDrag)
//         button.addEventListener('drag', preventDefaultDrag)
//     })

//     // Prevent dragging for all anchor tags and buttons
//     const elements = document.querySelectorAll('a, button')
//     elements.forEach((element) => {
//         element.addEventListener('dragstart', preventDefaultDrag)
//         element.addEventListener('mousedown', preventDefaultDrag)
//         element.addEventListener('drag', preventDefaultDrag)
//     });

// })


// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Define a common selector for draggable elements
    const draggableSelectors = 'img, a, button'

    // Select all elements that match the selector
    const elements = document.querySelectorAll(draggableSelectors)

    // Add event listeners to prevent dragging
    // elements.forEach(element => {
    //     element.addEventListener('dragstart', preventDefaultDrag);
    //     element.addEventListener('mousedown', preventDefaultDrag);
    //     element.addEventListener('drag', preventDefaultDrag);
    // });

    // Add event listeners to prevent dragging
    elements.forEach((element) => {
        // Prevent default dragstart and drag events
        element.addEventListener('dragstart', preventDefaultDrag)
        element.addEventListener('drag', preventDefaultDrag)

        // Prevent default mousedown event which might initiate dragging
        element.addEventListener('mousedown', (event) => {
            event.preventDefault()
            event.stopPropagation() // Stop propagation to ensure no other drag-related handlers are triggered
        })
    })

    // Prevent dragging for the whole document
    document.body.addEventListener('dragstart', preventDefaultDrag)
});