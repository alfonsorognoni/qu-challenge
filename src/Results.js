import React from 'react'
import { Link } from "react-router-dom"
import { getResults, getPrevNext } from './tools/SWAPI'
import useNearScreen from './hooks/useNearScreen'

export default function Results({type}) {
  const [sort, setSort] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [results, setResults] = React.useState({});

  const externalRef = React.useRef()
  const {isNearScreen} = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false
  });

  const sortList = (list, order, key) => {
    if (order && order !== '') {
      return order === 'desc'
      ? [...list].sort((b, a) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
      : [...list].sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
    }
    return list
  }
  
  React.useEffect(() => {
    setLoading(true);
    getResults(type).then(res => {
      setResults(res);
      setLoading(false);
    });
  }, []);

  React.useEffect(function () {
    if (isNearScreen) {
      if (results.next && !loading) {
        handleNextPage(results.next)
      }
    }
  }, [isNearScreen])

  const handleNextPage = (url) => {
    // setLoading(true);
    getPrevNext(url).then((res) => {
      const newResults = [...results.results, ...res.results];
      if (sort !== '') {
        res.results = sortList(newResults, sort, 'name');
      } else {
        res.results = newResults;
      }
      setResults(res);
      setLoading(false);
    });
  }

  const sortByName = (event) => {
    event.preventDefault();
    const newSort = sort === '' || sort === 'desc' ? 'asc' : 'desc';
    setSort(newSort);
    results.results = sortList(results.results, newSort, 'name');
    setResults({...results});
  }

  return (<>
    {loading 
    ? <section className="content loading">
        LOADING.....
      </section>
    :
      <>
      <section className="content sorter">
        <button onClick={sortByName}>Sort by Name {sort !== '' ? sort === 'asc' ? '↓' : '↑' : ''}</button>
      </section>
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
      <div id="visor" ref={externalRef}></div>
      </>
    }
  </>)
}