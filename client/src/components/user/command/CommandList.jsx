import React from 'react';
import {usePlayer} from "../../../store/Player";
import CommandItem from "./CommandItem";

const CommandList = () => {
    const { getAllPlayer } = usePlayer();
    const [allPlayers, setAllPlayers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getAllPlayer().then(({ players }) => {
            setAllPlayers(players);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        });
    }, [getAllPlayer]);

    return (
        <div className="players-list">
            {
                loading ? (
                    <h2>Загрузка игроков команды</h2>
                ) : allPlayers.length > 0 ? (
                    <div className="players-list__grid">
                        {
                            allPlayers.map((players) => (
                                <CommandItem key={players.id}
                                             players={players} />
                            ))
                        }
                    </div>
                ) : (
                    <h2>Новостей не найдено!</h2>
                )
            }
        </div>
    );
};

export default CommandList;