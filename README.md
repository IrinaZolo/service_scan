сайт: https://irinazolo.github.io/service_scan/

# ПОСТАНОВКА ЗАДАЧИ
Компания СКАН разработала новый API для поиска публикаций о компании (юридическом лице) в средствах массовой информации по его ИНН. Серверная часть приложения уже готова, задача — разработать клиентскую часть.

# ФУНКЦИОНАЛЬНЫЕ ТРЕБОВАНИЯ
Клиентская часть сервиса состоит из:
* главной страницы,
* формы авторизации,
* формы для ввода параметров запроса (видна только авторизованным пользователям)
* страницы с выводом результатов запроса (видна только авторизованным пользователям).

Реализовано на данный момент:
* Главная страница
* Страница формы авторизации
    * Авторизация (доступный аккаунт: логин - sf_student1, пароль - 4i2385j)
* Страница поиска (ИНН для поиска: 7710137066)
* Страница вывода результатов поиска

Необходимо доработать:
* Нотификация
* Оптимизация кода (useCallback, useMemo и т.д.)
* сменить библиотеку moment.js на day.js (меньше весит)
