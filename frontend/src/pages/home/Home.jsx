import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import { DataView } from 'primereact/dataview';
import { Card } from 'primereact/card';
import { useTranslation } from 'react-i18next';
import { Paginator } from 'primereact/paginator';

const Home = () => {
    const { t } = useTranslation();
    const [items, setItems] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(3);

    useEffect(() => {
        fetch('/archives/auctionItens.json')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error loading items:', error));
    }, []);

    const itemTemplate = (item) => {
        return (
            <div className={style.item}>
                <Card
                    title={item.name}
                    subTitle={item.price}
                    className={style.card}
                    footer={<span>{item.description}</span>}
                >
                    <img src={item.image} alt={item.name} className={style.itemImage} />
                </Card>
            </div>
        );
    };

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <div className={style.homeContainer}>
            <h1>{t('welcome')}</h1>
            <DataView
                value={items.slice(first, first + rows)}
                itemTemplate={itemTemplate}
                layout="grid"
                className={style.data}
            />
            <Paginator
                first={first}
                rows={rows}
                totalRecords={items.length}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default Home;
