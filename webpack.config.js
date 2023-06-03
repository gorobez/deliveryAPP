'use strict';

let path = require('path');

// Обєкт налаштувань
module.exports = {
    mode: 'development', // режим в якому буде працювати вебпак
    entry: './src/js/script.js', // файл в якому прописуються всі залежності, всі імпорти
    output: { // файл виходу
      filename: 'bundle.js',
      path: __dirname + '/dist/js'
    },
  watch: true, // вебпак після того як був викликаний, буде слідкувати за нашими файлами і зберігати зміни

  devtool: "source-map", // щоб був доступ до вихідного коду

  module: {}
};