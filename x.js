const movieList = ["tt0109040","tt0112281","tt0291490","tt3794354","tt12412888","tt3232262","tt1529737","tt0426116","tt0106140","tt1877830","tt3794354","tt2820852","tt0126029","tt0232500","tt3794354","tt3232262","tt0317219"]
console.log('movies= ' + movieList.length)
const toBeRemoved = movieList.indexOf('tt3794354')
const x = movieList.splice(toBeRemoved, 1)
console.log('movies= ' + movieList.length)
console.log(movieList)