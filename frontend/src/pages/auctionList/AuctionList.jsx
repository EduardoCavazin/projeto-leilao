import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import AuctionService from "../../services/AuctionService";
import CategoryService from "../../services/CategoryService";

const AuctionList = () => {
    const [auctions, setAuctions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [statusFilter, setStatusFilter] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const toast = useRef(null);

    const auctionService = new AuctionService();
    const categoryService = new CategoryService();

    useEffect(() => {
        loadCategories();
        loadAuctions();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryService.list();
            setCategories([{ label: "Todas", value: null }, ...data.map(cat => ({ label: cat.name, value: cat.id }))]);
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao buscar categorias!",
            });
        }
    };

    const loadAuctions = async () => {
        try {
            const data = await auctionService.list();
            setAuctions(data);
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao buscar leilões!",
            });
        }
    };

    const filteredAuctions = auctions.filter(auction => {
        const matchesCategory = selectedCategory ? auction.category?.id === selectedCategory : true;
        const matchesStatus = statusFilter ? auction.status === statusFilter : true;
        return matchesCategory && matchesStatus;
    });

    return (
        <div>
            <Toast ref={toast} />

            <div className="p-grid p-align-center">
                <Dropdown
                    value={selectedCategory}
                    options={categories}
                    onChange={(e) => setSelectedCategory(e.value)}
                    placeholder="Filtrar por Categoria"
                    className="p-mr-2"
                />
                <Dropdown
                    value={statusFilter}
                    options={[
                        { label: "Todos", value: null },
                        { label: "Ativo", value: "ACTIVE" },
                        { label: "Encerrado", value: "CLOSED" },
                    ]}
                    onChange={(e) => setStatusFilter(e.value)}
                    placeholder="Filtrar por Status"
                />
            </div>

            <DataTable value={filteredAuctions} paginator rows={10}>
                <Column field="title" header="Título" />
                <Column field="description" header="Descrição" />
                <Column field="status" header="Status" />
                <Column field="valueBid" header="Valor Atual" />
                <Column field="category.name" header="Categoria" />
                <Column field="startDateTime" header="Início" body={(row) => new Date(row.startDateTime).toLocaleString()} />
                <Column field="endDateTime" header="Fim" body={(row) => new Date(row.endDateTime).toLocaleString()} />
            </DataTable>
        </div>
    );
};

export default AuctionList;
