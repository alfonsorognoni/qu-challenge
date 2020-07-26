import React from 'react'
import { Link } from "react-router-dom"
import { getResults, getPrevNext } from './tools/SWAPI'
import useNearScreen from './hooks/useNearScreen'

export default function Results({type}) {
  const [loading, setLoading] = React.useState(true);
  const [results, setResults] = React.useState({});

  const externalRef = React.useRef()
  const {isNearScreen} = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false
  })
  
  React.useEffect(() => {
    setLoading(true);
    getResults(type).then(res => {
      setResults(res);
      setLoading(false);
    });
  }, []);

  React.useEffect(function () {
    if (isNearScreen) {
      console.log('SIII near');
      console.log(externalRef);
      console.log(results.next);
      if (results.next) {
        handleNextPage(results.next)
      }
    }
  }, [isNearScreen])

  const handleNextPage = (url) => {
    // setLoading(true);
    getPrevNext(url).then((res) => {
      const newResults = [...results.results, ...res.results];
      res.results = newResults;
      setResults(res);
      setLoading(false);
    });
  }

  return (<>
    {loading 
    ? <section className="content loading">
        LOADING.....
      </section>
    :
      <>
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