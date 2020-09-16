import React from "react";
import NavBar from "./components/NavBar";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SearchQueryPage from "./pages/SearchQueryPage";
import VideoDetailPage from "./pages/VideoDetailPage";
import Form from './components/FormValidation';
import Playlist from './components/Playlist';
import {ContextProvider} from './contextExample';
/**
 * / => trending videos
 * /search/:query => Search results
 * /profile => Profile data
 * /videos/:id => Video Detail page
 */

function App() {
  return (
    <ContextProvider>
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/search/:query" component={SearchQueryPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/videos/:videoId" component={VideoDetailPage} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/playlist" component={Playlist} />
      </Switch>
    </div>
    </ContextProvider>
  );
}

export default App;
