import { Box, Collapsible, Field, Flex, Input, Text } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FenFieldProps {
  registration: UseFormRegisterReturn,
  error?: string,
  defaultOpen?: boolean
}

export function FenField({ registration, error, defaultOpen }: FenFieldProps) {
  return (
    <Box as='section' borderRadius='2xl' bg='ink.900' border='1px solid' borderColor='border'>
      <Collapsible.Root defaultOpen={defaultOpen}>
        <Collapsible.Trigger asChild>
          <Flex as='button' w='full' align='center' justify='space-between' p={{ base: 5, md: 6 }} textAlign='left' cursor='pointer' css={{ '&[data-state=open] .chevron': { transform: 'rotate(180deg)' } }}>
            <Box>
              <Text fontWeight='semibold'>Custom starting position</Text>
              <Text fontSize='sm' color='fg.muted' mt={0.5}>Optional. Paste a FEN string to start from any position.</Text>
            </Box>
            <Box className='chevron' color='fg.muted' transition='transform 200ms'><ChevronDown size={18} /></Box>
          </Flex>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Box px={{ base: 5, md: 6 }} pb={{ base: 5, md: 6 }}>
            <Field.Root invalid={!!error}>
              <Field.Label srOnly>FEN</Field.Label>
              <Input
                className='tabular'
                fontSize='sm'
                h={11}
                px={3}
                bg='ink.850'
                borderColor='border.emphasized'
                colorPalette='gold'
                spellCheck={false}
                autoComplete='off'
                placeholder='rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
                {...registration}
              />
              {error
                ? <Field.ErrorText>{error}</Field.ErrorText>
                : <Field.HelperText color='fg.subtle'>The preview updates as you type.</Field.HelperText>}
            </Field.Root>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  )
}
