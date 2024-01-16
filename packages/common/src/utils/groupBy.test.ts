import { groupBy } from './groupBy';
import { describe, it, expect } from 'vitest';

type Person = {
  name: string;
  age: number;
};

const people: Person[] = [
  {
    name: 'Kevin R',
    age: 25,
  },
  {
    name: 'Susan S',
    age: 18,
  },
  {
    name: 'Julia J',
    age: 18,
  },
  {
    name: 'Sarah C',
    age: 25,
  },
];

describe('groupBy', () => {
  it('should sort by string field', () => {
    const results = groupBy(people, (i) => i.name);
    expect(results).toStrictEqual({
      'Julia J': [
        {
          age: 18,
          name: 'Julia J',
        },
      ],
      'Kevin R': [
        {
          age: 25,
          name: 'Kevin R',
        },
      ],
      'Sarah C': [
        {
          age: 25,
          name: 'Sarah C',
        },
      ],
      'Susan S': [
        {
          age: 18,
          name: 'Susan S',
        },
      ],
    });
  });

  it('should sort numeric field', () => {
    const results = groupBy(people, (i) => i.age);
    expect(results).toEqual({
      18: [
        {
          age: 18,
          name: 'Susan S',
        },
        {
          age: 18,
          name: 'Julia J',
        },
      ],
      25: [
        {
          age: 25,
          name: 'Kevin R',
        },
        {
          age: 25,
          name: 'Sarah C',
        },
      ],
    });
  });
});
