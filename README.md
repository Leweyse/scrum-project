<h1 align="center" style="font-size: 3rem; font-weight: 700">
G-Bay
</h1>

<div align="center">
<img src="./screenshots/preview_landing.png" width="75%">
</div>

<p align="center">
This project is part of the <a href="https://becode.org/">Becode</a> training
</p>

## **Contents**
- [Description](#description)
- [How to Install and Run the Project](#configuration_guide)
  - [API](api/README.md)
  - [Client Side](client/README.md)
- [Features](#features)
- [Development Book](DEVBOOK.md)
- [Contributors](#contributors)

## **Description**
G-Bay is an E-commerce Site for fans. As a buyer, you'll be able to create an account, edit your profile, filter results, and more. As a seller, you'll be able to see your listing of products, update their information, or remove them.

[React JS][reactjs] is used for Client-Side, [Laravel 8][laravel] as API, and [MySQL][mysql] as Database Service. In addition, [SCSS][sass] is used to style this project, but SCSS modules are not implemented.

The folder structure for the React App is based on this [article][folder].

[Package manager][pm]:
- React App: [yarn][pm-yarn]
- Laravel API: [composer][pm-composer]

## **Configuration Guide**
This project is not hosted online, but it's completely functional. To use G-Bay on your local device, it's necessary  to follow some steps.

### **Requirements**
1. Install PHP on your computer. We recommend using XAMPP for this purpose, as the process is straightforward and you can complete it in a few minutes.

2. Download and Install the latest version of Composer.

3. Install `yarn` package manager.

### **Clone repository**
```
  git clone git@github.com:Leweyse/scrum-project.git
```

## **Features**
### **User**
- Implemented
  - Login
  - Create Account
    - Require agreement with terms and conditions
  - Edit Account
  - Reset Password
    - Email confirmation
  - Buy Items
  - Sell Items
- In Progress
  - Delete Accout

### **Stock**
- Implemented
  - Display Products available with pagination
  - Basic information for each product

### **Product**
- Implemented
  - Add Product to Stock
  - Update Product information on Stock
  - Single Product page
  - Filter by Products' name
  - Display statistics based on price
- In Progress
  - Filter by Categories
  - Delete Product from Stock

### **Statistics**
- Implemented
  - Stats based on product price
  - Display graphic

### **Cart**
- Implemented
  - Display products added to cart
  - Display quantity, total and subtotal
  - Update total and quantity of each product in cart

## **Contributors**
<table>
<td>
<article style="text-align:center">
<img src="https://avatars.githubusercontent.com/u/70060756?v=4" width="150px">

[Jörg von Dzerzawa][gh-j]

[jvondzerza][gh-j]
</article>
</td>
<td>
<article style="text-align:center">
<img src="https://avatars.githubusercontent.com/u/69996340?v=4" width="150px">

[Daryl Castro][gh-l]

[Leweyse][gh-l]
</article>
</td>
<td>
<article style="text-align:center">
<img src="https://avatars.githubusercontent.com/u/86771301?v=4" width="150px">

[Katya Heylen][gh-k]

[katyaheylen][gh-k]
</article>
</td>
<td>
<article style="text-align:center">
<img src="https://avatars.githubusercontent.com/u/867168?v=4" width="150px">

[Sushanta Pyakurel][gh-m]

[mesushanta][gh-m]
</article>
</td>
</table>

[gh-j]: https://github.com/jvondzerza
[gh-k]: https://github.com/katyaheylen
[gh-l]: https://github.com/Leweyse
[gh-m]: https://github.com/mesushanta

<!-- Extra Links -->
[becode]: https://becode.org/

[reactjs]: https://reactjs.org/
[laravel]: https://laravel.com/
[mysql]: https://www.mysql.com/
[sass]: https://sass-lang.com/

[folder]: https://www.sitepoint.com/react-architecture-best-practices/

[pm]: https://en.wikipedia.org/wiki/Package_manager#:~:text=A%20package%20manager%20or%20package,computer%20in%20a%20consistent%20manner.&text=Package%20managers%20are%20designed%20to,for%20manual%20installs%20and%20updates.
[pm-yarn]: https://yarnpkg.com/
[pm-composer]: https://getcomposer.org/