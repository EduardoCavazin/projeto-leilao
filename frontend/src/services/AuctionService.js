import BaseService from "./BaseService";

class AuctionService extends BaseService {

    constructor() {
        super('auctions');
    }

    async listPublic(){
        const response = await
            this.api.get(`${this.endPoint}/public`);
        return response.data;
    }

}
export default AuctionService;