import React from "react";
import { Component } from "react";

import { connect } from "react-redux";
import { setSearchQuery, clearVideos } from "../redux/actions/videoActions";
import { withRouter } from "react-router-dom";


class SearchBar extends Component {
  state = {
    query: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchQuery = this.state.query;
    this.props.setSearchQuery(searchQuery);
    this.props.clearVideos();
    // Redirect to /search/:query
    this.props.history.push(`/search/${searchQuery}`);
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <form
        className="input-group mb-3 container my-3"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name="query"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </div>
      </form>
    );
  }
}

const dispatchMapper = { setSearchQuery, clearVideos };

export default connect(null, dispatchMapper)(withRouter(SearchBar));
