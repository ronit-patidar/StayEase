npm init -y
npm i express ejs mongoose method-override ejs-mate
New-Item app.js

Model:Listing->place(apartment,flat,house,villa,hotel)
title(String)
description(String)
image URL(String)
price (Number)
location (String)
country (String)

Create : New and Create Route
GET /listing/new -> Form -> Submit -> /listing POST

Update : Edit and update route
GET /listing/:id/edit -> edit form -> submit -> PUT /listing/:id