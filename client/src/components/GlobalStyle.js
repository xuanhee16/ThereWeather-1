import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box; 
}

body { 
  font-family: 'IBM Plex Sans KR', sans-serif;
  height: 100%;
  }
`

export default GlobalStyle
