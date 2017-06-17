import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const api_key = "AIzaSyCo2sEVz-Aac6m4xNFbKmQU81Zms7SurAc";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
    };
    this.videoSearch('surfboards');
  }

  videoSearch(term){
    YTSearch({key: api_key, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render(){
    return (
      <div>
        <SearchBar onSearchInputChange={term=>this.videoSearch(term)}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('.container'));
