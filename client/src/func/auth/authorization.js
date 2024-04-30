import { useUser } from "../../stores/User";
import Swal from "sweetalert2";

const useAuth = () => {
    const { registrationUser, loginUser } = useUser();

    const registration = (userName, userEmail, userPassword) => {
        const user = new FormData();
        user.append('userName', userName);
        user.append('userEmail', userEmail);
        user.append('userPassword', userPassword);

        return registrationUser(user)
            .then(() => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Внимание!',
                    text: 'Поздравляем Вас с успешной регистрацией!'
                });
            }).catch((error) => {
                return Swal.fire({
                    icon: 'error',
                    title: 'Внимание!',
                    text: error.response.data.message
                });
            });
    };

    const login = (userEmail, userPassword) => {
        const user = new FormData();
        user.append('userEmail', userEmail);
        user.append('userPassword', userPassword);

        return loginUser(user)
            .then(() => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Внимание!',
                    text: 'И вновь мы Вам говорим добро пожаловать!'
                });
            }).catch((error) => {
                return Swal.fire({
                    icon: 'error',
                    title: 'Внимание!',
                    text: error.response.data.message
                });
            });
    };

    return { registration, login };
};

export default useAuth;