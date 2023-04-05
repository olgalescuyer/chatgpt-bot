import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.post('/', async (req, res) => {
  const { messages } = req.body;

  console.log('======================', messages);

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are DesignGPT helpful assistant ux design chatbot',
      },
      ...messages,
      // { role: 'user', content: `${messages}` },
    ],
  });

  res.json({
    completion: completion.data.choices[0].message,
  });
});

// console.log(completion.data.choices[0].message);

app.listen(port, () => {
  console.log(`listenning at http://localhost:${port}`);
});
