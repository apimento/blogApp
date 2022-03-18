// APIs for Article Module  

//inlcude model first 
const {Article} = require('../model/Article'); 
const {Author} = require('../model/Author'); 

//after npm i moment
const moment =require('moment');

//HTTP GET  - load an Add Article form 
exports.article_create_get = (req, res) => { 
   
   Author.find()
   .then((authors)=> { 
       res.render('article/add',{authors});
   })
   .catch((err) => { 
       console.log(err);
   })

    //res.render("article/add")
}

//HTTP POST - Article 
exports.article_create_post = (req, res) => { 
    console.log(req.body); 

    let article = new Article(req.body)

    //Save article 
    article
    .save() 
    .then(()=>{

        //save article to authors as well  
        req.body.author.forEach(author => {
            Author.findById(author, (error, author) => {
                author.article.push(article); 
                author.save(); 
            })
        });
        res.redirect('/article/index');
    })
    .catch((err)=> { 
        console.log(err); 
        res.send("ERROR!")
    }) 

    // Author.findById(req.body.author, (error,author) => { 
    //     author.article.push(article);
    //     author.save(); 
    //     res.redirect("/author/index");
    // })

}; 

//HTTP GET - Article index route 
exports.article_index_get = (req, res) => { 
    Article.find().populate('author') 
    .then(articles => {   //variable in then must match below
        res.render("article/index", {articles: articles, moment})
    }) 
    .catch(err => { 
        console.log(err);
    })
} 

//HTTP GET - Article by Id 
exports.article_show_get = (req,res) => { 
    console.log(req.query.id);
    Article.findById(req.query.id).populate("author")
    .then(article =>{ 
        res.render("article/detail",{article, moment})
    })
    .catch(err=> { 
        console.log(err);
    });
};

//HTTP DELETE - Article 
exports.article_delete_get = (req,res) => { 
    console.log(req.query.id); 
    Article.findByIdAndDelete(req.query.id)
    .then(() => {
       res.redirect("/article/index")  
    })
    .catch(err=> { 
        console.log(err)
    })
} 

//HTTP GET - Load article edit form 
exports.article_edit_get = (req,res) => { 
    Article.findById(req.query.id)
    .then((article)=>{
        res.render("article/edit", {article})
    }) 
    .catch(err =>{ 
        console.log(err);
    })
} 

//HTTP PUT - Article Update 
exports.article_update_put =(req, res) => { 
    Article.findByIdAndUpdate(req.body.id, req.body)
    .then(()=> { 
        res.redirect("/article/index");
    }) 
    .catch(err => { 
        console.log(err);
    })
}