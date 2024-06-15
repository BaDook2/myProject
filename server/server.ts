import { Request, Response } from "express";

const express = require('express');
const app = express();
const path = require('path');

app.listen(1234, () => {
  console.log('listening on 1234');
})

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req: Request, res: Response)=>{
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})