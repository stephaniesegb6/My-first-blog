const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    tirtle: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

articleSchema.pre('validate', function(next){
    if(this.tirtle){
        this.slug = slugify(this.tirtle,{lower:true,strict: true})
    }
    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }

    next()
})


module.exports = mongoose.model('Article',articleSchema)