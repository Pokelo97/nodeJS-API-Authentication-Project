const jwt = require('jsonwebtoken');
const conn = require('../../conn/conn').promise();

const dotenv=require('dotenv');
dotenv.config();

exports.getUser = async (req,res,next) => {

    try{
        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, process.env.TOKEN_SECRET);

        const [row] = await conn.execute(
            "SELECT `user_id`,`name`,`surname`,`email` FROM `users` WHERE `user_id`=?",
            [decoded.id]
        );

        if(row.length > 0){
            return res.json({
                user:row[0]
            });
        }
        res.json({
            message:"User not found"
        });
        
    }
    catch(err){
        next(err);
    }
}