import { useEffect, useState } from "react";
import io from 'socket.io-client';
import { uniqueNamesGenerator, Config, starWars } from 'unique-names-generator';

const socket = io(import.meta.env.VITE_BE_SERVER);

const config: Config = {
  dictionaries: [starWars]
}

export type PlayerData = {
  id: string,
  player: string,
  score: number
}

type ScoreUpdatedData = {
  id: string,
  score: number
}


function useMultiplePlayers(initialScore: number): [ PlayerData[], (score: number) => void ] {
  const [ playerData, setPlayerData ] = useState<PlayerData[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('joined', { id: socket.id, player: uniqueNamesGenerator(config), score: initialScore });
    });

    socket.on('disconnect', () => {});

    socket.on('player-list', (data: PlayerData[]) => {
      setPlayerData(data.filter(({ id }) => id !== socket.id));
    });

    socket.on('score-updated', ({ id, score }: ScoreUpdatedData) => {
      setPlayerData(d => d.map(player => player.id === id ? { ...player, score } : player));
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('player-list');
      socket.off('score-updated');
    };
  }, []);

  const updateScore = (score: number) => {
    socket.emit('score-updated', { id: socket.id, score });
  };

  return [
    playerData,
    updateScore
  ];
}

export default useMultiplePlayers;
