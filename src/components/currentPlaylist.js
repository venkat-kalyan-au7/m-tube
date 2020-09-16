import React from 'react';

const CurrentPlaylist = (props) => {
    const {playlist, pending} = props;
    console.log('playlist data:',playlist);
    if(!playlist) return null;

    return(
        <div className="playlist-view-section">
            <h2>Current Playlists</h2>
            <hr/>
            <ul>
                Created:
                {playlist.length>0 && playlist.map((play) => {
                    return (
                    <li>{play.snippet.title}</li>
                    )
                })}
            </ul>
            <ul>
                Pending:
                {pending.length>0 && pending.map((play) => {
                    return (
                    <li>{play.snippet.title}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CurrentPlaylist;