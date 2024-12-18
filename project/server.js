const express = require('express');
const mongoose = require('mongoose');
const readline = require('readline');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/hotels-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.log('Failed to connect to MongoDB', err);
});

// Создаем схему и модель для коллекции 'hotels'
const hotelSchema = new mongoose.Schema({
  web: String,
  name: String,
  description: String,
  number: String,
  mail: String,
  vk: String,
  region: String,
  city: String,
  address: String
});

const HotelModel = mongoose.model('Hotel', hotelSchema);

// Этот middleware позволяет серверу принимать данные в формате JSON
app.use(express.json());

// Поиск отелей по региону
app.get('/search', async (req, res) => {
  const region = req.query.region;
  try {
    const hotels = await HotelModel.find({ region: region }); // Найдем максимум 4 отеля
    res.json(hotels);
  } catch (err) {
    res.status(500).send('Error searching hotels');
  }
});

// Запуск сервера
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Создаем интерфейс для чтения ввода с консоли
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Обработка команды "exit"
rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    console.log('Shutting down the server...');
    server.close(async () => {
      try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
      } catch (error) {
        console.error('Error closing database connection', error);
        process.exit(1);
      }
    });
  }
});

// Ctrl + C
process.on('SIGINT', async () => {
  console.log('Closing the server by Ctrl+C');
  server.close(async () => {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
      process.exit(0);
    } catch (error) {
      console.error('Error closing database connection', error);
      process.exit(1);
    }
  });
});