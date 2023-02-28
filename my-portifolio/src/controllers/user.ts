import axios from 'axios';
import { User } from '@/models/user';

export async function getUser(): Promise<User> {

  const data = await axios.get<User>('https://api.github.com/users/LeonardoMachado30');

  return data.data;
}