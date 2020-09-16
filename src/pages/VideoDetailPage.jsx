import React from "react";
import VideoPlayer from "../components/VideoPlayer";
import { Component } from "react";

import { connect } from "react-redux";
import { fetchComments, clearComments } from "../redux/actions/videoActions";
import CommentList from "../components/CommentList";
import SearchBar from "../components/SearchBar";

class VideoDetailPage extends Component {
  constructor(props) {
    super(props);
    this.videoId = this.props.match.params.videoId;
  }

  componentDidMount() {
    // Clear the previous comments
    this.props.clearComments();
    // Render the new comments
    this.props.fetchComments(this.videoId);
  }

  handleClick = () => {
    this.props.fetchComments(this.videoId, this.props.comments.nextPageToken);
  };

  render() {
    return (
      <>
        <SearchBar />
        <div>
          <VideoPlayer videoId={this.videoId} />
          {this.props.comments && (
            <>
              <CommentList comments={this.props.comments.items} />
              <button
                onClick={this.handleClick}
                type="button"
                className="btn btn-danger"
              >
                Show more comments
              </button>
            </>
          )}
        </div>
      </>
    );
  }
}

const stateMapper = storeState => {
  return {
    comments: storeState.videoState.comments
  };
};

const dispatchMapper = { fetchComments, clearComments };

export default connect(stateMapper, dispatchMapper)(VideoDetailPage);
