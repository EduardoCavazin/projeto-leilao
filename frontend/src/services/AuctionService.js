import BaseService from "./BaseService";

class AuctionService extends BaseService {

    constructor() {
        super('auctions');
    }

    async insert(formData) {
        const response = await this.api.post(this.endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                
            },
        });
        return response.data;
    }

    async update(formData, id) {
        const response = await this.api.put(`${this.endpoint}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
    async listPublic() {
        const response = await
            this.api.get(`${this.endPoint}/public`);
        return response.data;
    }

}
export default AuctionService;