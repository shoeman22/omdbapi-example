import React from 'react'
import PropTypes from 'prop-types'

const MovieInfo = ({movieInfo}) => {
  let items = []

  // just looping through the return object, toString is deal with some sub-arrays I didn't want to breakdown
  for(let key in movieInfo) {
    items.push(
      // react requires all children to have a unique "key" when looping like this
      <div key={key}>
        <b>{key}:</b> {movieInfo[key].toString()}
      </div>
    )
  }

  // react knows to render each of the items entries
  return <div id="movieInfo">{ items }</div>
}

MovieInfo.propTypes = {
  movieInfo: PropTypes.object.isRequired
}

export default MovieInfo