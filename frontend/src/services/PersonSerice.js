import BaseService from "./BaseService";

class PersonService extends BaseService {

    constructor() {
        super('person');
    }

    async login(credentials) {
        try {
            const response = await this.api.post(`${this.endpoint}/login`, credentials);
            return response.data;
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    }

    async register(userData) {
        try {
            const response = await this.api.post(this.endpoint, userData);
            return response.data;
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            throw error;
        }
    }

    async requestPasswordCode(email) {
        try {
            const response = await this.api.post(`${this.endpoint}/password-code-request`, { email });
            return response.data;
        } catch (error) {
            console.error("Erro ao solicitar código de recuperação:", error);
            throw error;
        }
    }

    async resetPassword(data) {
        try {
            const response = await this.api.post(`${this.endpoint}/reset-password`, data);
            return response.data;
        } catch (error) {
            console.error("Erro ao redefinir senha:", error);
            throw error;
        }
    }

    async confirmAccount(email) {
        try {
            const response = await this.api.get(`${this.endpoint}/confirm`, { params: { email } });
            return response.data;
        } catch (error) {
            console.error("Erro ao confirmar conta:", error);
            throw error;
        }
    }
}

export default PersonService;
