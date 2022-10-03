import React, { Component } from 'react'; 
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import TrackList from '../TrackList/TrackList';
import Track from '../Track/Track';
import Spotify  from '../../util/Spotify'; 


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [], 
      playlistName:'My Playlist',
      playlistTracks:[]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if(!tracks.find(trackIndex => trackIndex.id === track.id)) {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    let newTracks = tracks.filter(trackIndex => trackIndex.id !== track.id);
    this.setState({playlistTracks: newTracks});
  }
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    let tracks = this.state.playlistTracks;
    if(tracks.length && this.state.playlistName) {
      let trackURIs = tracks.map(trackIndex => trackIndex.uri);
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
        document.getElementById('Playlist-name').value = this.state.playlistName;
      }); 
    }
  }

  search(term){
    Spotify.search(term).then(results => {
      this.setState({searchResults: results});  
    });
  }

  render () {
    return (
      <div>
        <h1>Playlist<span class="highlight">Maker</span></h1>
        
        <div class="App">
          <SearchBar onSearch={this.search}/>
          <div class="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} 
                    playlistTracks={this.state.playlistTracks} 
                    onRemove={this.removeTrack} 
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist}/>
        </div>
      </div>
    </div>
    )
  }
}

export default App;
