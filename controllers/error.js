exports.get404 = (req, res, next)=> {
    res.status(404).render('404', {             
        pageTitle: 'Page Not Found',
        path: req.path              // path: '/404  or path: req.path or path: '' or path: 'anything', just  
                                    // make sure you use key value pair here, where path is the key and 
                                    // anything as the value in a string      
    })    
}