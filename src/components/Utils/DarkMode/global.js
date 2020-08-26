import { createGlobalStyle } from 'styled-components';

//기본 스타일 지정
export const GlobalStyles = createGlobalStyle`
  .app, .app__stats, body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
  }
  a, h1 {
    color: ${({ theme }) => theme.text};
  }
`;