import { createGlobalStyle } from 'styled-components'

export const theme = {
    color: {
        dark1: '#404040',
        dark2: '#535353',
        dark3: '#777777',
        dark4: '#999999',
        dark5: '#BEBEBE',
        green: '#5D8160',
        red: '#9B3C3C'
    },
    navWidth:'55px',
    headerHeight:'67px',
    containerHeight:'42px'
};

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after{
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  body {
    margin:0;
    background-color: #404040;
  }
  svg{
    fill:#777777;
  }
`;
