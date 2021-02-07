function searchSong()
{
    const searchText = document.getElementById('song-name').value;
    fetch(`https://api.lyrics.ovh/suggest/:${ searchText }`)
        .then(res => res.json())
        .then(data => showSongs(data.data))

};

const showSongs = songs =>
{
    const divContainer = document.getElementById('song-container');
    songs.forEach(song =>
    {
        const divSong = document.createElement('div');
        divSong.className = 'single-result row align-items-center my-3 p-3';
        divSong.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${ song.title }</h3>
                <p class="author lead">Album by <span>${ song.artist.name }</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        divContainer.appendChild(divSong);
    });
};