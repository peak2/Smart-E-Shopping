exports.get404 = (req, res, next)=> {
    res.status(404).render('404', {             //The second 404 on dz line represents 404.ejs
        pageTitle: 'Page Not Found', 
        path: req.path
    })    
}