import React, { Component } from 'react';
import './App.css';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';
import {debounce} from 'lodash';
const API_KEY = 'AIzaSyAqATbr65c9EON9JW6nSf5yEiHK-mtpdPg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch("anime");
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term }, videos => {
      this.setState({
        videos,
        selectedVideo: videos[0]
      });
      console.log(this.state);
    });
  }

  render() {
    const videoSearch = debounce(term => {
      this.videoSearch(term);
    }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

export default App;
