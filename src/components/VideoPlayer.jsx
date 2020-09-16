import React from "react";

const VideoPlayer = ({ videoId }) => {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        title="Video Player"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
