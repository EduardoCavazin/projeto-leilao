import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import PersonService from "../../services/PersonSerice";

const ConfirmAccount = () => {
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(true); 
    const toast = React.useRef(null); 

    useEffect(() => {
        
        const params = new URLSearchParams(location.search);
        const email = params.get("email");

        if (email) {
            confirmEmail(email);
        } else {
            toast.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'E-mail não encontrado no link de confirmação.',
                life: 3000
            });
            setLoading(false);
        }
    }, [location.search]);

    const confirmEmail = async (email) => {
        try {
            const personService = new PersonService();
            const response = await personService.confirmAccount(email);

            toast.current.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: response, 
                life: 3000
            });

            setTimeout(() => {
                navigate('/login'); 
            }, 3000);
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Não foi possível confirmar o cadastro. Tente novamente mais tarde.',
                life: 3000
            });
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Toast ref={toast} />
            {loading ? (
                <ProgressSpinner />
            ) : (
                <p>Processo concluído. Verifique as mensagens acima.</p>
            )}
        </div>
    );
};

export default ConfirmAccount;
