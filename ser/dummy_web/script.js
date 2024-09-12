// script.js
document
  .getElementById('contactForm')
  .addEventListener('submit', function (event) {
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value

    if (name === '' || email === '') {
      alert('Please fill out all fields.')
      event.preventDefault()
    }
  })
