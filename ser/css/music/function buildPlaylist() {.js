 function buildPlaylist() {
  playlistItems.innerHTML = '';

  playlist.forEach((track, index) => {
    const listItem = document.createElement('div');
    listItem.classList.add('playlist-item');
    listItem.textContent = track;
    listItem.dataset.index = index;
    listItem.addEventListener('click', () => playAudio(index, folderSelect.value)); // Pass the selected folder
    playlistItems.appendChild(listItem);
  });
}