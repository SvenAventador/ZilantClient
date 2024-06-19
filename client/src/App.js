import React from 'react';
import {useUser} from "./store/User";
import logo from './assets/img/logo.png'
import SiteNavigation from "./components/Routes";
import {useCart} from "./store/Cart";

const App = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    let {
        user,
        checkUser
    } = useUser()
    let {
        getOne
    } = useCart()

    React.useEffect(() => {
        const handleCheckUser = async () => {
            if (localStorage.getItem('token')) {
                await checkUser().then(async () => {
                    await getOne(user?.id);
                })
            }
            setIsLoading(false);
        }

        const timer = setTimeout(handleCheckUser, 2500)

        return () => clearTimeout(timer)
    }, [checkUser, getOne, user?.id]);

    if (isLoading) {
        return <div className="loader">
            <img src={logo}
                 width="150px"
                 height="200px"
                 alt="Logo"/>
        </div>
    }

    return (
        <SiteNavigation/>
    );
};

export default App;
