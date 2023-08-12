export const succesfulResponse = 
function (req,res,next){//errorHandler must go after this MW
    if(req.result instanceof Error){
        next (req.result)
    }
    else{
        res.status(req.statusCode||200)
        res.json(req.result)
    }
}