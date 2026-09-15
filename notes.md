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
Form Validations
client side validation
frontend se jo data ja raha he kya wo sahi format me he or correct hai.
server side validation
jo data hum db me send kar rahe he wo schema ko follow karna chahiye.
When we enter data in the form,the browser and/or the web server will check to see that the data is in the correct format and within the constraints set by the application.