const mascot = require('./app/models/mascot');
// Фреймворк веб-приложений.
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const PORT = 3000;
// Подключаем views (hbs)
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'hbs');

// Подключаем логгирование деталей запросов.
app.use(morgan('dev'));

// Две следующих настройки нужны для того, чтобы мы могли вытащить тело POST-запроса
// Это нужно не всегда (всё зависит от того, как клиент отправляет запросы),
// но пока будем использовать всегда — на всякий случай

// Распознавание входящего объекта в POST-запросе в виде строк или массивов
app.use(express.urlencoded({ extended: true }));
// Распознавание входящего объекта в POST-запросе как объекта JSON
app.use(express.json());

// Подключаем папку public со статическими файлами (картинки, стили и т.д.)
app.use(express.static(path.join(__dirname, 'public')));

// Отображаем главную страницу с использованием шаблона "index.hbs"
app.get('/', (req, res) => {
  res.render('index', req.query);
});

//мой код
app.get('/', (req, res) => {
  const { signText } = req.query;
  res.render('index', { signText });
});

// app.get('/cheers', (req, res) => {
//   res.render('/', { signText });
// });

// //мой код 2
// app.post('/cheers', (req, res) => {
//   const signText = req.body.cheer_name;
//   // console.log(typeof req.body.cheer_name);
//   // res.render('index', { signText: x, secondVar: '2' });
//   res.render('index', { signText });
// });
app.post('/cheers', (req, res) => {
  const signText = req.body.cheer_name;
  let searchedKey = Object.keys(mascot).find((el)=>el===signText);
  let result;
  if (searchedKey === undefined) { result = '( ╯°□°)╯'} else {result = mascot[searchedKey]
};
  // console.log(result);
  // console.log(typeof req.body.cheer_name);
  // res.render('index', { signText: x, secondVar: '2' });
  res.render('index', { signText: result });
  res.redirect(`http://localhost:3000?signText=${result}`);
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
