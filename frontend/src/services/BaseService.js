import api from '/components/config';

class BaseService {

    constructor(endpoint) {
        this.api = api;
        this.endpoint = endpoint;
    }

    async insert(data) {
        const response = await this.api.post(this.endpoint, data);

        return response.data;
    }

    async update(data) {
        const response = await this.api.put(this.endpoint, data);

        return response.data;
    }

    async delete(id) {
        const response = await this.api.delete(`${this.endpoint}/${id}`);

        return response.data;
    }

    async list() {
        const response = await this.api.get(this.endpoint);

        return response.data;
    }
}

export default BaseService;