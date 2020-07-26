import React from 'react'
import { Link } from "react-router-dom"
export default function Results({type}) {
  const [results, setResults] = React.useState({});
  async function getResults () {
    const response = await fetch(`http://swapi.dev/api/${type}`);
    const data = await response.json();
    setResults(data);
    return data;
  }
  React.useEffect(() => {
    getResults()
  }, []);

  return (
    <section className="content">
      {results.results && results.results.map(item => {
        const ID = item.url.replace(/\/$/, "").substr(item.url.replace(/\/$/, "").lastIndexOf('/') + 1);
        return (
          <article key={item.url}>
            <Link to={`/details/${ID}`}>{item.name}</Link>
          </article>
        )
      })}
    </section>
  )
}