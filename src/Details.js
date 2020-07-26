import React from 'react'
import { useParams } from "react-router-dom"
import { getDetails } from './tools/SWAPI';

export default function Details(props) {
  let  { id }  = useParams();
  const [loading, setLoading] = React.useState(true);
  const [details, setDetails] = React.useState({});

  React.useEffect(() => {
    setLoading(true);
    getDetails(id).then((res)=> {
      setDetails(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="content loading">
        LOADING.....
      </section>
    )
  }

  return (
    <section className="content">
      <article>
        <div>{details.name}</div>
        <div>{details.terrain}</div>
      </article>
    </section>
  )
}