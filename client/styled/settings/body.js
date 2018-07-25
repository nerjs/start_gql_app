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

  body {
    margin: 0;
  }
`


const bodyStyled = {}



export default bodyStyled