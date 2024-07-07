import {Request, Response, NextFunction, Errback} from "express"

export const errorHandler = async (err: Errback, req: Request, res: Response, next: NextFunction) => {
    if(res.headersSent){
        return next(err)
    }
    res.status(500).json({error: err})
}