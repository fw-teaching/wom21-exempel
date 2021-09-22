/**
 * Callbacks, promises, async/await
 */
 function callbackHell() {
    // 1. Get all notes
    $.get('/notes/', (data) => {
      console.log(`Callback, Get last note: ${data[data.length - 1].text}`)
  
      // 2. PATCH last note
      $.ajax({
        method: "PATCH",
        url: '/notes/' + data[data.length - 1]._id,
        data: JSON.stringify({ text: data[data.length - 1].text + ' CB ' }),
        contentType: 'application/json',
        success: (data2) => {
  
          // 3. GET last note
          $.get('/notes/', (data3) => {
            console.log(`Callback, Fixed note: ${data3[data3.length - 1].text}`)
          })
        }
      })
    })
  }
  
  function promiseHell() {
    // 1. Get all notes
    fetch('/notes/')
      .then(response => response.json())
      .then(allNotes => {
        console.log('Promise, Get last note: ' + allNotes[allNotes.length - 1].text)
        return allNotes[allNotes.length - 1] // last object
      })
      .then(lastNote => {
        // 2. PATCH last note
        fetch('/notes/' + lastNote._id, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: lastNote.text + " P " })
        })
          .then(response => response.json())
          .then(data => {
            return data
          })
      })
      // 3. GET last note
      .then(fetch('/notes/')
        .then(response => response.json())
        .then(allNotes => {
          console.log('Promise, Fixed note: ' + allNotes[allNotes.length - 1].text)
        }))
  }
  
  async function asyncAwaitHeaven() {
    // 1. Get all notes
    let resp = await fetch('/notes/')
    let allNotes = await resp.json()
    let lastNote = allNotes[allNotes.length - 1]
    console.log('async/await, Last note: ' + lastNote.text)
  
    // 2. PATCH last note
    await fetch('/notes/' + lastNote._id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: lastNote.text + " AA " })
    })

    // 3. GET last note
    resp = await fetch('/notes/')
    allNotes = await resp.json()
    lastNote = allNotes[allNotes.length - 1]
    console.log('async/await, Fixed note: ' + lastNote.text)
  
  }