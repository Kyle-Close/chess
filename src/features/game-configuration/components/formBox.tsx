import { Box, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FormBoxProps {
  title: string,
  description?: string,
  step?: number,
  action?: ReactNode,
  children: ReactNode,
}

export function FormBox({ title, description, step, action, children }: FormBoxProps) {
  return (
    <Box as='section' p={{ base: 5, md: 6 }} borderRadius='2xl' bg='ink.900' border='1px solid' borderColor='border'>
      <Flex align='start' justify='space-between' gap={4} mb={5}>
        <Flex gap={3} align='start'>
          {step !== undefined && (
            <Flex className='tabular' w={6} h={6} mt='1px' flexShrink={0} align='center' justify='center' borderRadius='md' bg='gold.muted' color='gold.300' fontSize='xs' fontWeight='bold'>
              {step}
            </Flex>
          )}
          <Box>
            <Text fontWeight='semibold' fontSize='md'>{title}</Text>
            {description && <Text fontSize='sm' color='fg.muted' mt={0.5}>{description}</Text>}
          </Box>
        </Flex>
        {action}
      </Flex>
      {children}
    </Box>
  )
}
