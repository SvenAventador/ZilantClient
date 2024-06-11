import React from 'react';
import {useMatch} from "../../../store/Match";
import Modal from "../../modal/Modal";
import {format} from "date-fns";
import {ru} from "date-fns/locale";

const Calendar = () => {
    const [matches, setMatches] = React.useState([]);
    const {getAllMatch} = useMatch();

    React.useEffect(() => {
        getAllMatch().then(({matches}) => {
            setMatches(matches);
        });
    }, [getAllMatch]);

    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [modalActive, setModalActive] = React.useState(false);
    const [selectedMatch, setSelectedMatch] = React.useState(null);

    const handlePrevDay = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() - 1);
            return newDate;
        });
    };

    const handleNextDay = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() + 1);
            return newDate;
        });
    };

    const handleMatchClick = (match) => {
        setSelectedMatch(match);
        setModalActive(true);
    };

    const filterMatchesByDate = (matches, date) => {
        return matches.filter(match => {
            const matchDate = new Date(match.matchDate);
            return matchDate.toDateString() === date.toDateString();
        });
    };

    const isMatchInPast = (matchDate) => {
        return new Date(matchDate) < new Date();
    };

    const formattedDate = currentDate.toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="calendar" style={{
            marginTop: '2rem'
        }}>
            <h1 style={{
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 'bolder',
                fontSize: '25pt',
                color: '#162746'
            }}>
                Расписание матчей
            </h1>
            <div className="calendar-header">
                <button onClick={handlePrevDay}>&lt;</button>
                <h2>{formattedDate}</h2>
                <button onClick={handleNextDay}>&gt;</button>
            </div>
            <div className="matches-container">
                {[...Array(5)].map((_, index) => {
                    const date = new Date(currentDate);
                    date.setDate(currentDate.getDate() + index);

                    const matchesOfDay = filterMatchesByDate(matches, date);
                    const formattedDay = date.toLocaleDateString('ru-RU', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric'
                    });

                    const isToday = date.toDateString() === (new Date()).toDateString();

                    return (
                        <div key={index}
                             className={`matches-of-day${isToday ? ' today' : ''}`}
                             style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 flexDirection: 'column',
                             }}>
                            <p className="day-label">
                                {formattedDay}
                            </p>
                            {
                                matchesOfDay.length > 0 ? (
                                    matchesOfDay.map(match => (
                                        <div key={match.id}
                                             className="match"
                                             style={{
                                                 display: 'flex',
                                                 alignItems: 'center',
                                                 justifyContent: 'center',
                                                 flexFlow: 'column',
                                             }}
                                             onClick={() => handleMatchClick(match)}>
                                            <img src={process.env.REACT_APP_API_PATH + match.hockey_club.clubImage}
                                                 alt="club"
                                                 style={{
                                                     width: '150px',
                                                     height: '150px',
                                                 }}/>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-match">Нет матчей</p>
                                )}
                        </div>
                    );
                })}
            </div>

            {selectedMatch && (
                <Modal active={modalActive} setActive={setModalActive}>
                    <div style={{
                        display: "flex",
                        alignItems: 'center',
                        flexFlow: 'column',
                    }}>
                        <p style={{
                            marginBottom: '.5rem'
                        }}>Дата матча: {format(new Date(selectedMatch.matchDate), 'PPP', {locale: ru})}</p>
                        <p style={{
                            marginBottom: '.5rem'
                        }}>Время матча: {format(new Date(selectedMatch.matchDate), 'p', {locale: ru})}</p>
                        <p style={{
                            marginBottom: '.5rem'
                        }}>Соперник: {selectedMatch.hockey_club.clubName}</p>
                        <img src={process.env.REACT_APP_API_PATH + selectedMatch.hockey_club.clubImage}
                             alt="club"
                             style={{
                                 width: '150px',
                                 height: '150px',
                             }}/>
                        {isMatchInPast(selectedMatch.matchDate) && (
                            <p className="match-score" style={{
                                marginTop: '.5rem'
                            }}>Счет: {selectedMatch.gameScore}</p>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Calendar;