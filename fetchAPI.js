const keyWord = 'Spider man'

const id=[]

async function showResults(){    
    const res = await fetch(`http://www.omdbapi.com/?s=${keyWord}&apikey=f4583eb2`)
    const data = await res.json()}

fetch(`http://www.omdbapi.com/?apikey=f4583eb2&i=tt1285016&plot=short`)
    .then(res => res.json())
    .then(data => {
        console.log(data.Plot)})


fetch('http://www.omdbapi.com/?s=ace&apikey=f4583eb2')
.then (response => {
    return response.json();
})

