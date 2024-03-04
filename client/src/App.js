import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import {useUser} from "./store/UserStore";
import logo from './image/logo.png'

const App = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    let {
        checkUser
    } = useUser()

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            setTimeout(() => {
                checkUser().finally(() => {
                    setIsLoading(false)
                })
            }, 2000)
        } else {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }, [checkUser])

    if (isLoading) {
        return <div style={{
            height: '100vh',
            width: '100%',
            background: '#1F3867',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <img src={logo}
                 width="150px"
                 height="200px"
                 alt="Logo"/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="container">
                <main className="main">
                    <AppRoutes/>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;
