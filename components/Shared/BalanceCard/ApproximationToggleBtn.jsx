import styled from 'styled-components'
import { Label } from '../Typography'

export default styled(Label).attrs(props => ({
  m: 0,
  color: props.clicked ? '#1E90FF' : 'core.darkgray',
  onClick: props.onClick
}))`
  &:hover {
    cursor: pointer;
    color: #4682B4;
    text-decoration: underline;
  }
`
