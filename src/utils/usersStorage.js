import { DATABASE_KEY } from './../config';
import { getToken } from './tokenStorage';

export const getUsers = () => {
  const dataBase = localStorage.getItem(DATABASE_KEY) || JSON.stringify({});
  const dataBaseObj = JSON.parse(dataBase);
  const users = dataBaseObj.users || [];
  return users;
};

export const getUserIndex = (login) => {
  let users = getUsers();
  const index = users.findIndex(item => item.login === login);
  return index;
};

export const saveUsers = (users) => {
  localStorage.setItem(DATABASE_KEY, JSON.stringify({ users }));
};

export const getUserByLogin = (payload) => {
  const users = getUsers();
  const { login, password } = payload;
  
  return users.find(item => item.login === login && 
    item.password === password);
};

export const getUserByToken = () => {
  const users = getUsers();
  const token = getToken();
  return users.find(item => item.token === token);
};

export const setTokenToUser = (user, token) => {
  const { login } = user;
  const users = getUsers();
  const index = getUserIndex(login);

  user.token = token;
  users[index] = user;

  saveUsers(users);
};

export const removeTokenFromUser = (user) => {
  const { login } = user;
  const users = getUsers();
  const index = getUserIndex(login);
  
  user.token = '';
  users[index] = user;

  saveUsers(users);
};

export const isUserLoginIsset = (login) => {
  let users = getUsers();
  return !!users.find(item => item.login === login);
};

export const isUserEmailIsset = (email) => {
  let users = getUsers();
  return !!users.find(item => item.email === email);
};
