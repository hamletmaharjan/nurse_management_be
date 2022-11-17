import express, { Router } from "express";

const router: Router = express.Router();

router.get('/', (req,res) => {
    res.send('Users');
});

router.get('/signup', (req, res) => {
    res.send('signup');
})


module.exports = router;