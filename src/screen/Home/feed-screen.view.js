import React from 'react';
import {View, ScrollView, FlatList, StyleSheet } from 'react-native';
import FeedCard from '@components/FeedCard'
import {connect} from 'react-redux';

class FeedView extends React.Component {
     
  state={
    labels: [
        {title: 'Feed', key: 0},
        {title: 'Ask a Question', key: 1},
        {title: 'Profile', key: 2}
      ],
    selectedTab: 0
  }

  renderFeedCard = ({item, index}) =>{
    return(
      <FeedCard
        questionIndex={index}
        question={item.question}
        isAnswerAvailable={item.isAnswerAvailable}
        answersList={item.answersList}
        isAnswerButtonAvailable={item.isAnswerButtonAvailable}
      />
    )
  }

  render(){
    const { questionsList } = this.props;
    return(
      <ScrollView>
        <View style={styles.container}>
          { questionsList && questionsList.length > 0 &&
            <FlatList 
            data={questionsList} 
            renderItem={this.renderFeedCard} 
            extraData={questionsList} 
            keyExtractor={(item, index) => `index-${item.questionId}-${index}`} />
          }
        </View> 
      </ScrollView> 
    )
  }
}

const mapStateToProps = state => ({
  questionsList: state.homeViewReducer.homeView.questionsList
});

const mapDispatchToProps = dispatch => ({
});


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);


