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
      <section className="loading">
        LOADING.....
      </section>
    )
  }

  return (
    <>
    <h1>{details.name}</h1>
    <section className="">
      <article className="details">
        <div>
          <p><span className="details-item">Climate:</span> {details.climate}</p>
          <p><span className="details-item">Terrain:</span> {details.terrain}</p>
        </div>
        <div>
          <p><span className="details-item">Gravity:</span> {details.gravity}</p>
          <p><span className="details-item">Diameter:</span> {details.diameter}</p>
        </div>
      </article>
    </section>
    </>
  )
}