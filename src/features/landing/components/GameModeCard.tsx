import { Badge, Box, chakra, Flex, Heading, Text } from "@chakra-ui/react";
import { ArrowRight, Check, LucideIcon } from "lucide-react";

interface GameModeCardProps {
  icon: LucideIcon,
  title: string,
  description: string,
  features: string[],
  buttonText: string,
  disableBtn: boolean,
  handleClick: () => void;
  delayMs?: number
}

export function GameModeCard(props: GameModeCardProps) {
  const { icon: GameModeIcon, disableBtn } = props;

  return (
    <chakra.button
      type='button'
      onClick={props.handleClick}
      disabled={disableBtn}
      aria-disabled={disableBtn}
      className='rise-in'
      style={{ animationDelay: `${props.delayMs ?? 0}ms` }}
      position='relative'
      textAlign='left'
      display='flex'
      flexDirection='column'
      p={7}
      borderRadius='2xl'
      bg='ink.900'
      border='1px solid'
      borderColor='border'
      overflow='hidden'
      transition='transform 250ms cubic-bezier(0.2, 0.7, 0.2, 1), border-color 250ms, box-shadow 250ms'
      cursor={disableBtn ? 'not-allowed' : 'pointer'}
      opacity={disableBtn ? 0.55 : 1}
      _hover={disableBtn ? undefined : {
        transform: 'translateY(-4px)',
        borderColor: 'rgba(228, 183, 94, 0.45)',
        boxShadow: '0 24px 60px -24px rgba(228, 183, 94, 0.25)',
      }}
      _focusVisible={{ outline: '2px solid', outlineColor: 'gold.400', outlineOffset: '3px' }}
      css={{ '&:hover .mode-cta': { color: 'var(--chakra-colors-gold-300)' }, '&:hover .mode-arrow': { transform: 'translateX(4px)' } }}
    >
      <Flex justify='space-between' align='start' w='full'>
        <Flex w={12} h={12} align='center' justify='center' borderRadius='xl' bg='gold.muted' color='gold.300' border='1px solid' borderColor='gold.emphasized'>
          <GameModeIcon size={24} strokeWidth={1.75} />
        </Flex>
        {disableBtn && <Badge variant='outline' colorPalette='gray' borderRadius='full' px={2.5}>Coming soon</Badge>}
      </Flex>

      <Heading as='h3' mt={6} fontFamily='heading' fontSize='2xl' fontWeight='600'>{props.title}</Heading>
      <Text mt={2} color='fg.muted'>{props.description}</Text>

      <Flex as='ul' direction='column' gap={2} mt={5} mb={7}>
        {props.features.map((feature) => (
          <Flex as='li' key={feature} align='center' gap={2.5} fontSize='sm' color='fg'>
            <Box color='gold.400' flexShrink={0}><Check size={15} strokeWidth={2.5} /></Box>
            {feature}
          </Flex>
        ))}
      </Flex>

      <Flex className='mode-cta' mt='auto' align='center' gap={2} fontWeight='semibold' fontSize='sm' transition='color 200ms'>
        {props.buttonText}
        {!disableBtn && <Box className='mode-arrow' transition='transform 200ms'><ArrowRight size={16} /></Box>}
      </Flex>
    </chakra.button>
  )
}
