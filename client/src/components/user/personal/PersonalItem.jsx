import React from 'react';
import Modal from "../../modal/Modal";

const PersonalItem = (props) => {
    const {
        person
    } = props

    const [active, setActive] = React.useState(false);

    return (
        <>
            <div className="players-item" onClick={() => {setActive(true)}}>
                <img className="players-item__image"
                     src={`${process.env.REACT_APP_API_PATH}${person.personImage}`}
                     alt="News Thumbnail"/>
            </div>
            <Modal active={active} setActive={setActive}>
                <h3 className="players-item__name"> Фамилия Имя Отчество руководителя: {person.personSurname} {person.personName} {person.personPatronymic ? person.personPatronymic : ''}</h3>
                <h3 className="players-item__position">Должность руководителя: {person.personPosition || ''}</h3>
            </Modal>
        </>
    );
};

export default PersonalItem;
