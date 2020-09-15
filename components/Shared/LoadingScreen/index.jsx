import Box from '../Box'
import Loading from '../LoaderGlyph'
import { Label } from '../Typography'

export default props => (
  <Box
    display='flex'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    {...props}
  >
    <Loading width={3} height={3} />
    <Label mt={3}>请稍后...</Label>
  </Box>
)
