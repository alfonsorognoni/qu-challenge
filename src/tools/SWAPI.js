export async function getResults (type) {
  const response = await fetch(`http://swapi.dev/api/${type}`);
  const data = await response.json();
  return data;
}

export async function getPrevNext (url) {
  const response = await fetch(`${url}`);
  const data = await response.json();
  return data;
}

export async function getDetails (id) {
  const response = await fetch(`http://swapi.dev/api/planets/${id}`);
  const data = await response.json();
  return data;
}