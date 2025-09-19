import React from "react";
import { useRouter } from "next/router";

import db from "../../db.json";
import QuizBackground from "../../src/Components/QuizBackground";
import QuizLogo from "../../src/Components/QuizLogo";
import QuizContainer from "../../src/Components/QuizContainer";
import Widget from "../../src/Components/Widget";
import Button from "../../src/Components/Button";
import AlternativesForm from "../../src/Components/AlternativesForm";
import BackLinkArrow from "../../src/Components/BackLinkArrow";
import {
  quiz01,
  quiz02,
  quiz03,
  quiz04,
  quiz05,
  quiz06,
  quiz07,
  quiz08,
  quiz09,
  quiz10,
  quiz11,
  quiz12,
} from "../../src/Assets/img/quiz";
import {
  champion,
  correct,
  error,
  loading,
  lose,
} from "../../src/Assets/img";

const totalQuestions = db.questions.length;

function ResultWidget({ results }) {
  const router = useRouter();
  const { name } = router.query;

  /*   function FraseResult(){
    if(results.filter((x) => x).length >= (totalQuestions / 2)){
       return 'Parabéns, você conhece bem de JavaScript mais ainda pode ir além'
    }else if((results.filter((x) => x).length = (totalQuestions))){
      return  'Parabéns, você com certeza conhece do assunto. Gabaritou tudo isso ae hehe esse é o caminho ;) '
    }else {
      return 'Ops ... parece que você ainda tem um pouco de dificuldade hein ? mais não desanime continue tentando' 
    }
   }
 */
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h1>RESULTADO</h1>
      </Widget.Header>

      <Widget.Content>
        <p>
          {`${name} Você acertou ${results.filter((x) => x).length} ${
            results.filter((x) => x).length > 1 ? "perguntas" : "pergunta"
          } de ${totalQuestions}.`}
        </p>
        <img
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: 10,
          }}
          src={
            results.filter((x) => x).length >= totalQuestions / 2
              ? champion.src
              : lose.src
          }
          alt="resultados"
        />
        <p>
          {results.filter((x) => x).length >= totalQuestions / 2
            ? "Parabéns, você conhece bem de JavaScript mais ainda pode ir além "
            : "Ops ... parece que você ainda tem um pouco de dificuldade hein ? mais não desanime continue tentando "}
        </p>

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

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <h1>Carregando...</h1>
      </Widget.Header>

      <Widget.Content>
        <img
          alt="Carregando"
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
          }}
          src={
            loading.src
          }
        />
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
  const [selectedAlternative, setselectedAlternative] =
    React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  const quizImages = {
    1: quiz01,
    2: quiz02,
    3: quiz03,
    4: quiz04,
    5: quiz05,
    6: quiz06,
    7: quiz07,
    8: quiz08,
    9: quiz09,
    10: quiz10,
    11: quiz11,
    12: quiz12,
  };

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
        }}
        src={quizImages[question.id].src}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setselectedAlternative(undefined);
            }, 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? "SUCCESS" : "ERROR";
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
                  style={{ display: "none" }}
                  id={alternativeId}
                  name={questionId}
                  onClick={() => setselectedAlternative(alternativeIndex)}
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
          {isQuestionSubmited && isCorrect && (
            <img
              alt="OptionCorrect"
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
              }}
              src={correct.src}
            />
          )}
          {isQuestionSubmited && !isCorrect && (
            <img
              alt="OptionFailed"
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
              }}
              src={error.src}
            />
          )}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOADING",
  RESULT: "RESULT",
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([...results, result]);
  }

  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    //event.preventDefault();
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

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}

// TODO: AJUSTAR BUTTONS AO ACERTAR PERGUNTA
