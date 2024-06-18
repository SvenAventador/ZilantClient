import React from 'react';
import {usePlayer} from "../../../store/Player";
import CommandItem from "./CommandItem";
import {getAllAttack, getAllDefender, getAllGoalkeeper} from "../../../http/player";

const CommandList = () => {
    const {getAllPlayer} = usePlayer();
    const [loading, setLoading] = React.useState(true);

    const [allGoalkeepers, setAllGoalkeepers] = React.useState([]);
    const [allDefenders, setAllDefenders] = React.useState([]);
    const [allAttackers, setAllAttackers] = React.useState([]);

    React.useEffect(() => {
        getAllGoalkeeper().then(({goalkeepers}) => {
            setAllGoalkeepers(goalkeepers);
            setLoading(false);
        });
        getAllDefender().then(({defenders}) => {
            setAllDefenders(defenders);
            setLoading(false);
        });
        getAllAttack().then(({attack}) => {
            setAllAttackers(attack);
            setLoading(false);
        });
    }, [getAllPlayer]);

    return (
        <div className="players-list">
            {loading ? (
                <h2>Загрузка игроков команды</h2>
            ) : (
                <div>
                    <section>
                        <h2>Вратари</h2>
                        <div className="players-list__grid"
                             style={{
                                 margin: "1rem auto",
                             }}>
                            {allGoalkeepers.length > 0 ? (
                                allGoalkeepers.map((player) => (
                                    <CommandItem key={player.id} player={player}/>
                                ))
                            ) : (
                                <p>На данный момент в клубе нет вратарей!</p>
                            )}
                        </div>
                    </section>
                    <section>
                        <h2>Защитники</h2>
                        <div className="players-list__grid"
                             style={{
                                 margin: "1rem auto",
                             }}>
                            {allDefenders.length > 0 ? (
                                allDefenders.map((player) => (
                                    <CommandItem key={player.id} player={player}/>
                                ))
                            ) : (
                                <p>На данный момент в клубе нет защитников!</p>
                            )}
                        </div>
                    </section>
                    <section>
                        <h2>Нападающие</h2>
                        <div className="players-list__grid"
                             style={{
                                 margin: "1rem auto",
                             }}>
                            {allAttackers.length > 0 ? (
                                allAttackers.map((player) => (
                                    <CommandItem key={player.id} player={player}/>
                                ))
                            ) : (
                                <p>На данный момент в клубе нет нападающих!</p>
                            )}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default CommandList;
