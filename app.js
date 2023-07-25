const express =require('express');
const cors = require('cors');

const itemsData = require('./itemsData.json');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
res.status(200).json({data: 'Service is running'})
})

app.get('/items', (req, res) => {
    try {
      const { items } = itemsData;
      res.status(200).json({ data: items });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.get('/items/:id', (req, res) => {
    try {
      const { id } = req.params;
      const { items } = itemsData;
  
      const item = items.find((el) => el.id === id);
      if (item) {
        return res.status(200).json({ data: item });
      }
      res.status(404).json({ error: `Could not find item with id ${id}` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = app;