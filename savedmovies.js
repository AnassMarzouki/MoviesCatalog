const savedMovies = document.getElementById('saved-movies-list')
const storedItems = JSON.parse(localStorage.getItem('movies'))

document.addEventListener('click', function(event){
    const targetMovie = event.target.dataset.remove
    if(targetMovie){
        const toBeRemoved = storedItems.indexOf(targetMovie)
        storedItems.splice(toBeRemoved, 1)
        console.log(targetMovie + ' was deleted from localStorage')

        localStorage.setItem('movies', JSON.stringify(storedItems))
        savedMovies.innerHTML = ''
        loopThroughIDs()
    }
    }
)

let mTitles
let mYears
let mPlots
let mID
let mType
let mPoster
let watchlistIDS
let mRating


function loopThroughIDs (){
    if (storedItems != 0){
        for (let i=0; i<storedItems.length; i++){
            let movieID = storedItems[i]

            fetch(`https://www.omdbapi.com/?apikey=f4583eb2&i=${movieID}&plot=short`)
            .then(res => res.json())
            .then (element => {
                mTitles = element.Title
                mYears= element.Year
                mID = element.imdbID
                mType = element.Type
                mPoster = element.Poster
                mRating = element.Ratings[0].Value
                mPlots = element.Plot

                savedMovies.innerHTML += `
                    <div id="container">
                    <div id="poster">
                        <img src=${mPoster} class="poster">
                        
                    </div>

                    <div id="metadata">               
                            
                        <div id="title-rating">
                            <p data-mvtitle="${mID}" class="movie-title-tag">${mTitles} </p>
                            <p class="release-year">${mYears} </p>
                            
                        </div>
                        <div id="time-genre-addwatchlist">
                            
                            <p>🎬 ${mType}</p>
                            <p>⭐${mRating}</p>
                            <button data-remove="${mID}" class="wl-btn-delete">-</button>
                        </div>
                            <p>${mPlots}</p>

                            
                        </div>
                    </div>
                    </div>
                    `
            
            })
        }
    } else {
        savedMovies.innerHTML = '<h4> Such empty </h4>'
    }
}

loopThroughIDs()
