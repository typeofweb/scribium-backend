import * as bcrypt from 'bcrypt';

import { faker } from '@faker-js/faker/locale/pl';
import { PrismaClient } from '@prisma/client';

import type { Prisma, Role } from '@prisma/client';
import type { SexType } from '@faker-js/faker';

const USERS_LENGTH = 10;
const USER_PASSWORD = 'pass123';

const USER_ROLES: Role[] = ['STUDENT', 'TEACHER', 'ADMIN'];
const SEX: SexType[] = ['male', 'female'];
const PHONE_FORMAT = '#########';

const prisma = new PrismaClient();

const generateAddress = () =>
  `ul. ${faker.address.streetAddress()} ${faker.address.zipCode()} ${faker.address.city()}`;

(async () => {
  const usersData = Array.from<unknown, Prisma.UserCreateInput>(
    { length: USERS_LENGTH },
    (a, i) => ({
      email: faker.internet.email().toLowerCase(),
      password: bcrypt.hashSync(USER_PASSWORD, 10),
      roles: USER_ROLES[i % 3],
      details: {
        create: {
          firstName: faker.name.firstName(SEX[i % 2]),
          lastName: faker.name.lastName(SEX[i % 2]),
          address: generateAddress(),
          phone: faker.phone.number(PHONE_FORMAT),
        },
      },
    }),
  );

  const users = await Promise.all(
    usersData.map((data) => prisma.user.create({ data })),
  );

  const school = await prisma.school.create({
    data: {
      name: 'Liceum Ogólnokszałcące nr X im. Jana Kowalskiego w Warszawie',
      address: generateAddress(),
      phone: faker.phone.number(PHONE_FORMAT),
      email: 'lo10@edu.pl',
    },
  });

  const teachers = await Promise.all(
    users
      .filter(({ roles }) => roles.includes('ADMIN'))
      .map(({ id }) =>
        prisma.teacher.create({ data: { userId: id, schoolId: school.id } }),
      ),
  );

  await prisma.subject.createMany({
    data: [
      { title: 'Polski', description: 'opis', schoolId: school.id },
      { title: 'Metamatyka', description: 'opis', schoolId: school.id },
      { title: 'Biologia', description: 'opis', schoolId: school.id },
      { title: 'Chemia', description: 'opis', schoolId: school.id },
      { title: 'Fizyka', description: 'opis', schoolId: school.id },
      { title: 'Geografia', description: 'opis', schoolId: school.id },
      { title: 'Historia', description: 'opis', schoolId: school.id },
      {
        title: 'Wiedza o społeczeństwie',
        description: 'opis',
        schoolId: school.id,
      },
      { title: 'Informatyka', description: 'opis', schoolId: school.id },
      {
        title: 'Wychowanie fizyczne',
        description: 'opis',
        schoolId: school.id,
      },
    ],
  });

  const subjects = await prisma.subject.findMany();

  await prisma.teachersSubjects.createMany({
    data: subjects.map(({ id }, i) => ({
      subjectId: id,
      teacherId: teachers[i % teachers.length].id,
    })),
  });

  const classroom = await prisma.classroom.create({
    data: {
      name: 'a',
      year: 2020,
      schoolId: school.id,
      teacherId: teachers[0].id,
    },
  });

  await prisma.student.createMany({
    data: users
      .filter(({ roles }) => roles.includes('STUDENT'))
      .map(({ id }) => ({
        userId: id,
        schoolId: school.id,
        classroomId: classroom.id,
      })),
  });
})();
