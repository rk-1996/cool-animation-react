import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import CardList from './repoList/RepoList';
import FileList from './fileList/FileList'
import AppComponent from './App'
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

interface AppProps { }
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props:any) {
    super(props);
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={AppComponent} />
          <Route path="/repo-lists" component={CardList} />
          <Route path="/files-list/:user" component={FileList} />
        </Switch>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));
