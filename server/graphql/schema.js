import {
  interfaceType,
  objectType,
  queryType,
  stringArg,
  makeSchema,
} from 'nexus';

import {User as UserModel} from '../models/user';

const Node = interfaceType({
  name: 'Node',
  definition(t) {
    t.id('id', {description: 'Unique identifier for the resource'});
    t.resolveType(() => null);
  },
});

const User = objectType({
  name: 'User',
  definition(t) {
    t.implements(Node);
    t.string('email');
    t.string('password');
  },
});

const Query = queryType({
  definition(t) {
    t.list.field('users', {
      type: User,
      args: {},
      async resolve(root, {}, ctx) {
        const users = await UserModel.find();
        return users;
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, User, Node],
  outputs: {},
});
