import styled from "styled-components";
import {useRouter} from 'next/router';


import db from "../db.json";
import Footer from "../src/Components/Footer";
import GitHubCorner from "../src/Components/GitHubCorner";
import QuizBackground from "../src/Components/QuizBackground";
import QuizLogo from "../src/Components/QuizLogo";
import QuizContainer from "../src/Components/QuizContainer";
import Widget from "../src/Components/Widget";
import Input from "../src/Components/Input";
import Button from "../src/Components/Button";



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
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            router.push(`/quiz?name=${name}`);
                            }}
                        >
                            <Input
                                name="nome"
                                onChange={(event) =>{
                                setName(event.target.value);
                                }}
                                placeholder="Digite seu Nome"
                                required
                                value={name}
                            />
                            <Button type="submit" disabled={name.length === 0}>
                                {`Vamos Jogar 🎮`}
                            </Button>
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
