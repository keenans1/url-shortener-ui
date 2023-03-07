import React, { Component } from 'react';
import './App.css';

import getUrls from '../../apiCalls';

import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      errorMessage: ''
    }
  }

  componentDidMount() {
    getUrls()
      .then(data => this.setState({ urls: data.urls }))
      .catch(err => this.setState({ errorMessage: err.message }))
  }

  addUrl = (newUrl) => {

    fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      body: JSON.stringify(newUrl),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong')
        }
        return response.json()
      })
      .then(json => this.setState({ urls: [...this.state.urls, json] }))
      .catch(err => this.setState({ errorMessage: err.message }))
  }


  render() {
    if (this.state.errorMessage) {
      return (
        <main className="App">
          <header>
            <h1>URL Shortener</h1>
            <UrlForm addUrl={this.addUrl} />
          </header>
          <h2>{this.state.errorMessage}. Issue with server. Please try again</h2>
        </main>
      )
    } else {
      return (
        <main className="App">
          <header>
            <h1>URL Shortener</h1>
            <UrlForm addUrl={this.addUrl} />
          </header>
          <UrlContainer urls={this.state.urls} />
        </main>
      )
    }
  }
}

export default App;
