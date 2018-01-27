'use strict'

const numResults = 15;
const API_Key = "AIzaSyDgaHyAAK2rxOI-YNmP7ilXcQm2LdTDmwE";
const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromAPI(searchTerm, callback) {
  const settings = {
      part: 'snippet',
      key: `${API_Key}`,
      q: `${searchTerm}`,
      type: 'video',
      maxResults: numResults
    };

  $.getJSON(YOUTUBE_URL, settings, callback);
}

function renderResult(result) {
  return `<li>
      <h3>${result.snippet.title}</h3>
      <p>
        <a href="https://www.youtube.com/watch?v=${result.id.videoId}">
          <img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}">
        </a>
        <a href="https://www.youtube.com/channel/${result.snippet.channelId}">${result.snippet.channelTitle}</a><br>
        ${result.snippet.description}
      </p>
    </li>`;
}

function displayData(data) {
  $('.js-results-header').html(`Top ${numResults} results`).prop('hidden', false);
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results).prop('hidden', false);
}


function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();

    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");

    getDataFromAPI(query, displayData);
  })
}

$(watchSubmit);