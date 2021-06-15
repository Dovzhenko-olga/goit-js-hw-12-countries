// import listTpl from '/templates/listTpl.hbs';
import cardTpl from '/templates/cardTpl.hbs';
import selectCountry from '/js/selectCountry.js';
import { debounce } from 'lodash';
import '/sass/main.scss';
import fetchCountries from '/js/asyncCountries.js';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const search = document.querySelector('.js-search-form');
const listContainer = document.querySelector('.js-articles-container');
const dropdown = document.querySelector('.js-dropdown');
dropdown.hidden = true;


search.addEventListener('input', debounce(onSearch, 500));
dropdown.addEventListener('click', e =>
    selectCountry(e, search, dropdown),
);

async function onSearch(e) {
  
  updateMarcup();
  
  const searchQuery = e.target.value;
  
  try {
    const countries = await fetchCountries(searchQuery);

    if (countries.length > 10) {
      error({
        text: 'Too many matches found. Please enter a more specific query!',
        mode: 'light',
        closer: true,
        hide: true,
        sticker: false,
        mouseReset: true,
        shadow: true,
        width: '350px',
        minHeight: '14px',
        delay: 2000,
      });
    }
    if (countries.length <= 10 && countries.length > 1) {
      dropdown.hidden = false;

      const countryArray = countries.reduce((acc, country) => {
      acc.push(country.name);
      return acc
    }, []);

      return dropdown.innerHTML = countryArray.map(elem => `<li class="drop-item">${elem}</li>`).join('');
    }
    if (countries.length === 1) {
      updateMarcup(cardTpl(countries));
    }
  } catch(error) {
    onFetchError(error);
  }
}


function updateMarcup(markup = "") {
listContainer.innerHTML = markup;
}
// function createList(countries) {
//   listContainer.innerHTML = listTpl(countries);
// }

// function createCard(country) {
//   listContainer.innerHTML = cardTpl(country);
// }

// function resetPage() {
//   listContainer.innerHTML = '';
// }

function onFetchError(err) {
  error({
    text: `${err}`,
    mode: 'dark',
    closer: true,
    hide: true,
    sticker: false,
    mouseReset: true,
    shadow: true,
    width: '350px',
    minHeight: '14px',
    delay: 2000,
  })
}



