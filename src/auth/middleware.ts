import express, { Request } from 'express';

export default function(req:Request, res, next){
    if(req.session?.authenticated){
        next()
    }else{
        res.redirect('/login')
    }
}
