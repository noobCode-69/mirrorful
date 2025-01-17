import { ArrowBackIcon, ArrowForwardIcon, RepeatIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { generateDefaultColorShades } from '@core/components/ColorPalette/utils'
import { TPlatform } from '@core/components/Layout'
import { TTokenGroup } from '@core/types'
import { useCallback, useEffect, useState } from 'react'
import tinycolor from 'tinycolor2'

import { getNumberOfStepsInOnboardingFlow } from '../constants'
import { generatePalette } from '../utils'

export function OtherColors({
  initialPalette,
  onUpdatePalette,
  onUpdatePage,
  primaryColor,
  primaryName,
  platform,
}: {
  initialPalette: TTokenGroup
  onUpdatePalette: (newPalette: TTokenGroup) => void
  onUpdatePage: (page: number) => void
  primaryColor: string
  primaryName: string
  platform: TPlatform
}) {
  const [palette, setPalette] = useState<TTokenGroup>(initialPalette)

  const shades = generateDefaultColorShades({ primary: primaryColor })

  const handleGeneratePalette = useCallback(() => {
    const alternativeColors = generatePalette(primaryColor, primaryName)

    setPalette(alternativeColors)
  }, [primaryColor, primaryName])

  useEffect(() => {
    if (Object.keys(palette).length === 0) {
      handleGeneratePalette()
    }
  }, [palette, handleGeneratePalette])

  return (
    <Box
      css={{ display: 'flex', height: '100%' }}
      flexDirection={{
        base: 'column',
        md: 'row',
      }}
      as="form"
    >
      <Box
        width={{
          base: '100%',
          md: '50%',
        }}
        css={{
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box css={{ paddingTop: '32px' }}>
          <Stack spacing={1} direction={'row'}>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              03
            </Text>
            <Text color="gray.500" fontWeight="bold" fontSize={18}>
              of
            </Text>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              {getNumberOfStepsInOnboardingFlow(platform)}
            </Text>
          </Stack>

          <Heading fontWeight="black" css={{ marginTop: '12px' }} fontSize={36}>
            {`Let's pick out the rest of your theme.`}
          </Heading>
          <Text
            css={{ marginTop: '32px' }}
            fontSize={20}
            color="gray.500"
            fontWeight="bold"
          >
            {`You can always fine-tune these later!`}
          </Text>
        </Box>
        <Box
          css={{ paddingBottom: '32px' }}
          position={{
            base: 'absolute',
            md: 'static',
          }}
          bottom={{
            base: '0px',
            md: 'unset',
          }}
        >
          <Button
            size="lg"
            onClick={() => {
              onUpdatePage(2)
            }}
            css={{ marginRight: '16px' }}
          >
            <ArrowBackIcon />
          </Button>
          <Button
            bgColor={shades['500']}
            color={tinycolor(primaryColor).isDark() ? 'white' : 'black'}
            _hover={{
              bgColor: shades['700'],
            }}
            _active={{
              bgColor: shades['800'],
            }}
            padding={'8px 36px'}
            size="lg"
            rightIcon={<ArrowForwardIcon />}
            onClick={(e) => {
              e.preventDefault()
              onUpdatePalette(palette)

              if (platform === 'web') {
                onUpdatePage(6)
              } else {
                onUpdatePage(4)
              }
            }}
            type="submit"
          >
            Next
          </Button>
        </Box>
      </Box>
      <Box
        width={{
          base: '100%',
          md: '60%',
        }}
        padding={{
          base: '0px',
          md: '64px 32px',
        }}
        marginLeft={{
          md: '10px',
        }}
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack spacing={4} width={{ base: '100%', md: 'auto' }}>
          <Box css={{ display: 'flex', alignItems: 'center' }}>
            <Box
              css={{ display: 'flex', flexDirection: 'column', width: '150px' }}
            >
              <Text fontSize={24} fontWeight="black">
                {primaryName}
              </Text>
              <Badge color={primaryColor} css={{ alignSelf: 'flex-start' }}>
                PRIMARY
              </Badge>
            </Box>
            <Box
              css={{
                height: '40px',
                width: '120px',
                backgroundColor: primaryColor,
                marginLeft: '16px',
                borderRadius: 8,
              }}
            />
          </Box>
          <hr />
          <Stack spacing={6}>
            {Object.keys(palette).map((colorName) => {
              const color = palette[colorName]

              return (
                <Box
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: '72px',
                  }}
                  key={colorName}
                >
                  <Box
                    css={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '150px',
                    }}
                  >
                    <Text fontSize={22} fontWeight="black">
                      {colorName}
                    </Text>
                  </Box>
                  <Box
                    css={{
                      height: '40px',
                      width: '120px',
                      backgroundColor: `${color.value}`,
                      marginLeft: '16px',
                      borderRadius: 8,
                    }}
                  />
                </Box>
              )
            })}
            <Button onClick={handleGeneratePalette} leftIcon={<RepeatIcon />}>
              Regenerate
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
