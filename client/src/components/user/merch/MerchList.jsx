import React from 'react';
import {useMerchandise} from "../../../store/Merchandise";
import MerchItem from "./MerchItem";

const MerchList = () => {
    const {getAllMerch} = useMerchandise();
    const [allMerch, setAllMerch] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getAllMerch().then(({merchandises}) => {
            setAllMerch(merchandises);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        })
    }, [getAllMerch]);

    return (
        <div className="merch-list">
            {
                loading ? (
                    <h2>Загрузка мерча</h2>
                ) : allMerch.length > 0 ? (
                    <div className="merch-list__grid">
                        {
                            allMerch.map((merch) => (
                                <MerchItem key={merch.id}
                                           merch={merch}/>
                            ))
                        }
                    </div>
                ) : (
                    <h2>Новостей не найдено!</h2>
                )
            }
        </div>
    );
};


export default MerchList;