import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTrendingVideos } from "../redux/actions/videoActions";
import SearchBar from "../components/SearchBar";
import VideoGrid from "../components/VideoGrid";

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchTrendingVideos({});
  }

  render() {
    return (
      <>
        <SearchBar />
        {this.props.videos ? (
          <VideoGrid
            videos={this.props.videos}
            fetchVideos={this.props.fetchTrendingVideos}
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

const dispatchMapper = { fetchTrendingVideos };

export default connect(stateMapper, dispatchMapper)(HomePage);
