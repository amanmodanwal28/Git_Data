import { Box, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useSpring, animated } from 'react-spring'


const AnimatedCard = () => {
  const [expanded, setExpanded] = useState(false)

  const expandAnimation = useSpring({
    height: expanded ? '200px' : '100px',
  })

  return (
    <Box>
      <animated.div style={expandAnimation}>
        {/* Card content goes here */}
        <h1>ghgh</h1>
      </animated.div>
      <Button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Close' : 'Expand'}
      </Button>
    </Box>
  )
}
export default AnimatedCard