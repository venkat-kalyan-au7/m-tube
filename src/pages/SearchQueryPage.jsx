import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import VideoGrid from "../components/VideoGrid";

import { connect } from "react-redux";
import { fetchSearchResults, clearVideos } from "../redux/actions/videoActions";

// Get the route parameter (query)
// Load the query into the function (fetchSearchresults)
// Render the videos

class SearchQueryPage extends Component {
  constructor(props) {
    super(props);
    this.searchQuery = this.props.match.params.query;
  }

  componentDidMount() {
    if (this.props.videos === null) {
      this.props.fetchSearchResults({
        searchQuery: this.searchQuery
      });
    }
  }

  componentDidUpdate(prevProps) {
    const prevSearchQuery = prevProps.match.params.query;
    const currentSearchQuery = this.searchQuery;
    if (prevSearchQuery !== currentSearchQuery) {
      // Fetch the new search.
      this.props.clearVideos();
      this.props.fetchSearchResults({ searchQuery: currentSearchQuery });
    }
  }

  render() {
    return (
      <>
        <SearchBar />
        {this.props.videos ? (
          <VideoGrid
            videos={this.props.videos}
            fetchVideos={this.props.fetchSearchResults}
            searchQuery={this.searchQuery}
          />
        ) : (
          <h1>Loading videos</h1>
        )}
      </>
    );
  }
}

const stateMapper = storeState => {
  return {
    videos: storeState.videoState.videos
  };
};

const dispatchMapper = { fetchSearchResults, clearVideos: clearVideos };

export default connect(stateMapper, dispatchMapper)(SearchQueryPage);
