import models from "../models";
import isURL from 'validator/lib/isURL';
import request from 'request';


export default{
    shorten_url: async (req, res, next) =>{
        try {
            const url = req.body.url;
            if(url == undefined){
                res.status(200).json({
                    code: 0, 
                    message: "Please, provide a valid url",
                    tag: "NO_URL"
                });
            }

            if(!isURL(url)){
                res.status(200).json({
                    code: 0, 
                    message: "Sorry, this is not a valid url",
                    tag: "INVALID_URL"
                });
            }
            const resultSearchUrl = await models.urlModel.find({
                url: url
            });
            
            if(resultSearchUrl.length == 0){
                const insertObject = {
                    url: url,
                    short_url: Math.random().toString(36).substr(2, 7)
                }

                const resultCreateUrl = await models.urlModel.create(insertObject);
                updateTitle(resultCreateUrl._id, url);
                res.status(200).json({
                    code: 1,
                    message: "Saved short url generated",
                    tag: "SUCCESS",
                    short_url: resultCreateUrl.short_url
                });

                
            }else{                
                res.status(200).json({
                    code: 1,
                    message: "Short url generated",
                    tag: "SUCCESS",
                    short_url: resultSearchUrl.short_url
                });
            }


        }catch (e) {
            res.status(500).send({
                code: "0",
                message: e
            });
            next(e);
        }
    },
    find_url: async(req, res, next) =>{
        console.log(req.headers);
        const short_url = req.params.short_url;
        const result = await models.urlModel.findOneAndUpdate({short_url: short_url}, {$inc: { seq: 1} });        
        if(!result){
            res.status(404).json({
                code: 0, 
                message: "You have provided an invalid short url",
                tag: "INVALID_SHORT_URL"
            });
        }else{            
            res.status(200).json({
                code: 1, 
                message: "You'll be redirected to: "+result.url,
                redirectTo: result.url,
                tag: "REDIRECT_TO"
            });
        }
    },

    list: async(req, res, next)=>{
        const resultSearchUrl = await models.urlModel.find({}, ["title","url", "short_url", "seq"],
            {
                skip:0, // Starting Row
                limit:100, // Ending Row
                sort:{
                    seq: -1 //Sort by sequence Added DESC
                }
            },            
        );

        res.status(200).send({
            code: "1",
            urls: resultSearchUrl
        });
    }
}


function updateTitle(id, url){
    request(url, function (error, response, body){
        if(error){
            return;
        }
        var title = body.split('<title>')[1].split('</title>')[0];        
        models.urlModel.findByIdAndUpdate({_id: id}, {title: title}, function(err, res){
            
        });        
    });
}