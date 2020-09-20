# Vegan Food Shop
Szablon sklepu z funkcją śledzenia aktywności użytkowników, [kliknij tu by wejść](https://vegeshop-714fb.web.app/)

By zobaczyć angielską wersję [kliknij tu](https://github.com/TomaszOrpik/Vegan-Food-Shop)
 
# Wprowadzenie
Vegan Food Shop jest to w pełni funkcjonalny szablon sklepu internetowego z taką funkcjonalnością, jak wysyłanie i odbieranie wiadomości, dodawanie przedmiotów, tłumaczenie, przyjmowanie zamówień i śledzenie koszyka. Oprócz tego sklep ma rozszerzoną funkcję, śledzenia aktywności użytkownika na stronie. Sklep w tym celu korzysta z własnego API ([dostępne tutaj](https://github.com/TomaszOrpik/MonitorApi_Nodejs/blob/master/READMEPL.md)), aby zbierane dane były dostępne z poziomu innych stron oraz aplikacji ([na przykład w formie aplikacji mobilnej](https://github.com/TomaszOrpik/VeganFoodShopMonitorAppPL)). Dzięki temu śledzenie aktywności ma większe możliwości w modyfikowaniu i dostępność niż w przypadku Googl Analytics.

# Funkcje

Główna funkcjonalność strony:
* Dodawanie danych przedmiotów, które są przechowywane w Google Firebase, więc każda aktualizacja na sprzedawanym przedmiocie jest łatwa w implementacji poprzez podstronę stworzoną by aktualizować ofertę w czasie rzeczywistym dzięki funkcjonalności bazy danych Google
![shopAddItemPL](https://user-images.githubusercontent.com/54088860/93721220-ab888480-fb8e-11ea-933b-531fec08c675.jpg)
* Dodawanie przedmiotów do koszyka z poziomu różnych podstron
![ShopAddItemActionPL](https://user-images.githubusercontent.com/54088860/93721139-3026d300-fb8e-11ea-96fb-657d5e9e5107.gif)
* System logowania dla użytkowników, by zatrzymać niezautoryzowany dostęp do danych użytkowników
![loginActionPL](https://user-images.githubusercontent.com/54088860/93721155-42a10c80-fb8e-11ea-91b2-a104fb177cde.gif)
* Wysyłanie i otrzymywanie wiadomości, które są przechowywane w bazie danych Google Firebase, dzięki czemu są łatwo dostępne
![ShopMessagePL](https://user-images.githubusercontent.com/54088860/93721171-53518280-fb8e-11ea-8243-c4e74f9131c9.jpg)
* Dodawanie tłumaczenia w czasie rzeczywistym, które jest przechowywane w bazie danych i przy pomocy funkcji obserwatora Rxjs wyświetlane, bez potrzeby odświeżenia strony przez użytkownika
![ShopLanguageAction](https://user-images.githubusercontent.com/54088860/93720229-ff439f80-fb87-11ea-8181-d6d6960e4200.gif)
* Śledzenie aktywności użytkowników za pomocą wbudowanego API, które magazynuje dane w bazie Mongoose, dzięki czemu mogą być wyświetlone z poziomu innych aplikacji
![ShopUserDataPL](https://user-images.githubusercontent.com/54088860/93721180-695f4300-fb8e-11ea-95b1-50859f7b0206.jpg)
* Wyświetlanie śledzonych danych jako aktywność na stronie za pomocą Redux Developer Tools - DO DODANIA

# Instalacja

### Instalacja repozytorium
By wyświetlić stronę w trybie developerskim:
* pobierz repozytorium
* wpisz komendę `npm install` by pobrać wymagane moduły
* wpisz komendę `ng serve`

### Dostęp do strony
Strona znajduje się pod adresem [https://vegeshop-714fb.web.app/](https://vegeshop-714fb.web.app/)

### Dostęp do panelu administratora
* by skorzystać z panelu odwiedź [stronę](https://vegeshop-714fb.web.app/)
* wciśnij przycisk Zaloguj
* Zaloguj się adrem e-mail: 
aa8918792@gmail.com | Hasło: Admin123!

# Technologie

Technologie wykorzystane przy tworzeniu:
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

# Inne
### Zgłoś problemy i pomysły na ulepszenie

Możesz zgłaszać napotkane problemy i pomysły na ulepszenie [tutaj](https://github.com/TomaszOrpik/Vegan-Food-Shop/issues/new)

### Licencja

Aplikacja działa na licencji GENERAL PUBLIC LICENSE by dowiedzieć się więcej [odwiedź plik z licencją](https://github.com/TomaszOrpik/Vegan-Food-Shop/blob/master/LICENSE)

### Kontakt

Zapraszam do [kontaktu ze mną!](https://github.com/TomaszOrpik)
