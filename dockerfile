FROM node:16.20.2
# Встановлення та налаштування Firefox
ARG FIREFOX_VERSION="firefox-esr"
RUN apt-get update -qqy \
    && apt-get -qqy install \
    ${FIREFOX_VERSION} \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/*
# Додаємо змінні середовища для віртуального дисплею та для безголовного режиму Firefox
ENV DISPLAY=localhost:0.0
ENV MOZ_HEADLESS=1
# Встановлюємо робочий каталог всередині контейнера
WORKDIR /usr/src/app
# Копіюємо package.json та package-lock.json до робочого каталогу
COPY package*.json ./
# Встановлюємо залежності проекту
RUN npm install
# Копіюємо решту коду додатка в робочий каталог контейнера
COPY . /usr/src/app
# Визначаємо команду для запуску додатку
CMD ["npm", "run", "wdio"]


