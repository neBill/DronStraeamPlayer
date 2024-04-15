const songs = {
  0 : 'Иные времена.mp3',
  1 : 'Частушки - пофигушки.mp3',    
  2 : 'Рассказ брачного агента, бывшего евнуха.mp3',
  3 : 'Свободная частица.mp3',
  4 : 'Любовное чтиво.mp3',
  5 : 'Астрологическая песня.mp3',
  6 : 'Деревенька.mp3',
  7 : 'Случай в Кремле.mp3',
  8 : 'Суррогаты.mp3',
  9 : 'Включайте поворотники.mp3',
  10 : 'Разговор с поэтом.mp3',
  11 : 'Марш гедонистов.mp3',
  12 : 'Разговор с критиком.mp3',
  13 : 'Инь и Ян.mp3',
  14 : 'Былина о попсе.mp3',
  15 : 'Кто стучится в дверь ко мне.mp3',
  16 : 'Товарищи учёные - 30 лет спустя.mp3',
  17 : 'Хоронила мафия....mp3',
  18 : 'Аутотренинг.mp3',
  19 : 'Цыганская песня.mp3',
  20 : 'О судьбе интеллигенции.mp3',
  21 : 'Сказки нашего времени.mp3',
  22 : 'Волшебство виски.mp3',
  23 : 'Перспективы.mp3',
  24 : 'Вредная песня.mp3'
} 







const audio = document.createElement('audio'),
  player = document.querySelector('.player_container'),
  slider_container = document.querySelector('.slider_container'),
  play_btn = document.querySelector('#play_track'),
  next_btn = document.querySelector('#next_track'),
  prev_btn = document.querySelector('#prev_track'),
  slider = document.querySelector('.slider'),
  curr_time = document.querySelector('.current_time'),
  total_duration = document.querySelector('.total_duration'),
  track_list = document.querySelector('#buttons_container'),
  playlistTitle = document.querySelector('#playlist_title'),
  addButton = document.querySelector('#add-button')
  

let track_index = 0

let isOnlinePlaylist = true

//var newPlayList

var playlist


//function getTrackPath(index){  

 // return `music/${songs[index]}`

  

//}
///////////////////////

// function run() {

//   let song = playlist[0]
//   alert(song.artist)

// }

////////////////////////////////

window.addEventListener("DOMContentLoaded", ()=>{

  //createButtons(Object.keys(songs).length) 

 // playlist = favorite[1]

  //playlistTitle.textContent = favorite[0]

  // playlistTitle.textContent = "Избранное"

  // createButtons(Object.keys(playlist).length)   

  // loadTrack(track_index) 
  
 //alert(favorite[0])

  //loadPlaylist(favorite[1], favorite[0])

  createButtons(favorite[1], favorite[0])

  loadTrack(track_index) 

})

window.addEventListener('load', function() {
  window.history.pushState({}, '')
})

window.addEventListener('popstate', function() {
  window.history.pushState({}, '')
})





 addButton.addEventListener('change', () => {
     
 //alert(addButton.files.length)
 //console.log(addButton.files)

 const fileName = addButton.files[0].name.replace(".txt", "")

 //console.log(file.name)

  // let filePath = e.target.value

  const fr = new FileReader();

  fr.readAsText(addButton.files[0]);

  fr.addEventListener('load', () => {
   
    //  alert(fr.result)
   //let jsonPlaylist = JSON.parse(fr.result)

    //document.getElementById('_header').textContent = newPlayList

    //loadPlaylist(fr.result, fileName)

    createButtons(JSON.parse(fr.result), fileName)
    

   //alert(Object.keys(json).length)

  })
 

  
  

  fr.onerror = () => { 
    console.log(fr.error);
  };



});

// function loadPlaylist(textContent, title) {


//   playlistTitle.textContent = title

//   createButtons(Object.keys(textContent).length)   

//   //loadTrack(track_index)   

// }



function createButtons(textContent, title) {

  track_list.innerHTML = ''

  playlist = textContent

  let tracksCount = Object.keys(textContent).length

  playlistTitle.textContent = title

  for(let i = 0; i < tracksCount; i++){
    let btn = document.createElement('button')


   // btn.innerText=songs[i].replace('.mp3', '')

   btn.innerText = textContent[i].title


    btn.className = 'song_button'
    btn.id = i
    btn.color = 'var(--button-color)'
    track_list.appendChild(btn)
  }



}

// function removeButtons() {

//  // const buttonsDiv = document.getElementById('levels');  
//   buttonsDiv.innerHTML = '';

//   track_list.innerHTML = '';
  
// }


function loadTrack(track_index){  
 
  //audio.src = getTrackPath(track_index) 



   audio.src = playlist[track_index].url

  // alert(playlist[track_index].url)

}


function updateProgress(e){

  const {duration, currentTime} = e.srcElement  
  const progressPersent = (currentTime / duration) * 100;
  slider.style.width = `${progressPersent}%`;

  caclulateProgress(duration, currentTime)

  
}

audio.addEventListener('timeupdate', updateProgress)

function setProgress(e){  

  //console.log(audio.duration)

  const width = e.target.clientWidth
  const click = e.offsetX 
  const duration = audio.duration
  audio.currentTime = (click / width) * duration
 
  // console.log((click / width) * duration)
}

slider_container.addEventListener('click', setProgress)



play_btn.addEventListener('click', () => {

  const isPlaying = player.classList.contains('play')

  if(isPlaying) {

    pauseTrack()

  } else {


    playTrack()

  }

});

function playTrack() {  

  player.classList.add('play')
  document.getElementById(track_index).style.color = 'var(--button-pressed-color)'
  audio.play()
  play_btn.innerText = 'II'
}

function pauseTrack() {

  player.classList.remove('play')  
  audio.pause(); 
  play_btn.innerText = '>'
}



function nextTrack() {

  audio.pause();
  audio.currentTime = 0;

  

  document.getElementById(track_index).style.color = 'var(--button-color)' 

  track_index++

  //alert(songs.length)

  const songsLength = Object.keys(songs).length - 1

  if (track_index > songsLength) {

   // alert(track_index)
    track_index = 0
  }

  //alert(track_index)

  loadTrack(track_index)
  playTrack()

}

next_btn.addEventListener('click', nextTrack)



function prevTrack() {

  document.getElementById(track_index).style.color = 'var(--button-color)'

  track_index--

  if (track_index <  0) {

    track_index = 0
  }

  loadTrack(track_index)
  playTrack()
}

prev_btn.addEventListener('click', prevTrack)


document.addEventListener('click', event => {

  const btnClass = event.target.className

  if(btnClass === 'song_button') {

    document.getElementById(track_index).style.color = 'var(--button-color)' 

    track_index = event.target.id
    
    loadTrack(track_index)

    playTrack()    

  }   

})



audio.addEventListener('ended', nextTrack)


// function resetValues() {
//   curr_time.textContent = "00:00";
//   total_duration.textContent = "00:00";
//   // slider.value = 0;
// }



function caclulateProgress(duration, currentTime) { 

  //alert(duration)

  // Check if the current track duration is a legible number
  if (!isNaN(duration)) {
    
   

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration - durationMinutes * 60);

    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }  

   
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;

    
  }    


}







