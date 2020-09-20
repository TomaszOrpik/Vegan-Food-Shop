# Vegan Food Shop
Shop template with user tracking functionality, click [here to visit](https://vegeshop-714fb.web.app/)

For Polish version [click here](https://github.com/TomaszOrpik/Vegan-Food-Shop/blob/master/READMEPL.md)
 
# Introduction

Vegan Food Shop is fully functional shop template with every shop functionality like sending and receiving messages, adding items, translations, summary'ing orders and keep track of user cart. Besides this the shop have extensive functionality to track users activity on the page. Shop is using for this custom API ([available here](https://github.com/TomaszOrpik/MonitorApi_Nodejs)), so collected data can be accessed from different pages and applications ([for example in mobile app](https://github.com/TomaszOrpik/VeganFoodShopMonitorApp)). Thanks to custom API tracking data is more customizable and available then with Google Analytics service. 

# Features

Main features of website:
* Adding items to shop, which are stored in Google firebase, so every update on selled item is easy to make with sub-page designed to customize offer and are updated in real time thanks to firebase functionality
![ShopAddItem](https://user-images.githubusercontent.com/54088860/93720208-e33ffe00-fb87-11ea-880c-ffff36ac9751.jpg)
* Adding items to users cart on different pages
![ShopCartActionENG](https://user-images.githubusercontent.com/54088860/93720364-cce67200-fb88-11ea-850d-916e42758f6e.gif)
* Login system for users, to prevent unauthorized access to users data
![loginActionENG](https://user-images.githubusercontent.com/54088860/93720370-d66fda00-fb88-11ea-9378-53459e6dc812.gif)
* Sending and receiving messages, that are stored in Google database, which makes them easy to access
![shopMessage](https://user-images.githubusercontent.com/54088860/93720161-98be8180-fb87-11ea-918e-c617d4d9294a.jpg)
* Adding in real time translations, which are stored in database and with Rxjs Observable functionality displayed on every update, whitout need to refreshing page for the user
![ShopLanguageAction](https://user-images.githubusercontent.com/54088860/93720229-ff439f80-fb87-11ea-8181-d6d6960e4200.gif)
* Keeping track of users functionality with build in API support that makes data stored in mongoose database, so they can be displayed on different applications
![ShopUserData](https://user-images.githubusercontent.com/54088860/93720236-0a96cb00-fb88-11ea-8062-f10b092573a2.jpg)
* Display tracked data as page activity with Redux Developer Tools - TO ADD

# Setup

### Install repository
To display page in development mode:
* download repository 
* run command `npm install` to download necessary modules
* run page with `ng serve`

### Access page
Page is located under the address [https://vegeshop-714fb.web.app/](https://vegeshop-714fb.web.app/)

### Access admin dashboard
* To use admin functionality go to [page](https://vegeshop-714fb.web.app/)
* click Login button
* login with mail: 
aa8918792@gmail.com | Password: Admin123!

# Technologies

Technologies used in development:
* Angular 9
* Angular Material
* Bootstrap
* HTML5/CSS3
* Google Firebase
* Angular HTTP requests
* xlxs package
* export-to-csv package
* ngx-device-detector package
* CanvasJS package
* rxjs operators

# Others
### Report Bug and improves

You can report encountered bugs or send ideas for improvement [here](https://github.com/TomaszOrpik/Vegan-Food-Shop/issues/new)

### License

Application was uploaded under GENERAL PUBLIC LICENSE for more information [check license file](https://github.com/TomaszOrpik/Vegan-Food-Shop/blob/master/LICENSE)

### Contact

Feel free to [Contact me!](https://github.com/TomaszOrpik)
