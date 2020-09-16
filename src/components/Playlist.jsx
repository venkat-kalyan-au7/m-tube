import React from 'react';
import {connect} from 'react-redux';
import {createPlaylist, fetchPlaylists} from '../redux/actions/videoActions';
import {ContextConsumer} from '../contextExample';
import CurrentPlaylist from './currentPlaylist';
import WithLoading from './WithLoader';

const WithLoader = WithLoading(CurrentPlaylist);

class PlaylistComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name:'',
            description:'',
            playlist:[],
            pending_playlist:[],
            loading: true,
            condition:true
        };
        //Important
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchPlaylists({});
    }

    onChange = (event) => {
        let name = event.target.name;
        
        this.setState({
            [name]:event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        var parameters = {
            title:this.state.name,
            description: this.state.description
        }
        this.setState({
            condition:false
        });
       this.props.createPlaylist({parameters});
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps:',nextProps);
        if(nextProps.loading === false) {
            this.setState({
                loading: false
            });
        }
        this.setState({
            playlist: nextProps.playlist,
            pending_playlist: nextProps.pending_playlist
        });
    }

    render() {
        //this.state.name_arr.filter()
        console.log('this.state',this.state);
        return(
                <div className="playlist">
                <div className="playlist-creation-section">
                    <h2>Create a new playlist</h2>
                    <hr/>
                    {/* <WithLoading render = {(loaderState) => {
                        return console.log('data hoc',loaderState)
                        }} /> */}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>
                                Playlist Name:
                                <input name="name" onChange={this.onChange} className="form-control" type="text" />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Playlist Description:
                                <textarea name="description" cols="30" rows="5" onChange={this.onChange} className="form-control" type="text"></textarea>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-info">Create Playlist</button>
                    </form>
                </div>
                {this.state.condition ? <p>I'm conditionally rendered</p> : <p>I'm the second condition</p>}
                <WithLoader isloading={this.state.loading} playlist={this.state.playlist} pending={this.state.pending_playlist} />
            </div>
        )
    }
}
const stateMapper = storeState => {
    console.log('stateMapper Playlist:',storeState);
    return {
        playlist: storeState.playlistState.playlist,
        pending_playlist: storeState.playlistState.pending_playlist,
        loading: storeState.loaderState.loader
    }
}
const dispatchMapper = {createPlaylist, fetchPlaylists};

let CreatePlaylist = connect(stateMapper, dispatchMapper)(PlaylistComponent)

export default CreatePlaylist;



{/* <CurrentPlaylist 
                playlist={this.state.playlist} 
                pending={this.state.pending_playlist} /> */}
                {/* <div className="playlist-view-section">
                    <h2>Current Playlists</h2>
                    <hr/>
                    <ul>
                        Created:
                        {this.state.playlist.length>0 && this.state.playlist.map((play) => {
                            return (
                            <li>{play.snippet.title}</li>
                            )
                        })}
                    </ul>
                    <ul>
                        Pending:
                        {this.state.pending_playlist.length>0 && this.state.pending_playlist.map((play) => {
                            return (
                            <li>{play.snippet.title}</li>
                            )
                        })}
                    </ul>
                </div> */}