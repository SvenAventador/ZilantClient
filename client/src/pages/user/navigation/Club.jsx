import React from 'react';
import cup from '../../../assets/img/cup.jpg'
import {getAll} from "../../../http/history";

const Club = () => {
    const [history, setHistory] = React.useState([])
    React.useEffect(() => {
        getAll().then((data) => {
            setHistory(data)
        })
    }, [])

    return (
        <div style={{
            maxWidth: "1430px",
            padding: "0 40px",
            margin: "0 auto",
            fontFamily: "'Arial', sans-serif",
            lineHeight: "1.6",
        }}>
            <img src={cup}
                 alt="Club Trophy"
                 style={{
                     width: "100%",
                     marginTop: '1rem',
                     borderRadius: '8px',
                     boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                 }}/>

            {
                history.map((history) => (
                    history.history_chapters.length > 0 && (
                        <div key={history.id}
                             style={{
                                 padding: '20px',
                                 marginBottom: '1rem',
                                 background: '#f9f9f9',
                                 borderRadius: '8px',
                                 boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                             }}>
                            <h2 style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: '1.8rem',
                                margin: '0 0 20px',
                                whiteSpace: 'pre-line',
                                wordBreak: "break-word"
                            }}>
                                {history.historyTitle}
                            </h2>
                            {
                                history.history_chapters.map((chapter) => (
                                    <p key={chapter.id}
                                       style={{
                                           textIndent: '20px',
                                           marginBottom: '10px',
                                           whiteSpace: 'pre-line',
                                           wordBreak: "break-word"
                                    }}>
                                        {chapter.historyChapter}
                                    </p>
                                ))
                            }
                        </div>
                    )
                ))
            }
        </div>
    );
};

export default Club;