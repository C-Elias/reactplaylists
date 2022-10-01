import React, { Component } from 'react'; 
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import TrackList from '../TrackList/TrackList';
import Track from '../Track/Track';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{name: 'name1', artist: 'artists1', album: 'album1', id: 1}, 
                      {name: 'name2', artist: 'artists2', album: 'album2', id: 2},
                      {name: 'name3', artist: 'artists3', album: 'album3', id: 3}], 
      playlistName:'My Playlist',
      playlistTracks:[{name: 'playlistName1', artist: 'playlistArtists1', album: 'playlistAlbum1', id: 4}, 
                      {name: 'playlistName2', artist: 'playlistArtists2', album: 'playlistAlbum2', id: 5},
                      {name: 'playlistName3', artist: 'playlistArtists3', album: 'playlistAlbum3', id: 6}]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks; 
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return; 
    } 
      tracks.push(track); 
      this.setState({playlistTracks: tracks})
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks; 
      tracks = tracks.filter(currentTrack => currentTrack !== track.id);
      
      this.setState({playlistTracks: tracks})
  }

  render () {
    return (
      <div>
        <h1>Playlist<span class="highlight">Maker</span></h1>
        
        <div class="App">
          <SearchBar />
          <div class="App-playlist">
          <SearchResults searchResults={this.state.searchResults} 
                         onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} 
                    playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack} />
        </div>
      </div>
    </div>
    )
  }
}

export default App;
