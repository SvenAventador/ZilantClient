import React from 'react';
import MerchList from "../../../components/user/merch/MerchList";

const Merchandise = () => {
    return (
        <div className="merch">
            <div className="merch__container">
                <h1 style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 'bolder',
                    fontSize: '30pt',
                    color: '#162746'
                }}>
                    Мерч
                </h1>
                <MerchList/>
            </div>
        </div>
    );
};
export default Merchandise;
