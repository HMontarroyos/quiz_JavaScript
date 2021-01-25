import styled from 'styled-components';
import Head from 'next/head'
import db from '../db.json';

import Footer from '../src/Components/Footer';
import GitHubCorner from '../src/Components/GitHubCorner';
import QuizBackground from '../src/Components/QuizBackground';
import QuizLogo from '../src/Components/QuizLogo';
import Widget from '../src/Components/Widget';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <div>
        <Head>
          <title>Quiz Mestre Jedi em JavaScript</title>
          <meta property="og:title" content="My page title" key="title" />
          <meta property="og:image" content={db.bg}/>
          <meta property="og:image:type" content={db.bg}/>
          <meta property="og:image:width" content="800"/>
          <meta property="og:image:height" content="600"/> 
        </Head>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Header>
              <h1>Demais Quizes de Front-end da Comunidade</h1>
            </Widget.Header>
            <Widget.Content>
              <p>Desbrave a Galáxia e Adquira mais conhecimentos com os Quizes das Principais Tecnologias de Front-end</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/HMontarroyos" />
      </div>
    </QuizBackground>
  );
}