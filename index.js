const searchBtn = document.getElementById('search-btn')
const inputField = document.getElementById('input-field')
const movieList = document.getElementById('movie-list')

const savedMovies = document.getElementById('saved-movies')

searchBtn.addEventListener('click', function (){
    appendToArray()})

document.addEventListener('click', addtoWatchList)

function addtoWatchList(event){
   
    if (event.target.dataset.add){
        
        let existingData = localStorage.getItem('movies') || '[]';
        existingData = JSON.parse(existingData)
        existingData.push(event.target.dataset.add)
        localStorage.setItem('movies', JSON.stringify(existingData))
            }         
        }

async function appendToArray () {
    let mTitles = []
    let mYears = []
    let mPlots = []
    let mID = []
    let mType = []
    let mPoster = []
    let watchlistIDS = []
    movieList.innerHTML = ''
    const keyWord = inputField.value
    console.log('your keyword: ' + keyWord)

    const res = await fetch(`https://www.omdbapi.com/?s=${keyWord}&apikey=f4583eb2`)
    const element = await res.json()

    const plotPromies = []

    for (let i=0;i<10;i++){
        mTitles.push(element.Search[i].Title)
        mYears.push(element.Search[i].Year)
        mID.push(element.Search[i].imdbID)
        mType.push(element.Search[i].Type)
        mPoster.push(element.Search[i].Poster)

        const plotPromise = fetch(`https://www.omdbapi.com/?apikey=f4583eb2&i=${mID[i]}&plot=short`)
        .then (res => res.json())
        .then (data => {
            return data.Plot
        })

        plotPromies.push(plotPromise)
    }

    console.log('___________________')

    mPlots = await Promise.all(plotPromies)
    
    let newString = ''
    for (let i=0; i<mTitles.length;i++){
        
        newString += `
        <div id="container">
        <div id="poster">
            <img src=${mPoster[i]} class="poster">
        </div>

        <div id="metadata">
            <div id="title-rating">
                <p data-mvtitle="${mID[i]}" class="movie-title-tag">${mTitles[i]}</p>
                <p class="release-year">${mYears[i]}</p>
            </div>

            <div id="time-genre-addwatchlist">
                
                <p>🎬 ${mType[i]}</p>
                <button data-add="${mID[i]}" class="wl-btn-add">+</button>
            </div>
                
            <div id="movie-description">
                <p>${mPlots[i]}</p>
            </div>
        </div>
    </div>
    `
    }
    movieList.innerHTML = newString
}
