import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
const {width} = Dimensions.get('window');
import { connect } from 'react-redux';
import { addData } from '@redux/Home/actions/home-view.actions';
import moment from 'moment'

class FeedCard extends React.Component {
     
  state={
    newAnswer: '',
    expandQuestion: false,
    expandAnswerSection: false,
    isAnswerValid: true
  }

  toggleAnswerSection(){
    this.setState({expandAnswerSection: !this.state.expandAnswerSection, isAnswerValid:  true})
  }



  submitAnswer(){
    const { questionIndex, questionsList } = this.props;
    const { newAnswer } = this.state;
    if(newAnswer !== ''){
        if(questionsList && questionsList.length > 0){
            let tempQuestionList = JSON.parse(JSON.stringify(questionsList));
            tempQuestionList[questionIndex].answersList.push({
                answeredTimeStamp: `Answered ${moment().format('DD MMM, YYYY LT')}`,
                answer: newAnswer
            })
            tempQuestionList[questionIndex].isAnswerAvailable = true;
            this.props.addData(tempQuestionList);
            this.setState({expandAnswerSection: false, newAnswer: '', isAnswerValid: true})
        }
    }else{
        this.setState({isAnswerValid: false})
    }
   
  }

  answerCard(){
    return(
        <View style={styles.answerContainer}>
            <TextInput
            style={styles.answerInput}
            multiline
            numberOfLines={4}
            placeholder="Write your answer" 
            placeholderTextColor="#003f5c"
            onChangeText={text => [this.setState({newAnswer: text}), !this.state.isAnswerValid ? this.setState({isAnswerValid: true}) : '']}/>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', margin: 2}}>
                <TouchableOpacity style={styles.submitBtn} onPress={() => this.submitAnswer()}>
                    <Text style={styles.subText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.cancelBtn, {left: 10}]} onPress={() => this.toggleAnswerSection()}>
                    <Text style={styles.cancelText}>cancel</Text>
                </TouchableOpacity>
            </View>        
        </View>
    )
  }

 

  render(){
    const { expandQuestion , expandAnswerSection, isAnswerValid} = this.state;
    const { question, isAnswerAvailable, answersList, isAnswerButtonAvailable } = this.props;
    return (
        <TouchableOpacity style={styles.container} onPress={() => this.setState({expandQuestion:  !expandQuestion})} activeOpacity={0.9}>
            <Text style={styles.qstnStyle}> &bull; Question added</Text>
            <Text style={styles.title}>{question && question.length > 200 ? (expandQuestion ? question : `${question.slice(0, 200)}...`) : question}</Text>
            { !isAnswerAvailable &&
            <View style={styles.noAnsContainer}>
                <Text style={styles.noAnsText}>No answer yet</Text>
            </View>
            }
            { answersList && answersList.length > 0 &&
             <View style={styles.answerListContainer}>
                { answersList.map((item, index) => {
                    return(
                    <View style={styles.answerList}>
                        <Text style={styles.answTimeStyle}>&bull; {item.answeredTimeStamp}</Text>
                        <Text style={styles.answStyle}>{item.answer && item.answer.length > 200 ? `${item.answer.slice(0, 200)}...` : item.answer}</Text>
                    </View>
                    )
                  })
                }
             </View>
            }
            { isAnswerButtonAvailable && !expandAnswerSection &&
            <TouchableOpacity style={styles.ansBtn} onPress={() => this.toggleAnswerSection()}>
                <Text style={styles.btnText}>Answer</Text>
            </TouchableOpacity>
            }
            { !isAnswerValid && 
            <View style={styles.addAnsContainer}>
                <Text style={styles.addAns}>Please add your answer</Text>
            </View>
            }
            { expandAnswerSection && this.answerCard()}
        </TouchableOpacity> 
    );
  }
}

const mapStateToProps = state => ({
    questionsList: state.homeViewReducer.homeView.questionsList
});

const mapDispatchToProps = dispatch => ({
    addData: data => dispatch(addData(data))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(FeedCard);
    

const styles = StyleSheet.create({
    addAns: {
        fontSize: 14, 
        fontWeight: '600', 
        color:"#80002a"
    },
    addAnsContainer: {
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        left: 10
    },
    answerList: {
        flexDirection: 'column'
    },
    answerListContainer: {
        marginVertical: 5, 
        marginLeft: 4
    },
    container: {
        width: width - 35, 
        borderRadius: 12,
        minHeight:100, 
        flexDirection: 'column', 
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ffe6ee',
        marginVertical: 10,
        elevation: 3,
        flexDirection: 'column',
        flexGrow: 1,
        padding: '3%'
    },
    answerContainer: {
        width: width - 60, 
        borderRadius: 12,
        minHeight: 50, 
        flexDirection: 'column', 
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ffe6ee',
        marginVertical: 10,
        elevation: 3,
        flexGrow: 1,
        padding: '3%',
    },
    answerInput: {
        justifyContent: 'flex-start',
        textAlignVertical:'top', 
        paddingTop: 0, 
        paddingBottom:0
    },
    qstnStyle: {
        fontSize: 12, 
        fontWeight: 'normal', 
        color: '#b3b3b3',
        lineHeight: 16
    },
    answStyle: {
        fontSize: 12, 
        fontWeight: 'normal', 
        lineHeight: 16,
        paddingTop: '0.5%',
        paddingBottom: '2%',
        marginLeft: 6,
    },
    answTimeStyle: {
        fontSize: 12, 
        fontWeight: 'normal', 
        color: '#666666',
        lineHeight: 16,
        paddingVertical: '0.5%',
    },
    title : {
        fontSize: 15, 
        fontWeight: 'bold', 
        paddingLeft: 5
    },
    noAnsContainer: {
        paddingVertical: '1.5%'
    },
    noAnsText: {
        fontSize: 14, 
        fontWeight: 'bold', 
        paddingLeft: 5, 
        color: '#a6a6a6'
    },
    ansBtn: {
        marginVertical: 10, 
        width: 70, 
        height: 40, 
        borderRadius: 12,
        backgroundColor: '#80002a',
        elevation: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4
    },
    submitBtn: {
        marginVertical: 12, 
        width: 70, 
        height: 40, 
        borderRadius: 10,
        backgroundColor: '#80002a',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
    },
    cancelBtn: {
        marginVertical: 12, 
        width: 70, 
        height: 40, 
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: '#80002a',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
    },
    btnText: {
        fontSize: 15, 
        fontWeight: 'bold', 
        color: 'white'
    },
    subText: {
        fontSize: 13, 
        fontWeight: 'bold', 
        color: 'white'
    },
    cancelText: {
        fontSize: 13, 
        fontWeight: 'bold', 
        color: '#80002a'
    }
  });