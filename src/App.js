// any time you use JSX (the html-ish syntax, you HAVE to include React, even if it isn't used otherwise)
import React, { Component } from 'react';

// helper for string interpolation
import format from 'string-template'
import MovieForm from './components/MovieForm'
import MovieInfo from './components/MovieInfo'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      error: null,
      movieInfo: null
    }

    this.apiUrl = props.apiUrl || 'http://www.omdbapi.com/?i={movieId}&apikey={apiKey}'
    this.apiKey = props.apiKey || '89377829'

    // react steals the context, so you have to re-bind it to methods
    this.fetchMovieInfo = this.fetchMovieInfo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  fetchMovieInfo (movieId) {
    const url = format(this.apiUrl, {
      movieId,
      apiKey: this.apiKey
    })

    // getting a new movie, so we want to movieInfo and show loading logic
    this.setState({
      loading: true,
      movieInfo: null
    })
    
    // fetch is browser native way to do ajax anymore
    fetch(url)
      // comes back with a promise to return the body based on what type it is
      // you'll basically always do this
      .then(response => response.json())
      // now we actually have the parsed json response to work with
      .then(movieInfo => {
        // check if there's an error
        if(movieInfo.Response !== 'True') throw Error(movieInfo.Error)
        
        // looking good
        this.setState({
          movieInfo,
          error: null,
          loading: false
        })
      })
      .catch(error => {
        this.setState({
          movieInfo: null,
          error,
          loading: false
        })
      })
  }

  handleSubmit({movieId}) {
    return this.fetchMovieInfo(movieId)
  }

  render() {
    const { loading, movieInfo, error } = this.state

    return (
      <div>
        <MovieForm handleSubmit={this.handleSubmit} />
        { loading && <div>Loading...</div> }
        { error && <div style={ {color: "red"} }><b>{error.message}</b></div> }
        { movieInfo && <MovieInfo movieInfo={movieInfo} /> }
      </div>
    );
  }
}

export default App;
