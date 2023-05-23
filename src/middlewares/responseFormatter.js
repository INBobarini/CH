let okStatusMessage = "success"
let badStatusMessage = "error"
class responseObj {
    constructor(result){
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

export const productsResponseFormatter = 
function (req,res){
    
    let statusMessage = badStatusMessage
    if(req.statusCode===200||req.statusCode===201){
        statusMessage = okStatusMessage
    }
    if(statusMessage===badStatusMessage){
        return res.status(req.statusCode).json({status:statusMessage, payload:"{}"})
    }
    let response = new responseObj(req.result)
    res.status(req.statusCode).json({status:statusMessage, payload:response})
}

export const cartsResponseFormatter = 
function (req,res){
    
    let statusMessage = badStatusMessage
    if(req.statusCode===200||req.statusCode===201){
        statusMessage = okStatusMessage
    }
    if(statusMessage===badStatusMessage){
        return res.status(req.statusCode).json({status:statusMessage, payload:"{}"})
    }
    res.status(req.statusCode).json({status:statusMessage, payload:req.result})
}
