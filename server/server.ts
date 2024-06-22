import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';  // dotenv 모듈 불러오기

dotenv.config();  // dotenv 초기화

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.listen(1234, () => {
  console.log('listening on 1234');
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});
