import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import AuctionService from "../../services/AuctionService";
import CategoryService from "../../services/CategoryService";

const AuctionForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [auction, setAuction] = useState({
        title: "",
        description: "",
        startDateTime: null,
        endDateTime: null,
        status: "ACTIVE",
        incrementValue: 0,
        categoryId: null,
    });
    const [categories, setCategories] = useState([]);

    const auctionService = new AuctionService();
    const categoryService = new CategoryService();

    useEffect(() => {
        loadCategories();
        if (id) loadAuction();
    }, [id]);

    const loadCategories = async () => {
        const data = await categoryService.list();
        setCategories(data.map(cat => ({ label: cat.name, value: cat.id })));
    };

    const loadAuction = async () => {
        const data = await auctionService.getAuctionById(id);
        setAuction(data);
    };

    const handleSubmit = async (e) => {
        console.log("Bearer:", localStorage.getItem('token'));
        e.preventDefault();
        if (id) {
            await auctionService.update(auction);
        } else {
            await auctionService.insert(auction);
        }

        navigate("/auctions");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Título:</label>
            <InputText value={auction.title} onChange={(e) => setAuction({ ...auction, title: e.target.value })} />

            <label>Descrição:</label>
            <InputText value={auction.description} onChange={(e) => setAuction({ ...auction, description: e.target.value })} />

            <label>Data de Início:</label>
            <Calendar value={auction.startDateTime} onChange={(e) => setAuction({ ...auction, startDateTime: e.value })} />

            <label>Data de Fim:</label>
            <Calendar value={auction.endDateTime} onChange={(e) => setAuction({ ...auction, endDateTime: e.value })} />

            <label>Status:</label>
            <Dropdown value={auction.status} options={[{ label: "Ativo", value: "ACTIVE" }, { label: "Encerrado", value: "CLOSED" }]} onChange={(e) => setAuction({ ...auction, status: e.value })} />

            <label>Categoria:</label>
            <Dropdown value={auction.categoryId} options={categories} onChange={(e) => setAuction({ ...auction, categoryId: e.value })} />

            <label>Incremento:</label>
            <InputText value={auction.incrementValue} onChange={(e) => setAuction({ ...auction, incrementValue: parseFloat(e.target.value) })} />

            <Button label="Salvar" />
        </form>
    );
};

export default AuctionForm;
