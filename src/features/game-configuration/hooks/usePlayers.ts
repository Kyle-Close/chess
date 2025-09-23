import { useForm } from "react-hook-form";

export type PlayerFormInputs = {
  player1: string,
  player2: string
}

export function usePlayers() {
  const playerForm = useForm<PlayerFormInputs>();

  const getRandomName = () => {
    return names[Math.floor(Math.random() * names.length)];
  }

  return {
    playerForm,
    getRandomName
  }
}

const names = [
  "Carlsen",
  "Kasparov",
  "Fischer",
  "Karpov",
  "Anand",
  "Botvinnik",
  "Alekhine",
  "Capablanca",
  "Tal",
  "Lasker",
  "Spassky",
  "Kramnik",
  "Petrosian",
  "Smyslov",
  "Steinitz"
]
