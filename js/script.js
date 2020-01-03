// OMDb API Key : c2a0850f

getData = (url) => {
    return fetch(url).then(function (result) {
        return result.json();
    });
}

details = (elem) => {
    let details = $(elem).data('details');
    getData(details).then(function (result) {

        let list = `<h3 class="title">About Movie</h3>${result.Plot}`;

        document.getElementById('movie-description').innerHTML = list;
    });
}

newUrl = (elem) => {

    $('#movie-description').empty();

    let newUrl = $(elem).data('elem');

    let name = $('#inputName').val();
    let type = $('#inputType').val();

    getData(newUrl).then(function (result) {
        let list = ``;

        for (let i = 0; i < 10; i++) {
            if (result.Search[i].Poster == 'N/A' || !result.Search[i].Poster) result.Search[i].Poster = '../img/no-poster.png';
            list += `
                    <div class="item">
                        <img class="item__img" src="${result.Search[i].Poster}" alt="Movie image">
                        <h3 class="item__title">${result.Search[i].Title}</h3>
                        <div class="meta">
                            ${result.Search[i].Year},
                            ${result.Search[i].Type}
                        </div>
                        <button onclick="return details(this);" type="button" class="item__button btn btn-link" data-details="//www.omdbapi.com/?apikey=c2a0850f&i=${result.Search[i].imdbID}&plot=full">Details...</button>
                    </div>
                `;
        }

        list += `<div class="item item--empty"></div>`;
        list += `<div class="item item--empty"></div>`;

        if (+result.totalResults > 10) {
            let pages = Math.ceil(+result.totalResults / 10);

            list += `<ul class="pagination pagination-lg">`;

            for (let y = 1; y <= pages; y++) {
                list += `<li class="page-item"><a class="page-link" onclick="return newUrl(this);" href="javascript:void(0);" data-elem="//www.omdbapi.com/?apikey=c2a0850f&s=${name}&type=${type}&page=${y}">${y}</a></li>`;
            }

            list += `</ul>`;

        }

        document.getElementById('movie-list').innerHTML = list;
    });
}

$('form').submit(function () {

    $('#movie-description').empty();

    let name = $('#inputName').val();
    let type = $('#inputType').val();
    let page = 1;

    url = `//www.omdbapi.com/?apikey=c2a0850f&s=${name}&type=${type}&page=${page}`;

    getData(url).then(function (result) {
        if (result.Response != 'False') {

            let list = ``;

            for (let i = 0; i < 10; i++) {
                if (result.Search[i].Poster == 'N/A') result.Search[i].Poster = '/img/no-poster.png';
                list += `
                    <div class="item">
                        <img class="item__img" src="${result.Search[i].Poster}" alt="Movie image">
                        <h3 class="item__title">${result.Search[i].Title}</h3>
                        <div class="meta">
                            ${result.Search[i].Year},
                            ${result.Search[i].Type}
                        </div>
                        <button onclick="return details(this);" type="button" class="item__button btn btn-link" data-details="//www.omdbapi.com/?apikey=c2a0850f&i=${result.Search[i].imdbID}&plot=full">Details...</button>
                    </div>
                `;
            }

            list += `<div class="item item--empty"></div>`;
            list += `<div class="item item--empty"></div>`;

            if (+result.totalResults > 10) {
                let pages = Math.ceil(+result.totalResults / 10);

                list += `<ul class="pagination pagination-lg">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1">1</a>
                            </li>`;

                for (let y = 2; y <= pages; y++) {
                    list += `<li class="page-item">
                                <a class="page-link" onclick="return newUrl(this);" href="javascript:void(0);" data-elem="//www.omdbapi.com/?apikey=c2a0850f&s=${name}&type=${type}&page=${y}">${y}</a>
                            </li>`;
                }
                list += `</ul>`;

            }

            document.getElementById('movie-list').innerHTML = list;

        } else {
            document.getElementById('movie-list').innerHTML = `<div class="error">${result.Error}</div>`;
        }
    });

    return false;
});




