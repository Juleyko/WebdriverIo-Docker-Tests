# WebdriverIo-Docker-Tests

## Вимоги

Переконайтеся, що у вас встановлено:

- Node.js https://nodejs.org/en
- npm (входить до складу Node.js)
- Docker https://www.docker.com/products/docker-desktop/
## Встановлення

1. Клонуйте репозиторій:

```bash
git clone https://github.com/Juleyko/WebdriverIo-Docker-Tests.git
```
2. Встановіть залежності:
```bash
npm install
```

Запустіть тести з використанням npm:
```bash
npm run wdio
```
Для запуску з Docker:

Будуємо образ
```bash
docker image build -t test:latest .
```
Запускаємо образ
```bash
docker run -it test:latest
```
## Для докладної інформації та налаштувань перегляньте документацію 

WebDriverIO
```bash
https://webdriver.io/docs/gettingstarted/
```
Docker
```bash
https://docs.docker.com/
```


