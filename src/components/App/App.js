import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    getUrls()
      .then(data => this.setState({ urls: data.urls }))
  }

  addUrl = (newUrl) => {

    fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      body: JSON.stringify(newUrl),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => this.setState({ urls: [...this.state.urls, json] }))
      .catch(err => console.log('error', err))
  }


  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl} />
        </header>

        <UrlContainer urls={this.state.urls} />
      </main>
    );
  }
}

export default App;
