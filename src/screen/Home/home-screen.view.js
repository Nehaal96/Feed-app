import React from 'react';
import {  View } from 'react-native';
import TabBar from '@components/TabBar'
import {connect} from 'react-redux';
import FeedView from './feed-screen.view'
import QuestionView from './question-view.view'
import ProfileView from './profile-screen.view'

class HomeView extends React.Component {
     
  state={
    labels: [
        {title: 'Feed', key: 0},
        {title: 'Ask a Question', key: 1},
        {title: 'Profile', key: 2}
      ],
    selectedTab: 0
  }

  screenPanel(){
    const {selectedTab} = this.state;
    if(selectedTab === 0){
      return <FeedView/>
    }else if(selectedTab === 1){
      return <QuestionView tabSelection={(key) => this.tabSelection(key)}/>
    }else{
      return <ProfileView/>
    }
  }

  tabSelection = (key) => {
    console.log('in home screen update', key)
    this.setState({ selectedTab: key });
  }

  
  render(){
    const { labels, selectedTab} = this.state;
    console.log("Home view")
    return (
      <View style={{flex: 1, backgroundColor: 'white', }}>
        <TabBar
            labels={labels}
            value={selectedTab}
            onChange={key => {
                this.setState({ selectedTab: key });
            }}
        />
        { this.screenPanel() }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  questionsList: state.homeViewReducer.homeView.questionsList
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);


