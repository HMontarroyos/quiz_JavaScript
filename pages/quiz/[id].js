import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/Components/screens/Quiz';

export default function QuizDaGaleraPage ({dbExterno}){
    return(
        <ThemeProvider theme={dbExterno.theme}>
            <QuizScreen 
                externalQuestions={dbExterno.questions}
                externalBg={dbExterno.bg}
            />
        </ThemeProvider>
    );
}

export async function getServerSideProps(context){
    const [projectName, githubUser] = context.query.id.split('__')
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
        .then((resp)=>{
            if(resp.ok){
                return resp.json();
            }
            throw new Error('Falha ao pegar os dados');
        })
        .then((resp)=>{
            return resp
        })
        .catch((err)=>{
            console.log(err);
        });
    
    
    return{
        props:{
            dbExterno,
        },
    };
}