export default function get(req,res,next){
    res.status(200).json({
        title: "Rota de API"
    });
};