import React from 'react'
import { useParams } from "react-router-dom"
export default function Details(props) {
  let  { id }  = useParams();

  const [details, setDetails] = React.useState({});
  async function getDetails (id) {
    const response = await fetch(`http://swapi.dev/api/planets/${id}`);
    const data = await response.json();
    setDetails(data);
    return data;
  }

  React.useEffect(() => {
    getDetails(id);
  }, []);

  return (
    <section className="content">
      <article>
        <div>{details.name}</div>
        <div>{details.terrain}</div>
      </article>
    </section>
  )
}