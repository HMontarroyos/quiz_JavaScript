import React from  'react';


import db from "../../db.json";
import QuizBackground from "../../src/Components/QuizBackground";
import QuizLogo from "../../src/Components/QuizLogo";
import QuizContainer from "../../src/Components/QuizContainer";
import Widget from "../../src/Components/Widget";
import Button from "../../src/Components/Button";
import  AlternativesForm from "../../src/Components/AlternativesForm";
import BackLinkArrow from '../../src/Components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        <h1>RESULTADOS</h1>
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <img
          alt="Finalizando"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            borderRadius: 10,
          }}
          src={"https://media0.giphy.com/media/5UqQOhnfQbg4IG0utP/giphy.gif"}/>
{/*         <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
        </ul> */}
      </Widget.Content>
    </Widget>
  );
}

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
    addResult,
  }) {
    const [selectedAlternative, setselectedAlternative] = React.useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;

    return (
      <Widget>
        <Widget.Header>
           <BackLinkArrow href="/" />
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
  
          <AlternativesForm
            onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              setIsQuestionSubmited(true);
              setTimeout(()=>{
                addResult(isCorrect);
                onSubmit();
                setIsQuestionSubmited(false);
                setselectedAlternative(undefined);
              },2000)
              
            }}
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative__${alternativeIndex}`;
              const alternativeStatus = isCorrect ? 'SUCCESS':'ERROR';
              const isSelected = selectedAlternative === alternativeIndex;
              
              return (
                <Widget.Topic
                  key={alternativeId}
                  as="label"
                  htmlFor={alternativeId}
                  data-selected={isSelected}
                  data-status={isQuestionSubmited && alternativeStatus}
                >
                  <input
                    //style={{ display: 'none' }}
                    id={alternativeId}
                    name={questionId}
                    onChange={()=> setselectedAlternative(alternativeIndex)}
                    type="radio"
                  />
                  {alternative}
                </Widget.Topic>
              );
            })}
  
            {/* <pre>
              {JSON.stringify(question, null, 4)}
            </pre> */}
            <Button type="submit" disabled={!hasAlternativeSelected}>
              Confirmar
            </Button>
{/*             {isQuestionSubmited && isCorrect && <p>Acertou</p>}
                {isQuestionSubmited && !isCorrect && <p>Errou</p>} */}
          </AlternativesForm>
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
    const [results, setResults] = React.useState([]);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    function addResult(result) {
      setResults([
        ...results,
        result,
      ]);
    }
  
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
              addResult={addResult}
            />
          )}
  
          {screenState === screenStates.LOADING && <LoadingWidget />}
  
          {screenState === screenStates.RESULT && <ResultWidget results={results} />}
        </QuizContainer>
      </QuizBackground>
    );
}


// TODO:  TRATAR UM IF SE ACERTOU TANTAS PERGUNTAS AMOSTRE UMA TELA SE NÃO AMOSTRE ESSA SE NÃO AMOSTRE OUTRA 
// TODO: AJUSTAR TRANSIÇÃO NO HEADER DAS PERGUNTAS 
// TODO: AJUSTAR BUTTONS AO ACERTAR PERGUNTA 
// TODO: NA TELA DE RESULTADOS CONCATENAR COM O NOME DIGITADO DO USUARIO

