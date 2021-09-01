# Gql-Typeguards

Gql-typeguards is a set of helpers typeguards functions aiming to improve the DX of GraphQL and Typescript projects.

## Installation

```bash
npm i gql-typeguards
or
yarn add gql-typeguards
```

## Functions

- isType()

```typescript
interface Object extends {
  name: 'object',
  __typename:  'Object'
}
interface OtherObject extends {
  title: 'other object',
  __typename: 'OtherObject'
}

isType(object,'__typenameValue'):boolean

// Usage
// type object = Object | OtherObject
if(isType(object, 'Object')) {
  // object.name will be infered as valid
}

```

- isEither()

```typescript
interface Object extends {
    name: 'object',
  __typename: 'Object'
}
interface OtherObject extends {
   name: 'other object',
  __typename: 'OtherObject'
}
interface AnotherObject extends {
   title: 'another object',
  __typename: 'AnotherObject'
}
// type object = Object | OtherObject | AnotherObject
isEither(object, ['Object', 'OtherObject']):boolean

// Usage
if(isEither(object, ['Object', 'OtherObject'])) {
  // object.name will be infered as valid
  // object.tile will be infered as undefined
}
```

- isNot()

```typescript
interface Object extends {
    name: 'object',
  __typename: 'Object'
}
interface OtherObject extends {
   name: 'other object',
  __typename: 'OtherObject'
}
interface AnotherObject extends {
   title: 'another object',
  __typename: 'AnotherObject'
}
// type object = Object | OtherObject | AnotherObject
isNot(object, ['Object', 'OtherObject']):boolean
// Usage
if(isNot(object, ['Object', 'OtherObject'])) {
  // object.name will be infered as undefined
  // object.tile will be infered as valid
}
```

- isTypeInTuple()

```typescript
interface Object extends {
  name: 'object',
  __typename: 'Object'
}
interface OtherObject extends {
  title: 'other object',
  __typename: 'OtherObject'
}
// type tuple = Array<Object | OtherObject>
const typedArrayOfObject = tuple.filter(isTypeInTuple('Object'))
const typedArrayfOtherObject = tuple.filter(isTypeInTuple('OtherObject'))

// Possible undefined
tuple[0].name
tuple[0].title

// Infered as valid
typedArrayOfObject[0].name

// Infered as valid
typedArrayfOtherObject[0].title
```

- isEitherTypesInTuple()

```typescript
interface Object extends {
  name: 'object',
  __typename: 'Object'
}
interface OtherObject extends {
  title: 'other object',
  __typename: 'OtherObject'
}

interface ThirdObject extends {
  content: 'third object',
  __typename: 'ThirdObject'
}

// type tuple = Array<Object | OtherObject | ThirdObject>
const typedArrayOfObjectOrOtherObject = tuple.filter(isEitherTypesInTuple(['Object', 'OtherObject']))

// Possible undefined
tuple[0].name
tuple[0].title

// Infered as valid
typedArrayOfObjectOrOtherObject[0].name

// Infered as valid
typedArrayOfObjectOrOtherObject[0].title

// Infered as invalid
typedArrayOfObjectOrOtherObject[0].content
```

- isNotTypesInTuple()

```typescript
interface Object extends {
  name: 'object',
  __typename: 'Object'
}
interface OtherObject extends {
  title: 'other object',
  __typename: 'OtherObject'
}

interface ThirdObject extends {
  content: 'third object',
  __typename: 'ThirdObject'
}

// type tuple = Array<Object | OtherObject | ThirdObject>
const typedArrayOfObjectOrOtherObject = tuple.filter(isNotTypesInTuple(['Object', 'OtherObject']))

// Possible undefined
tuple[0].name
tuple[0].title

// Infered as invalid
typedArrayOfObjectOrOtherObject[0].name

// Infered as invalid
typedArrayOfObjectOrOtherObject[0].title

// Infered as valid
typedArrayOfObjectOrOtherObject[0].content
```
