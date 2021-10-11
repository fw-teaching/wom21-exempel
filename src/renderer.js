// renderer.js innehåller det somm händer client side (i browsern)

console.log('hello browserWindow');

document.querySelector('#btn').addEventListener('click', async () => {
    console.log('Clicked');

    // Trigga btnClicked() i preload.js, vänta på svar (som i sin tur kommer ända från main.js)
    const reply = await window.electron.btnClicked("hello from browser");
    console.log(reply); // 'Main says hello!'

});

(async () => {
    console.log("getNotes renderer");

    const notes = await window.electron.getNotes();
    
    //console.log(notes);

    notes.forEach(element => {
        document.querySelector('#notes').innerHTML += `<div>${element.text}</div>`;
    });
})();
