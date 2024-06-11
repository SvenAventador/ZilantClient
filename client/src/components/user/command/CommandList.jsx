import React from 'react';
import {usePlayer} from "../../../store/Player";
import CommandItem from "./CommandItem";
import {getAllAttack, getAllDefender, getAllGoalkeeper} from "../../../http/player";

const CommandList = () => {
    const {getAllPlayer} = usePlayer();
    const [allPlayers, setAllPlayers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const [allGoalkeeoper, setAllGoalkeeoper] = React.useState([]);
    const [allDefender, setAllDefender] = React.useState([]);
    const [allAttachment, setAllAttachment] = React.useState([]);

    React.useEffect(() => {
        getAllGoalkeeper().then(({goalkeepers}) => {
            setAllGoalkeeoper(goalkeepers);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        });
        getAllDefender().then(({defenders}) => {
            setAllDefender(defenders);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        });
        getAllAttack().then(({attack}) => {
            setAllAttachment(attack);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        });
    }, [getAllPlayer]);

    return (
        <div className="players-list">
            {loading ? (
                <h2>Загрузка игроков команды</h2>
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <>
                    <h2 style={{
                        marginBottom: '1rem'
                    }}>Вратари</h2>
                    {allGoalkeeoper.length > 0 ? (
                        <div className="players-list__grid" style={{
                            marginBottom: '1rem'
                        }}>
                            {allGoalkeeoper.map((player) => (
                                <CommandItem key={player.id} player={player}/>
                            ))}
                        </div>
                    ) : (
                        <p style={{
                            marginBottom: '1rem'
                        }}>На данный момент в клубе нет вратарей!</p>
                    )}
                    </>
                    <>
                    <h2 style={{
                        marginBottom: '1rem'
                    }}>Защитники</h2>
                    {allDefender.length > 0 ? (
                        <div className="players-list__grid" style={{
                            marginBottom: '1rem'
                        }}>
                            {allDefender.map((player) => (
                                <CommandItem key={player.id} player={player}/>
                            ))}
                        </div>
                    ) : (
                        <p style={{
                            marginBottom: '1rem'
                        }}>На данный момент в клубе нет защитников!</p>
                    )}
                    </>
                    <>
                    <h2 style={{
                        marginBottom: '1rem'
                    }}>Нападающие</h2>
                    {allAttachment.length > 0 ? (
                        <div className="players-list__grid" style={{
                            marginBottom: '1rem'
                        }}>
                            {allAttachment.map((player) => (
                                <CommandItem key={player.id} player={player}/>
                            ))}
                        </div>
                    ) : (
                        <p style={{
                            marginBottom: '1rem'
                        }}>На данный момент в клубе нет нападающих!</p>
                    )}
                    </>
                </div>
            )}
        </div>
    );
};

export default CommandList;