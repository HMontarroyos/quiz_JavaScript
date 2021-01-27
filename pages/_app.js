import { createGlobalStyle, ThemeProvider } from "styled-components";
import Head from "next/head";
import db from "../db.json";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  /* New styles */
  display: flex;
  flex-direction: column;
  font-family: 'Lato', sans-serif;
  // Deixa branco no começo
  color: ${({ theme }) => theme.colors.contrastText};
  //font-family: 'Economica', sans-serif;
  //font-family: 'Oswald', sans-serif;
  font-family: 'Play', sans-serif !important;
}
html, body {
  min-height: 100vh;
}
#__next {
  flex: 1;
  display: flex;
  flex-direction: column;
}
`;

const theme = db.theme;

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Quiz Mestre Jedi em JavaScript</title>
                <meta property="og:title"content="Quiz Mestre Jedi em JavaScript"key="title"/>
                <meta property="og:image"content="https://miro.medium.com/max/2732/1*LyZcwuLWv2FArOumCxobpA.png"/>
                <meta property="og:image:type" content="imagem/png" />
                <meta property="og:image:width" content="800" />
                <meta property="og:image:height" content="600" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Economica:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Play&display=swap" rel="stylesheet"/>
            </Head>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}
