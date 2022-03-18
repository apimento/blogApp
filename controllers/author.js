// APIs for Author Module  

//inlcude model first 
const {Article} = require('../model/Article'); 
const {Author} = require('../model/Author');  

//after npm i moment
const moment =require('moment'); 

//HTTP GET  - load an Add Author form 
exports.author_create_get = (req, res) => { 
    res.render("author/add")
}

//HTTP POST - Author 
exports.author_create_post = (req, res) => { 
    console.log(req.body); 

    let author = new Author(req.body)

    //Save author 
    author
    .save() 
    .then(()=>{
        
        res.redirect('/author/index');
    })
    .catch((err)=> { 
        console.log(err); 
        res.send("ERROR!")
    })
};   


//HTTP GET - Author index route 
exports.author_index_get = (req, res) => { 
    Author.find() 
    .then(authors => {   //variable in then must match below
        res.render("author/index", {authors: authors, moment})
    }) 
    .catch(err => { 
        console.log(err);
    })
} 

//HTTP GET - Author by Id 
exports.author_show_get = (req,res) => { 
    console.log(req.query.id);
    Author.findById(req.query.id).populate('article')
    .then(author =>{ 
        res.render("author/detail",{author, moment})
    })
    .catch(err=> { 
        console.log(err);
    });
};

//HTTP DELETE - Author 
exports.author_delete_get = (req,res) => { 
    console.log(req.query.id); 
    Author.findByIdAndDelete(req.query.id)
    .then(() => {
       res.redirect("/author/index")  
    })
    .catch(err=> { 
        console.log(err)
    })
} 

//HTTP GET - Load author edit form 
exports.author_edit_get = (req,res) => { 
    Author.findById(req.query.id)
    .then((author)=>{
        res.render("author/edit", {author})
    }) 
    .catch(err =>{ 
        console.log(err);
    })
} 

//HTTP PUT - Author Update 
exports.author_update_put =(req, res) => { 
    Author.findByIdAndUpdate(req.body.id, req.body)
    .then(()=> { 
        res.redirect("/author/index");
    }) 
    .catch(err => { 
        console.log(err);
    })
}