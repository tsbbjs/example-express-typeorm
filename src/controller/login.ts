import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { User } from '../entity/User';

export async function login(request: Request, response: Response) {
  const repository = getManager().getRepository(User);
  const posts = await repository.find();
  response.send(posts);
}