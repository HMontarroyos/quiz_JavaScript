import React from  'react';


import db from "../db.json";
import QuizBackground from "../src/Components/QuizBackground";
import QuizLogo from "../src/Components/QuizLogo";
import QuizContainer from "../src/Components/QuizContainer";
import Widget from "../src/Components/Widget";
import Button from "../src/Components/Button";


function LoadingWidget(){
    return(
        <Widget>
        <Widget.Header>
          <h1>Carregando...</h1>
        </Widget.Header>
  
        <Widget.Content>
        <img
          alt="Carregando"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={"https://i.pinimg.com/originals/e9/29/1e/e9291eaddacd460280a34a151dcc5cc4.gif"}/>
          
        </Widget.Content>
      </Widget>
    );
  }
  
  function QuestionWidget({
    question,
    questionIndex,
    totalQuestions,
    onSubmit,
  }) {
    const questionId = `question__${questionIndex}`;
    return (
      <Widget>
        <Widget.Header>
          {/* <BackLinkArrow href="/" /> */}
          <h3>
            {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
          </h3>
        </Widget.Header>
  
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={question.image}
        />
        <Widget.Content>
          <h2>
            {question.title}
          </h2>
          <p>
            {question.description}
          </p>
  
          <form
            onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              onSubmit();
            }}
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative__${alternativeIndex}`;
              return (
                <Widget.Topic
                  as="label"
                  htmlFor={alternativeId}
                >
                  <input
                    // onClick={(e)=> 
                    //     style={{...background-color: {${({ theme }) => `${theme.colors.primary}40`}} 
                    // }
                    // style={{ display: 'none' }}
                    id={alternativeId}
                    name={questionId}
                    type="radio"
                  />
                  {alternative}
                </Widget.Topic>
              );
            })}
  
            {/* <pre>
              {JSON.stringify(question, null, 4)}
            </pre> */}
            <Button type="submit">
              Confirmar
            </Button>
          </form>
        </Widget.Content>
      </Widget>
    );
  }
  
  const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
  };
  export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];
  
    React.useEffect(() => {
      // fetch() ...
      setTimeout(() => {
        setScreenState(screenStates.QUIZ);
      }, 1 * 1000);
    }, []);
  
    function handleSubmitQuiz() {
      const nextQuestion = questionIndex + 1;
      if (nextQuestion < totalQuestions) {
        setCurrentQuestion(nextQuestion);
      } else {
        setScreenState(screenStates.RESULT);
      }
    }
  
    return (
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmitQuiz}
            />
          )}
  
          {screenState === screenStates.LOADING && <LoadingWidget />}
  
          {screenState === screenStates.RESULT && LoadingWidget()}
        </QuizContainer>
      </QuizBackground>
    );
}

