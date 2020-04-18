import constants from '../constants';

const initialState = {
  questionsList:  [
    {
       questionId: 11,
       question: 'Which is the best web hosting in India? Who is your hero? If you could live anywhere, where would it be? What is your biggest fear? What is your favorite family vacation? What would you change about yourself if you could? What really makes you angry? What motivates you to work hard?',
       isAnswerAvailable : true, 
       answersList : [{
           answeredTimeStamp: 'Answered 18 Apr,20 1:12 AM',
           answer: 'For those of you who don’t know, web hosting is an online service that enables a person or a company to publish a site or web application on the Internet.'
       },
       {
          answeredTimeStamp: 'Answered 18 Apr,20 1:12 AM',
           answer: 'For those of you who don’t know, web hosting is an online service that enables a person or a company to publish a site or web application on the Internet.For those of you who don’t know, web hosting is an online service that enables a person or a company to publish a site or web application on the Internet.For those of you who don’t know, web hosting is an online service that enables a person or a company to publish a site or web application on the Internet.For those of you who don’t know, web hosting is an online service that enables a person or a company to publish a site or web application on the Internet.'       }], 
       isAnswerButtonAvailable : true
    },
    {
      questionId: 12,
       question: 'What’s something that will always be in fashion, no matter how much time passes?',
       isAnswerAvailable : false, 
       answersList : [], 
       isAnswerButtonAvailable : true
    },
    {
       questionId: 13,
       question: 'What was the last photo you took?',
       isAnswerAvailable : true, 
        answersList : [{
          answeredTimeStamp: 'Answered 18 Apr,20 1:12 AM',
           answer: 'For those of you who don’t know, web hosting is an online service that enables a person or a company to publish a site or web application on the Internet.'
       }],
       isAnswerButtonAvailable : true
    },
  ]
};

const homeViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_DATA:
      return {
        ...state,
      };
    case constants.ADD_DATA_SUCCESS:
      return {
        ...state,
        questionsList: action.data
      };
    case constants.ADD_DATA_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default homeViewReducer;
