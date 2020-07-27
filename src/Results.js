import React from 'react'
import { getResults, getPrevNext } from './tools/SWAPI'
import useNearScreen from './hooks/useNearScreen'
import ListItem from './components/ListItem';

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
    ? <section className="loading">
        LOADING.....
      </section>
    :
      <>
        <h1>Planets</h1>
        <section className="sorter">
          <button onClick={sortByName}>Sort by Name {sort !== '' ? sort === 'asc' ? '↓' : '↑' : ''}</button>
        </section>
        <section>
          {results.results && results.results.map(item => {
            return (
              <ListItem key={item.url} {...item} />
            )
          })}
        </section>
        <div id="visor" ref={externalRef}></div>
      </>
    }
  </>)
}