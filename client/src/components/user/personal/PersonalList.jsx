import React, {Fragment} from 'react';
import PersonalItem from "./PersonalItem";
import {getAll} from "../../../http/personal";

const PersonalList = () => {
    const [persons, setPersons] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        getAll().then(({persons}) => {
            setPersons(persons);
            setTimeout(() => {
                setLoading(false);
            }, 2000);

        })
    }, []);

    return (
        <div className="players-list">
            {
                loading ? (
                    <h2>
                        Идет поиск руководства клуба
                    </h2>
                ) : (
                    <>
                        {persons.length > 0 ? (
                            <div className="players-list__grid"
                                 style={{
                                     marginBottom: '1rem'
                                 }}>
                                {persons.map((person) => (
                                    <PersonalItem key={person.id} person={person}/>
                                ))}
                            </div>
                        ) : (
                            <p>
                                На наддый момент идет поиск руковосдтва клуба. Пожалуйста, обратитесь к этому разделу
                                чуточку позднее!
                            </p>
                        )}
                    </>
                )
            }
        </div>
    );
};

export default PersonalList;