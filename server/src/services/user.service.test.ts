import { expect, test, vi } from 'vitest';
import {
  createUser,
  findUniqueUser,
  findUser,
  signTokens,
  updateUser,
} from './user.service';
import { Prisma, RoleEnumType } from '@prisma/client';
import prisma from '../libs/__mocks__/prisma';

vi.mock('../libs/prisma');

test('createUser should return the generated user', async () => {
  const newUser: Prisma.UserCreateInput = {
    email: 'judy@judges.com',
    name: 'Judy',
    password: 'password123',
    username: 'JudgeJudy',
  };

  const createdAt = new Date();
  const updatedAt = new Date();
  prisma.user.create.mockResolvedValue({
    ...newUser,
    id: '1',
    createdAt: createdAt,
    updatedAt: updatedAt,
    photo: 'default.png',
    verified: false,
    verificationCode: null,
    role: 'user',
    provider: null,
    passwordResetToken: null,
    passwordResetAt: null,
  });

  const user = await createUser(newUser);

  expect(user).toStrictEqual({
    ...newUser,
    id: '1',
    createdAt: createdAt,
    updatedAt: updatedAt,
    photo: 'default.png',
    verified: false,
    verificationCode: null,
    role: 'user',
    provider: null,
    passwordResetToken: null,
    passwordResetAt: null,
  });
});

test('createUser should throw an error if the email is already taken', async () => {
  const newUser: Prisma.UserCreateInput = {
    email: 'user@test.com',
    name: 'Pete Rose',
    password: 'password123',
    username: 'headfirstslide',
  };

  prisma.user.create.mockRejectedValue(new Error('Email already taken'));

  await expect(createUser(newUser)).rejects.toThrow('Email already taken');

  expect(prisma.user.create).toHaveBeenCalledWith({
    data: newUser,
  });

  expect(prisma.user.create).toHaveBeenCalledTimes(1);
});

test('createUser should throw an error if the username is already taken', async () => {
  const newUser: Prisma.UserCreateInput = {
    email: 'user@test.com',
    name: 'Pete Rose',
    password: 'password123',
    username: 'headfirstslide',
  };

  prisma.user.create.mockRejectedValue(new Error('Username already taken'));

  await expect(createUser(newUser)).rejects.toThrow('Username already taken');

  expect(prisma.user.create).toHaveBeenCalledWith({
    data: newUser,
  });

  expect(prisma.user.create).toHaveBeenCalledTimes(1);
});

test('findUser should return the user', async () => {
  const createdAt = new Date();
  const updatedAt = new Date();
  const user = {
    email: 'user@test.com',
    name: 'Pete Rose',
    password: 'password123',
    username: 'headfirstslide',
    id: '1',
    createdAt: createdAt,
    updatedAt: updatedAt,
    photo: 'default.png',
    verified: false,
    verificationCode: null,
    role: RoleEnumType.user,
    provider: null,
    passwordResetToken: null,
    passwordResetAt: null,
  };

  prisma.user.findFirst.mockResolvedValue(user);
  const foundUser = await findUser({ id: '1' });
  expect(foundUser).toStrictEqual(user);
});

test('findUniqueUser should return the user', async () => {
  const createdAt = new Date();
  const updatedAt = new Date();
  const user = {
    email: 'user@test.com',
    name: 'Pete Rose',
  };

  prisma.user.findUnique.mockResolvedValue({
    ...user,
    id: '1',
    username: 'headfirstslide',
    createdAt: createdAt,
    updatedAt: updatedAt,
    photo: 'default.png',
    verified: false,
    verificationCode: null,
    role: RoleEnumType.user,
    password: 'password123',
    provider: null,
    passwordResetToken: null,
    passwordResetAt: null,
  });

  const foundUser = await findUniqueUser({ id: '1' });
  expect(foundUser).toMatchObject({
    ...user,
    id: '1',
    username: 'headfirstslide',
  });
});

test('updateUser should return the updated user', async () => {
  const createdAt = new Date();
  const updatedAt = new Date();

  const user = {
    email: 'user@test.com',
    name: 'Pete Rose',
    verified: true,
    id: '1',
    username: 'headfirstslide',
    createdAt: createdAt,
    updatedAt: updatedAt,
    photo: 'default.png',
    verificationCode: null,
    role: RoleEnumType.user,
    password: 'password123',
    provider: null,
    passwordResetToken: null,
    passwordResetAt: null,
  };

  prisma.user.update.mockResolvedValue(user);

  const updatedUser = await updateUser({ id: '1' }, { verified: true });

  expect(updatedUser).toStrictEqual(user);
});

test.skip('signTokens should return the access and refresh tokens', async () => {
  const user = {
    email: 'user@test.com',
    name: 'Pete Rose',
    id: '1',
    username: 'headfirstslide',
    password: 'password123',
  };

  const { access_token, refresh_token } = await signTokens(user);

  expect(access_token).toBeDefined();
  expect(refresh_token).toBeDefined();
});
