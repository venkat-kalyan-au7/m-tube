import React from "react";
import VideoListItem from "./VideoListItem";

// type => trending || search
const VideoGrid = ({ videos, fetchVideos, searchQuery }) => {
  return (
    <>
      <div
        style={{ margin: "20px 10px" }}
        className="card-deck row row-cols-1 row-cols-md-3 row-cols-lg-4"
      >
        {videos.items.map(video => (
          <VideoListItem video={video} key={video.etag} />
        ))}
      </div>
      {videos.prevPageToken !== undefined ? (
        <button
          onClick={() => fetchVideos({ pageToken: videos.prevPageToken })}
          type="button"
          className="btn btn-primary"
        >
          Prev Page
        </button>
      ) : null}
      {videos.nextPageToken !== undefined ? (
        <button
          onClick={() =>
            fetchVideos({
              pageToken: videos.nextPageToken,
              searchQuery: searchQuery ? searchQuery : ""
            })
          }
          type="button"
          className="btn btn-success"
        >
          Next Page
        </button>
      ) : null}
    </>
  );
};

export default VideoGrid;
