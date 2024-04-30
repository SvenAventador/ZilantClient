import React from 'react';
import {useUser} from "./stores/User";
import logo from './assets/img/logo.png'
import SiteNavigation from "./components/Routes";

const App = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const {checkUser} = useUser()

    React.useEffect(() => {
        if (localStorage.getItem('token'))
            setTimeout(() => {
                checkUser().finally(() => {
                    setIsLoading(false)
                })
            }, 2500)
        else
            setTimeout(() => {
                setIsLoading(false)
            }, 2500)
    }, [checkUser])

    if (isLoading) {
        return <div className="loader">
            <img src={logo}
                 width="150px"
                 height="200px"
                 alt="Logo"/>
        </div>
    }

    return (
        <SiteNavigation />
    );
};

export default App;
