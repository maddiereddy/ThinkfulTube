'use strict'

const NUM_RESULTS = 15;
const API_KEY = "AIzaSyDgaHyAAK2rxOI-YNmP7ilXcQm2LdTDmwE";
const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromAPI(searchTerm, callback) {
  const settings = {
      part: 'snippet',
      key: `${API_KEY}`,
      q: `${searchTerm}`,
      type: 'video',
      maxResults: NUM_RESULTS
    };

  $.getJSON(YOUTUBE_URL, settings, callback);
}

function renderResult(result) {
  return `<li>
      <h3>${result.snippet.title}</h3>
      <p>
        <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target=”_blank”>
          <img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}">
        </a>
        <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target=”_blank”>
          ${result.snippet.channelTitle}
        </a>
        <br>
        ${result.snippet.description}
      </p>
    </li>`;
}

function displayData(data) {
  $('#results-header').html(`Top ${NUM_RESULTS} results`).prop('hidden', false);
  const results = data.items.map((item, index) => renderResult(item));
  $('#search-results').html(results).prop('hidden', false);
}


function watchSubmit() {
  $('#search-form').submit(event => {
    const queryTarget = $(event.currentTarget).find('#query');
    const query = queryTarget.val();
    
    event.preventDefault();
    getDataFromAPI(query, displayData);
  })
}

$(watchSubmit);