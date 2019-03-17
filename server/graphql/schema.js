import {queryType, stringArg, makeSchema} from 'nexus';

const Query = queryType({
  definition(t) {
    t.string('hello', {
      args: {name: stringArg({nullable: true})},
      resolve: (parent, {name}) => `Hello ${name || 'World'}!`,
    });
  },
});

// Recursively traverses the value passed to types looking for
// any valid Nexus or graphql-js objects to add to the schema,
// so you can be pretty flexible with how you import types here.
export const schema = makeSchema({
  types: [Query],
  outputs: {
    //   schema: __dirname + '/generated/schema.graphql',
    //   typegen: __dirname + '/generated/typings.ts',
  },
});
