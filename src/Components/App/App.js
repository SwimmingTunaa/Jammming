import './App.css';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar'
import React from 'react';


class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      searchResults: [{ name: 'name', artist: 'artist', album: 'album', id: 1 }, { name: 'name', artist: 'artist', album: 'album', id: 2 }, { name: 'name', artist: 'artist', album: 'album', id: 3 }],

      playlistName: 'RnB',

      playlistTracks: [{ name: 'dog', artist: 'cat', album: 'dogNcat', id: 4 }, { name: 'dog', artist: 'cat', album: 'dogNcat', id: 5 }, { name: 'dog', artist: 'cat', album: 'dogNcat', id: 6 }]
    }
    
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">

          <SearchBar />
          <div className="App-playlist">
  
            <SearchResults searchResults={this.state.searchResults}/>
 
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
