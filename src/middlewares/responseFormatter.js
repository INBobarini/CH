class responseObj {
    constructor(status, result){
        this.status = status;
        this.payload = result.docs; //mongoose paginate result
        this.totalPages = result.totalPages;
        this.prevPage = result.prevPage;
        this.nextPage = result.nextPage;
        this.page = result.page; 
        this.hasPrevPage = result.hasPrevPage;
        this.hasNextPage = result.hasNextPage;
        this.prevLink = result.prevLink||null;
        this.nextLink = result.nextLink||null;
        this.limit = result.limit;
    }
}

export {responseObj}
