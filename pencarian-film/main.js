const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function (){
  try {
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    updateUi(movies);
  } catch (err) {
    const alert = document.querySelector('.error');
    alert.innerHTML = showError(err);
  }
});

//event binding
document.addEventListener('click', async function(e){
  if (e.target.classList.contains('modal-detail-button')){
    const imdbid = e.target.dataset.imdbid;
    const detailMovie = await getMovieDetail(imdbid);
    updateUiDetail(detailMovie);
  }
});

function getMovies(keyword) {
  return fetch('http://www.omdbapi.com/?apikey=7b261634&s=' + keyword)
          .then(response => {
            if (!response.ok){
              throw new Error(response.statusText);
            } 
            return response.json();
          })
          .then(response => {
            if (response.Response === 'False'){
              throw new Error(response.Error);
            }
            return response.Search;
          });
}

function getMovieDetail (imdbid) {
   return fetch('http://www.omdbapi.com/?apikey=7b261634&i=' + imdbid)
          .then(response => response.json())
          .then(m => m);
}

function updateUi(movies){
  let cards = '';
      movies.forEach(m => cards += showCards(m));
      const movieContainer = document.querySelector('.movie-container');
      movieContainer.innerHTML = cards;

}

function updateUiDetail(m) {
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML= movieDetail;
}

function showCards (m){
  return ` <div class="col-md-3">
              <div class="card">
                <img src="${m.Poster}" class="card-img-top" alt="" />
                <div class="card-body">
                  <h5 class="card-title">${m.Title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                  <a href="#" class="btn btn-primary modal-detail-button"  data-toggle="modal" data-target="#movieDetail" data-imdbid="${m.imdbID}">Show Details</a>
                </div>
              </div>
            </div>`;

}

function showMovieDetail (m) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${m.Poster}" class="img-fluid">
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><h4>${m.Title}</h4></li>
                  <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                  <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                  <li class="list-group-item"><strong>Writter : </strong>${m.Writer}</li>
                  <li class="list-group-item"><strong>Plot : </strong> <br> ${m.Plot}</li>
                </ul>
              </div>
            </div>
          </div>`;
}

function showError (err) {
  return `<div class="alert alert-danger" role="alert">
            ${err}
          </div>`
}
