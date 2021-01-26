import styled from "styled-components";
import {useRouter} from 'next/router';


import db from "../db.json";
import Footer from "../src/Components/Footer";
import GitHubCorner from "../src/Components/GitHubCorner";
import QuizBackground from "../src/Components/QuizBackground";
import QuizLogo from "../src/Components/QuizLogo";
import Widget from "../src/Components/Widget";

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
    const router = useRouter();
    const [name, setName] = React.useState('');

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />
                <Widget>
                    <Widget.Header>
                        <h1>{db.title}</h1>
                    </Widget.Header>
                    <Widget.Content>
                        <p>{db.description}</p>
                        <form  orm onSubmit={(event) => {
                            event.preventDefault();
                            router.push(`/quiz?name=${name}`);
                            }}
                        >
                            <input
                                onChange={(event) =>{
                                setName(event.target.value);
                                }}
                                placeholder="Digite seu Nome"
                                required
                            />
                            <button type="submit" disabled={name.length === 0}>
                                Jogar {name} 
                            </button>
                        </form>
                    </Widget.Content>
                </Widget>
                <Widget>
                    <Widget.Header>
                        <h1>Demais Quizes de Front-end da Comunidade</h1>
                    </Widget.Header>
                    <Widget.Content>
                        <p>
                            Desbrave a Galáxia e Adquira mais conhecimentos
                            com os Quizes das Principais Tecnologias de
                            Front-end
                        </p>
                    </Widget.Content>
                </Widget>
                <Footer />
            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/HMontarroyos" />
        </QuizBackground>
    );
}
