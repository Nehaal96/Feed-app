import React from 'react';
import {View, TouchableOpacity, Text, TextInput, StyleSheet , Dimensions} from 'react-native';
import ModalCard from '@components/Modal'
import {connect} from 'react-redux';
const {width} = Dimensions.get('window');
import { addData } from '@redux/Home/actions/home-view.actions';

class QuestionView extends React.Component {
     
  state={
    newQstn: '',
    isQstnAvailable: true
  }

  tipsContainer(){
    return(
     <View style={styles.tipContainer}>
        <Text style={styles.tipText}>Tips on getting good answers quickly</Text>
        <Text style={styles.tipRegText}>
        Make sure your question has not been asked already. 
        Keep your question short and to the point. 
        Double-check grammar and spelling.</Text>
     </View>
    )
  }

  addQuestion(){
    const { questionsList } = this.props;
    const { newQstn } = this.state;
    if(newQstn !== ''){
        if(questionsList && questionsList.length > 0){
            let tempQuestionList = JSON.parse(JSON.stringify(questionsList));
            tempQuestionList.push({
                questionId: Number(tempQuestionList[tempQuestionList.length - 1].questionId) + 1,
                question: newQstn,
                isAnswerAvailable : false, 
                answersList : [], 
                isAnswerButtonAvailable : true
            })
            console.log('check after push', tempQuestionList, questionsList);
            this.props.addData(tempQuestionList);
            this.setState({newQstn: '', isQstnAvailable: true});
            this.refs.questionAddedModal.show();
        } 
    } else{
        this.setState({isQstnAvailable: false})
    }
   
  }


  render(){
    const { isQstnAvailable } = this.state;
    console.log('Qstn :', this.props)
    return(
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <View style={styles.container}>
          {this.tipsContainer()}
          { !isQstnAvailable &&
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Text style={{fontSize: 14, fontWeight: '600', color:"#80002a"}}>Please add your question</Text>
            </View>
          }
          <View style={styles.questionContainer}>
            <TextInput
            style={styles.qstnInput}
            multiline
            numberOfLines={6}
            placeholder="Start your question with 'What', 'How', 'Why', etc." 
            placeholderTextColor="#737373"
            onChangeText={text => [this.setState({newQstn: text}), !isQstnAvailable ? this.setState({isQstnAvailable : true}) : '']}/>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', margin: 6}}>
                <TouchableOpacity style={[styles.cancelBtn]} onPress={() => this.setState({isQstnAvailable: true})}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitBtn} onPress={() => this.addQuestion()}>
                    <Text style={styles.subText}>Add Question</Text>
                </TouchableOpacity>
            </View>        
         </View>
         </View>
         <ModalCard
          ref="questionAddedModal"
          buttons={[{title: 'Cancel'}, {title: 'View Questions'}]}
          onPress={(item, index) => [index == 1 && this.props.tabSelection(0)]}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 30,
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
             Alert
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
            }}>
            Question has been added successfully!
          </Text>
        </ModalCard>
        </View> 
    )
  }
}

const mapStateToProps = state => ({
  questionsList: state.homeViewReducer.homeView.questionsList
});

const mapDispatchToProps = dispatch => ({
    addData: data => dispatch(addData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);


const styles = StyleSheet.create({
    container: {
        width: width - 35, 
        borderRadius: 12,
        minHeight: 350, 
        flexDirection: 'column', 
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ffe6ee',
        marginVertical: 10,
        elevation: 3,
        flexGrow: 1,
        padding: '3%',
        alignItems: 'center'
    },
    questionContainer: {
        width: width - 80, 
        borderRadius: 12,
        minHeight: 160, 
        flexDirection: 'column', 
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ffe6ee',
        marginVertical: 10,
        padding: '3%',
    },
    qstnInput: {
        justifyContent: 'flex-start',
        textAlignVertical:'top', 
        paddingTop: 0, 
        paddingBottom:0
    },
    tipContainer: {
        width: width - 80, 
        borderRadius: 12,
        flexDirection: 'column', 
        backgroundColor: '#ffe6ee',
        borderWidth: 1,
        borderColor: '#ffe6ee',
        marginVertical: 10,
        padding: '3%',
    },
    tipText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#80002a'
    },
    tipRegText:{
        fontSize: 13,
        color: '#80002a',
        marginVertical: 10
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
    },
    submitBtn: {
        marginVertical: 10, 
        width: 104, 
        height: 40, 
        borderRadius: 10,
        backgroundColor: '#80002a',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 4,
    },
    cancelBtn: {
        marginVertical: 10, 
        width: 70, 
        height: 40, 
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: '#80002a',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 4,
        right: 10
    },
  });