import React from 'react'
import { Link } from "react-router-dom"

const ListItem = (props) => {
  const ID = props.url.replace(/\/$/, "").substr(props.url.replace(/\/$/, "").lastIndexOf('/') + 1);
  return (
    <Link className="titleLink" to={`/details/${ID}`}>
      <div className="listItem" key={props.url}>
        {props.name}
      </div>
    </Link>
  )
}

export default React.memo(ListItem);