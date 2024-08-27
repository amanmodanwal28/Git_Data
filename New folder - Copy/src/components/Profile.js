import React from 'react'
import { useMediaQuery } from '@chakra-ui/media-query'
import { Box, Flex, Heading, Text, Link } from '@chakra-ui/layout'
import {Icon} from '@chakra-ui/icon'
import { DiCodeigniter, DiAndroid, DiWebplatform } from 'react-icons/di'

import { SiHackerrank, SiVisualstudiocode } from 'react-icons/si'
import { Image } from '@chakra-ui/react'

function Profile() {
  const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)')

  return (
    <>
      <Flex
        direction={isNotSmallerScreen ? 'row' : 'column'}
        w="100%"
        maxWidth={{ base: '100vh', md: '130vh', lg: '130vh', xl: '130vh' }}
      >
        <Box alignSelf="center" px="32" py="16">
          <Heading
            bgGradient="linear(to-r, green.400, blue.500, purple.600)"
            bgClip="text"
            fontWeight="extrabold"
            size="4xl"
          >
            1.5+
          </Heading>
          <Text fontSize="2xl" color="gray.400">
            years of focused coding, endless possibilities - my portfolio of
            algorithmic accomplishments and growth.
          </Text>
        </Box>
      </Flex>

      <Flex
        direction={isNotSmallerScreen ? 'row' : 'column'}
        w="100%"
        maxWidth={{ base: '100vh', md: '130vh', lg: '130vh', xl: '130vh' }}
      >
        <Box alignSelf="center" px="32" py="16">
          <Heading
            bgGradient="linear(to-r, green.400, blue.500, yellow.600)"
            bgClip="text"
            fontWeight="extrabold"
            size="4xl"
          >
            100+ DSA <Icon as={SiVisualstudiocode}></Icon>
          </Heading>
          <Text fontSize="2xl" color="gray.400">
            problems solved and still hungry for more - my portfolio of
            algorithmic conquests.
            <br />
            <Text display={'flex'} alignItems={'center'} gap="10px">
              <Icon color={'green.500'} as={SiHackerrank}></Icon>
              <Link
                fontSize={'18px'}
                _hover={{ color: 'teal' }}
                href="https://www.hackerrank.com/profile/itisaman28"
              >
                HackerRank
              </Link>
            </Text>
          </Text>
        </Box>
      </Flex>
    </>
  )
}

export default Profile
