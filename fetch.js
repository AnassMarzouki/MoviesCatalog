let mTitles = []
let mYears = []
let mPlots = []
let mID = []

async function appendToArray () {
    const res = await fetch(`http://www.omdbapi.com/?s=ace&apikey=f4583eb2`)
    const element = await res.json()

    const plotPromies = []

    for (let i=0;i<10;i++){
        mTitles.push(element.Search[i].Title)
        mYears.push(element.Search[i].Year)
        mID.push(element.Search[i].imdbID)

        const plotPromise = fetch(`http://www.omdbapi.com/?apikey=f4583eb2&i=${mID[i]}&plot=short`)
        .then (res => res.json())
        .then (data => {
            console.log (mID[i] + ': ' + data.Plot)
            return data.Plot
        })

        plotPromies.push(plotPromise)
    }
    
    mPlots = await Promise.all(plotPromies)

    console.log(mPlots)


}

appendToArray()

