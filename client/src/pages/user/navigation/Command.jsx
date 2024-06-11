import React from 'react';
import CommandList from "../../../components/user/command/CommandList";
import PersonalList from "../../../components/user/personal/PersonalList";

const Command = () => {
    return (
        <div className="players">
            <div className="players__container">
                <h1 style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 'bolder',
                    fontSize: '30pt',
                    color: '#162746'
                }}>
                    Игроки команды
                </h1>
                <CommandList/>
                <h1 style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 'bolder',
                    fontSize: '30pt',
                    color: '#162746'
                }}>
                    Руководство
                </h1>
                <PersonalList />
            </div>
        </div>
    );
};

export default Command;
