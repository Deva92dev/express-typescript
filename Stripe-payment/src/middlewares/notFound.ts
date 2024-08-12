import express from 'express';

export const notFound = (req: express.Request, res: express.Response) =>
  res.status(404).json('Route does not exist');
