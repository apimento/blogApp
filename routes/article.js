const express = require("express"); 
const { append } = require("express/lib/response");
const isLoggedIn = require("../help/isLoggedIn");

//after npm i method-override
var methodOverride = require("method-override")

const router = express.Router();  

//must be below initialization of router
router.use(methodOverride('_method'))

router.use(express.urlencoded({extended: true}));

//import article controller
const articleCntrl = require("../controllers/article");

//routes 
router.get("/article/add",articleCntrl.article_create_get);
router.post("/article/add",articleCntrl.article_create_post); 
router.get("/article/index", articleCntrl.article_index_get);
router.get("/article/detail", articleCntrl.article_show_get);
router.delete("/article/delete", articleCntrl.article_delete_get); 
router.get("/article/edit", articleCntrl.article_edit_get); 
router.put("/article/update", articleCntrl.article_update_put);

module.exports = router;