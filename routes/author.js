const express = require("express"); 
const { append } = require("express/lib/response"); 
const isLoggedIn = require("../help/isLoggedIn");

//after npm i method-override
var methodOverride = require("method-override")

const router = express.Router();  

//must be below initialization of router
router.use(methodOverride('_method'))

router.use(express.urlencoded({extended: true}));

//import author controller
const authorCntrl = require("../controllers/author");

//routes 
router.get("/author/add", isLoggedIn, authorCntrl.author_create_get);
router.post("/author/add",authorCntrl.author_create_post); 
router.get("/author/index", authorCntrl.author_index_get);
router.get("/author/detail", authorCntrl.author_show_get);
router.delete("/author/delete", authorCntrl.author_delete_get); 
router.get("/author/edit", authorCntrl.author_edit_get); 
router.put("/author/update", authorCntrl.author_update_put);

module.exports = router;