import React from "react";

const CommentList = ({ comments }) => {
  return (
    <ul className="list-group list-group-flush">
      {comments.map(comment => {
        return (
          <li key={comment.id} className="list-group-item">
            {comment.snippet.topLevelComment.snippet.textOriginal}
            <br />
            {comment.replies !== undefined && (
              <>
                <button
                  className="btn btn-primary"
                  type="button"
                  data-toggle="collapse"
                  data-target={`#replies-${comment.id}`}
                >
                  Show replies
                </button>
                <div className="collapse" id={`replies-${comment.id}`}>
                  {comment.replies.comments.map(reply => {
                    return (
                      <div key={reply.id} className="card card-body">
                        {reply.snippet.textOriginal}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
