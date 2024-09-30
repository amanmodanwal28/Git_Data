;(async () => {
  const open = (await import('open')).default

  const url = 'https://github.com/amanmodanwal28/'
  const times = 30

  for (let i = 0; i < times; i++) {
    await open(url) // Open the URL in the default browser
    console.log(`Opened ${url} - Count: ${i + 1}`)
  }
})()
