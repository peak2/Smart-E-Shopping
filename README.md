In 404.ejs ===>  <%- -> is used to output unescaped html code i.e <%- to render html code while <%= to render variable 
    that holds a string that hold html code, will not render html code but only render text, in form of a placeholder      



404.ejs

 <!-- <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> <%= pageTitle %></title>
        <link rel="stylesheet" href="/css/main.css">
    </head>
    <body>
        <header class="main-header">
            <nav class="main-header__nav">
                <ul class="main-header__item-list">
                    <li class="main-header__item"><a class="<%= (path==='/' ? 'active' : '') %> " href="/">Shop</a></li>
                    <li class="main-header__item"><a class= "<%= (path==='/admin/add-product' ? 'active' : '') %> " href="/admin/add-product">Add Product</a></li>
                </ul>
            </nav>
        </header>  
    
            <h1>Page Not Found</h1>
    
        </body>
    
        </html> -->