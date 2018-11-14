import React, { Component } from 'react';
import PropTypes from 'prop-types'

class MovieForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      movieId: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    return this.props.handleSubmit(this.state)
  }

  render() {
    return (
      <form id="movieForm" method="get" onSubmit={this.handleSubmit}>
        <label htmlFor="movieId">Enter movie id: </label>
        <input 
          type="text" 
          id="movieId" 
          name="movieId"
          onChange={this.handleChange}
          value={this.state.movieId} 
        />
        <input type="submit" value="Get Movie Data" />
      </form>
    )
  }
}

/* this is for validation to make sure components get what they need */
MovieForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default MovieForm