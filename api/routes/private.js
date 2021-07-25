const router = require('express').Router();
const jwt = require('express-jwt')

router.use(
    jwt({
      secret: "$2b$10$/skdhli/rZNMa9uRsSOdX.",
      algorithms: ["HS256"],
      getToken: req => req.cookies.access,
    })
  );

  router.get('/prueba', (req, res)=>{
      console.log(req.cookies);

      res.sendStatus(200)
  })

module.exports = router;