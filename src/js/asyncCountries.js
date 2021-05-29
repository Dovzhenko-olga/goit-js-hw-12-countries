const BASE_URL = 'https://restcountries.eu/rest/v2';

export default async function fetchCountries(searchQuery) {

  
  const response = await fetch(`${BASE_URL}/name/${searchQuery}`);
  if (response.ok) return response.json();
      throw new Error("Error fetching data");
}