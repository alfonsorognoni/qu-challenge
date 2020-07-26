import React from 'react'
import { Link } from "react-router-dom"
import { getResults, getPrevNext } from './tools/SWAPI'

export default function Results({type}) {
  const [loading, setLoading] = React.useState(true);
  const [results, setResults] = React.useState({});
  
  React.useEffect(() => {
    setLoading(true);
    getResults(type).then(res => {
      setResults(res);
      setLoading(false);
    });
  }, []);

  const onClick = (event) => {
    const url = event.target.getAttribute('url');
    setLoading(true);
    getPrevNext(url).then((res) => {
      setResults(res);
      setLoading(false);
    });
  }

  if (loading) {
    return (
      <section className="content loading">
        LOADING.....
      </section>
    )
  }

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
      <div className="pagination">
        <button disabled={!results.previous} onClick={onClick} url={results.previous}>
          PREV
        </button>
        <button disabled={!results.next} onClick={onClick} url={results.next}>
          NEXT
        </button>
      </div>
    </section>
  )
}