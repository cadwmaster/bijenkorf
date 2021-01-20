import React, { Component } from 'react';

import Search from './components/search';
import { getSearch } from './helpers/api-manager';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      suggestions: []
    };
  }

  render() {
    return (
      <div className="app">
        <Search onChange={this.handleSeachText} minLength="3" suggestions={this.state.suggestions} />
      </div>
    );
  }

  handleSeachText = async (value) => {
    this.setState({ suggestions: [] });

    const fetchSuggestions = await getSearch(value);
    this.setState({
      suggestions: fetchSuggestions
    });
  };
}

export default App;
