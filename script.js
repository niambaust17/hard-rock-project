const inputSong = document.getElementById('song-name');
const searchSong = async () =>
{
    const searchText = document.getElementById('song-name').value;
    const res = await fetch(`https://api.lyrics.ovh/suggest/:${ searchText }`);
    const data = await res.json();
    showSongs(data.data);
    inputSong.value = '';
    document.querySelector('.single-lyrics').style.display = 'none';
};

const showSongs = songs =>
{
    if (inputSong.value.length != 0 && isNaN(inputSong.value))
    {
        const divContainer = document.getElementById('song-container');
        divContainer.innerHTML = '';
        songs.forEach(song =>
        {
            const newSong = song.preview.slice(39, song.preview.length);
            // console.log(newSong);
            // const newSong = 'c-e54b20c75f39a478f54e78b9b0796bc5-2.mp3';
            const divSong = document.createElement('div');
            divSong.className = 'single-result row align-items-center my-3 p-3';
            divSong.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${ song.title }</h3>
                <p class="author lead">Album by <span>${ song.artist.name }</span></p>
                <audio controls>
                <source src="https://cdn-preview-e.deezer.com/stream/${ newSong }" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${ song.artist.name }', '${ song.title }')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
            divContainer.appendChild(divSong);
        });
    }
};

const getLyrics = async (artist, title) =>
{
    const res = await fetch(`https://api.lyrics.ovh/v1/${ artist }/${ title }`);
    try
    {
        document.querySelector('.single-lyrics').style.display = 'block';
        const data = await res.json();
        showLyrics(data);
    }
    catch (error)
    {
        showError('Try Again Later');
    }

};

// const getLyrics = (artist, title) =>
// {
//     fetch(`https://api.lyrics.ovh/v1/${ artist }/${ title }`)
//         .then(res => res.json())
//         .then(data => showLyrics(data))
//         .catch(error => showError('Try Again Later'))
// };

const showLyrics = lyrics =>
{
    if (lyrics.lyrics.length != 0)
    {
        const lyricsDiv = document.querySelector('.single-lyrics');
        const songLyrics = lyrics.lyrics;
        lyricsDiv.innerText = songLyrics;
    }
    else
    {
        document.querySelector('.single-lyrics').style.display = 'none';
    }
}

const showError = error =>
{
    document.getElementById('error-msg').innerText = error;
}