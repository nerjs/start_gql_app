import { injectGlobal } from 'styled-components';

import { clearBox } from '../helpers'


injectGlobal`
  @font-face {
    font-family: 'Operator Mono';
    src: url('../fonts/Operator-Mono.ttf');
  }

  * {
  	${clearBox}
  }


  button::-moz-focus-inner,
  input[type="reset"]::-moz-focus-inner,
  input[type="button"]::-moz-focus-inner,
  input[type="submit"]::-moz-focus-inner,
  input[type="submit"]::-moz-focus-inner,
  input[type="file"] > input[type="button"]::-moz-focus-inner {
    border: none;
  }

  body {
    margin: 0;
  }
`


const bodyStyled = {}



export default bodyStyled