import React from 'react';
import styled from "styled-components";
import {useRouter} from 'next/router';
import {motion} from 'framer-motion';

import db from "../db.json";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import QuizBackground from "../src/components/QuizBackground";
import QuizLogo from "../src/components/QuizLogo";
import QuizContainer from "../src/components/QuizContainer";
import Widget from "../src/components/Widget";
import Input from "../src/components/Input";
import Button from "../src/components/Button";
import Link from '../src/components/Link';



export default function Home() {
    const router = useRouter();
    const [name, setName] = React.useState('');

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />
                <Widget
                    as={motion.section}
                    transition={{delay:0, duration:0.5}}
                    variants={{
                        show:{opacity:1, y:'0'},
                        hidden:{opacity: 0, y:'100%'},
                    }}
                    initial="hidden"
                    animate="show"
                >
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
                <Widget
                    as={motion.section}
                    transition={{delay:0.5, duration:0.5}}
                    variants={{
                        show:{opacity:1},
                        hidden:{opacity: 0},
                        }}
                    initial="hidden"
                    animate="show"
                >
                    <Widget.Header>
                        <h1>Demais Quizes de Front-end da Comunidade</h1>
                    </Widget.Header>
                    <Widget.Content>
                        <p>
                            Desbrave o Aluraverso e Adquira mais conhecimentos
                            com os Quizes das Principais Tecnologias de
                            Front-end
                        </p>
                        <ul>
                            {db.external.map((linkExterno)=>{
                                const [projectName, githubUser] = linkExterno
                                .replace(/\//g,'')
                                .replace('https:','')
                                .replace('.vercel.app','')
                                .split('.');

                                return(
                                    <li key={linkExterno}>
                                        <Widget.Topic as={Link}href={`/quiz/${projectName}__${githubUser}`}>
                                            {`${githubUser}/${projectName}`}
                                        </Widget.Topic>
                                    </li>
                                );
                            })}
                        </ul>
                    </Widget.Content>
                </Widget>
                <Footer
                    as={motion.footer}
                    transition={{delay:0.5, duration:0.5}}
                    variants={{
                        show:{opacity:1},
                        hidden:{opacity: 0},
                        }}
                    initial="hidden"
                    animate="show"
                />
            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/HMontarroyos" />
        </QuizBackground>
    );
}
