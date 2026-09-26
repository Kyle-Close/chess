export function usePlayers() {
  const getRandomName = () => {
    return names[Math.floor(Math.random() * names.length)];
  }

  /** Two different names */
  const getRandomNames = (): [string, string] => {
    const first = getRandomName();
    let second = getRandomName();
    while (second === first) second = getRandomName();
    return [first, second];
  }

  return {
    getRandomName,
    getRandomNames
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
