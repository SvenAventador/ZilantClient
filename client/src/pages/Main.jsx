import React from 'react';
import MainNews from "../components/user/main/MainNews";
import Calendar from "../components/user/main/Calendar";
import ChampionshipTable from "../components/user/main/ChampionshipTable";

const Main = () => {
    return (
        <div className="main">
            <div className="main__container">
                <MainNews/>
                <Calendar/>
                <ChampionshipTable/>
            </div>
        </div>
    );
};

export default Main;
