import { Flex, Icon, Text } from "@chakra-ui/react";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface PlayerBoxProps {
  isTurn: boolean
  materialDiff: number,
  startTime: number
}

export function PlayerBox({ isTurn, materialDiff, startTime }: PlayerBoxProps) {
  const [st, setSt] = useState(startTime);
  const border = isTurn ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.3)'
  const materialDiffColor = materialDiff < 0 ? 'red' : 'green'
  const materialDiffSymbol = materialDiff < 0 ? '' : '+'

  useEffect(() => {
    const id = setInterval(() => {
      if (isTurn)
        setSt(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [isTurn]);

  return (
    <Flex flexDir='column' gap={4} alignItems='start' border={border} alignSelf='start' p='4' borderRadius='lg' minWidth='12rem'>
      <Flex width='100%' justifyContent='space-between'>
        <Text fontSize='lg' fontWeight='semibold'>Hikaru</Text>
        {materialDiff != 0 && <Text fontSize='sm' fontWeight='semibold' color={materialDiffColor}>{`${materialDiffSymbol}${materialDiff.toString()}`}</Text>}
      </Flex>
      <Flex gap={4} alignItems='center'>
        <Icon>
          <Clock />
        </Icon>
        <Text fontSize='2xl' fontWeight='bold'>{convertSecondsToMinuteDisplay(st)}</Text>
      </Flex>
    </Flex>
  )
}

function convertSecondsToMinuteDisplay(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
