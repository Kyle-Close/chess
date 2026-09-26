import { Box, chakra, Grid, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface Choice {
  value: string,
  label: string,
  sublabel?: string,
  icon?: ReactNode,
}

interface ChoiceCardsProps {
  label: string,
  options: Choice[],
  value: string,
  onChange: (value: string) => void,
  columns?: number,
}

export function ChoiceCards({ label, options, value, onChange, columns = options.length }: ChoiceCardsProps) {
  return (
    <Grid role='radiogroup' aria-label={label} templateColumns={{ base: `repeat(${Math.min(columns, 2)}, 1fr)`, sm: `repeat(${columns}, 1fr)` }} gap={3}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <chakra.button
            key={option.value}
            type='button'
            role='radio'
            aria-checked={active}
            onClick={() => onChange(option.value)}
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={2}
            py={4}
            px={3}
            borderRadius='xl'
            border='1px solid'
            borderColor={active ? 'gold.400' : 'border'}
            bg={active ? 'gold.subtle' : 'ink.850'}
            boxShadow={active ? '0 0 0 3px rgba(228, 183, 94, 0.14)' : 'none'}
            transition='all 160ms'
            _hover={{ borderColor: active ? 'gold.400' : 'border.emphasized', bg: active ? 'gold.subtle' : 'ink.800' }}
            _focusVisible={{ outline: '2px solid', outlineColor: 'gold.400', outlineOffset: '2px' }}
          >
            {option.icon && <Box color={active ? 'gold.300' : 'fg.muted'} h='36px' display='flex' alignItems='center'>{option.icon}</Box>}
            <Text fontWeight='semibold' fontSize='sm' >{option.label}</Text>
            {option.sublabel && <Text fontSize='xs' color='fg.muted' mt='-6px'>{option.sublabel}</Text>}
          </chakra.button>
        );
      })}
    </Grid>
  )
}
