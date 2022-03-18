const mongoose = require('mongoose');

const authorSchema = mongoose.Schema(
    {
       name: String, 
       emailAddress: String, 
       phoneNumber: String, 
       article: [{ 
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Article'
       }]
    }, 
    {
        timestamps: true 
    }
) 

const Author = mongoose.model("Author", authorSchema);

 module.exports = {Author};