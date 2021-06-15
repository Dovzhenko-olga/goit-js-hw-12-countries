import cardTpl from '/templates/cardTpl.hbs';
import fetchCountries from '/js/asyncCountries';

const listContainer = document.querySelector('.js-articles-container');

export default async function selectCountry(e, searchQuery, list) {
    if (e.target.nodeName === 'LI') {
        searchQuery.value = e.target.textContent;
        list.innerHTML = '';
        list.hidden = true;

        try {
            const country = await fetchCountries(searchQuery.value);

        
            searchQuery.value = '';
            listContainer.innerHTML = cardTpl(country);
        } catch (error) {
            console.log(error);
        }
    }
}