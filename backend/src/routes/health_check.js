import { Router } from "express";

const router = Router();

router.get('/', ((req, res) => {
    try {  
        res.status(200).json({
            "message": "health check"
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}));


export default router;