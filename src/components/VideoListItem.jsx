import React from "react";
import { withRouter } from "react-router-dom";

const VideoListItem = ({ video, history }) => {
  const handleClick = () => {
    const videoId = typeof video.id === "string" ? video.id : video.id.videoId;
    history.push(`/videos/${videoId}`);
  };

  return (
    <div className="col mb-4">
      <div
        onClick={handleClick}
        className="card h-100"
        style={{ cursor: "pointer" }}
      >
        <img
          loading="lazy"
          src={video.snippet.thumbnails.high.url}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{video.snippet.title}</h5>
          <p
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
              overflow: "hidden"
            }}
            className="card-text"
          >
            {video.snippet.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(VideoListItem);
