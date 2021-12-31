<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="./public/readme_img/logo.JPG" alt="Logo" width="85%">
  </a>
  <br />
  <h3 align="center">welcome, penguins</h3>
</div>
<br />
<br />
<br />

<!-- ABOUT THE PROJECT -->
## About The Project

Please don't read this readme.


### Built With

Major frameworks & libraries used to build the project.

**Browser**
* Vue.js
* Bootstrap
* ejs
* joi
* passport

**Server**
* node.js
* express
* axios
* mongoose
* webpack

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an nodejs based app. node version 16.3.1. npm version 8.1.2.
Run command node -v & npm -v in terminal to check the current installed version.
* Install [Node.js](https://nodejs.org/en/)

* npm
  ```sh
  npm install npm@latest -g
  npm install [packages]
  ```

### Run

To run the app, add .env file in the root folder and enter configuration information.

Enter your config in `.env`
```js
PORT=
DB_USERNAME=
DB_PASSWORD=
DB_URL=
```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage
Show useful examples of how a project can be used with screenshots, code examples and demos. May also link to more resources.

### Register page

![register]

### Register Validation
_Joi is an object schema description language and validator for JavaScript objects._
Here I use [joi](https://joi.dev/api/?v=17.5.0) as the validation tool. joi schema is simple and clean, similar to mongoose validation schema. 
Here are also mongoose validators in the user schema. Also, encrypt and check password by _bcrypt_.

![register_error]

### Login Page

![login]

### Login Validation
User login authentication is done by _[passport](http://www.passportjs.org/)_. There are many strategies of _passport_. _Passport-local strategy_ is the one that is being applied in the project. in addition, _passport session_ is used to avoid users from frequent login. Although the implementation of the passport session is easy, I didn't thoroughly understand how it works. Helpful links: 
[Passport - LocalStrategy](https://www.passportjs.org/docs/configure/) |
[Understanding passport serialize deserialize](https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize)

![login_error]

### Welcome Page
If you're an approved penguin, this welcome message is exclusive for you ^^.
Login and register buttons are hidden after login.

![homepage]

### Dashboard Page
Here to manage everything about penguinshop. Dashboard system use [AdminLTE](https://adminlte.io/) template, which builds on bootstrap 4. BTW, homepage & register/login build on Bootstrap 5. 

tip:  `btn-block` has been removed in Bootstrap 5, instead, using `w-100` or `col-12` to expand the button to the full block.

![dashboard]


### Create Category Page
![create]


### Alert

Popups power by [sweetalert2](https://sweetalert2.github.io/#examples).

![create_success]


### Category List Page

![list]


### Pagination & Page Size
Applied [Vue Pagination](https://vuejsexamples.com/tag/pagination/) and [Vue Loading](https://www.npmjs.com/package/vue-loading-overlay) to this page. User is able to customize page size. Pagination will be hidden if there is only one page of list. During the process of query (even it's very short in localhost), a loader will pop up. (switch network mode through _Inspect - Network - No throtting to Slow 3G_ in brower to make the loader clear)

![list_pagination]


### Filter
debounce applied here to avoid querying by every single character. 

![list_keyword]

### Webpack
Links: 

[Bug: require is not defined? Node.js](https://stackoverflow.com/questions/31931614/require-is-not-defined-node-js)


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [x] Everything I've done
- [ ] Admin
    - [ ] edit page
    - [ ] date format
    - [ ] product thumbnail
- [ ] Customer
    - [ ] products page
    - [ ] shopping cart
    - [ ] order & payment
    - [ ] ... omg -_-
- [ ] Server
    - [ ] Heroku ?


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-url]: https://linkedin.com/in/othneildrew
[register]: /public/readme_img/register.png
[register_error]: /public/readme_img/register_error.png
[login]: /public/readme_img/login.png
[login_error]: /public/readme_img/login_error.png
[homepage]: /public/readme_img/homepage.png
[dashboard]: /public/readme_img/dashboard.png
[create]: /public/readme_img/create.png
[create_success]: /public/readme_img/create_success.png
[list]: /public/readme_img/list.png
[list_pagination]: /public/readme_img/list_pagination.png
[list_keyword]: /public/readme_img/list_keyword.png