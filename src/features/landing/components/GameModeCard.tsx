import { Button, Card, Icon } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react";

interface GameModeCardProps {
  icon: LucideIcon,
  title: string,
  description: string,
  extraDescription: string,
  buttonText: string,
  disableBtn: boolean,
  handleClick: () => void;
}

export function GameModeCard(props: GameModeCardProps) {
  const { icon: GameModeIcon } = props;
  return (
    <Card.Root bgColor='gray.800'>
      <Card.Body justifyContent='space-between' alignItems='center' gap={2}>
        <Icon>
          <GameModeIcon size={48} />
        </Icon>
        <Card.Title fontSize='2xl' >{props.title}</Card.Title>
        <Card.Description fontSize='lg' textAlign='center'>{props.description}</Card.Description>
        <Card.Description mt={4} textAlign='center'>
          {props.extraDescription}
        </Card.Description>
        <Button disabled={props.disableBtn} onClick={props.handleClick} mt={4} border='1px solid white' p={4}>{props.buttonText}</Button>
      </Card.Body>
    </Card.Root>

  )
}
