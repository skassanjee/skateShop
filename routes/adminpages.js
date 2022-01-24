let express = require('express')
let Router = express.Router()

/*get pages index */

Router.get('/', (req, res, next) => {
    res.send('admin area')
})

Router.get('/add-page', (req, res, next) => {
    let title = ''
    let slug = ''
    let content = ''

    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content,
        pageTitle: 'Admin | Add a Page'
    })
})

Router.get('/', (req, res, next) => {
    res.send('admin area')
})

module.exports = Router