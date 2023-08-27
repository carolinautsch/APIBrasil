// app.js
const express = require('express');
const axios = require('axios');
const { Sequelize, DataTypes } = require('sequelize');

// Configuração do banco de dados SQL Server
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
    },
  },
});

// Definição do modelo para os logs de erro
const ErrorLog = sequelize.define('ErrorLog', {
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Definição do modelo para os dados climáticos
const WeatherData = sequelize.define('WeatherData', {
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // Outras colunas...
});

const app = express();
const PORT = process.env.PORT || 3000;

// Rota para obter o clima da cidade
app.get('/weather/city/:cityName', async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const response = await axios.get(`https://api.brasilapi.com.br/weather/${cityName}`);
    const weatherData = response.data;

    // Persiste os dados no banco de dados
    await WeatherData.create({
      city: cityName,
      temperature: weatherData.temperature,
    });

    res.json(weatherData);
  } catch (error) {
    // Salva o log de erro no banco de dados
    await ErrorLog.create({
      message: error.message,
    });

    res.status(500).json({ error: 'Erro ao obter dados climáticos da cidade.' });
  }
});

// Rota para obter o clima do aeroporto
app.get('/weather/airport/:airportCode', async (req, res) => {
    try {
      const airportCode = req.params.airportCode;
      const response = await axios.get(`https://api.brasilapi.com.br/weather/airport/${airportCode}`);
      const weatherData = response.data;
  
      // Persiste os dados no banco de dados
      await WeatherData.create({
        city: airportCode, // Pode ser o código do aeroporto ou outra informação relevante
        temperature: weatherData.temperature,
      });
  
      res.json(weatherData);
    } catch (error) {
      // Salva o log de erro no banco de dados
      await ErrorLog.create({
        message: error.message,
      });
  
      res.status(500).json({ error: 'Erro ao obter dados climáticos do aeroporto.' });
    }
  });
  

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  sequelize.sync(); // Sincroniza os modelos com o banco de dados
});
