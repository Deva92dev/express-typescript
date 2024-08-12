import express, { Request, Response } from 'express';

const app = express();
// tell express to use json bodies
app.use(express.json());

// payload means data like json payload means json data
app.route('/').get((req: Request, res: Response) => {
  return res.send('You make a get request');
});

app.listen(5000, () => {
  return console.log(`Port is listening on 5000`);
});
