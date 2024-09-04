import jwt from 'jsonwebtoken'
const SECRET_KEY = 'my-high-level-secret-key';


export const requireSignin = async(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(200).send({
            success:false,
            message:"Please provide token value"
        })
    }
    console.log("from header TOken--->",token);
    jwt.verify(token,SECRET_KEY, (err, decodedValue) => {
        console.log("err",err)
        if (err){
            return res.status(200).send({
                success:false,
                message:"Unable to Verify your identity...Please provide valid details"
            })
        }
        console.log("decodedValue--->",decodedValue)
        req.user = decodedValue;
        next();
      });
} 