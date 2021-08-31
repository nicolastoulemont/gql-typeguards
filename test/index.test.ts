import {
  isType,
  isEither,
  isNot,
  isTypeInTuple,
  isEitherTypesInTuple,
  isNotTypesInTuple,
} from '../src';

describe('Testing typename related helpers', () => {
  const one = {
    __typename: 'User',
  } as const;
  const two = {
    __typename: 'DeletedUser',
  } as const;
  const three = {
    __typename: 'InactiveUser',
  } as const;

  const userOrDeletedUserUnion = {
    __typename: 'User',
  } as { __typename: 'User' } | { __typename: 'DeletedUser' };

  const userOrDeletedArray = [one, two];
  const userOrDeletedOrInactiveArray = [one, two, three];

  it('isType', () => {
    expect(isType(one, 'User')).toBe(true);
    // @ts-expect-error
    expect(isType(two, 'User')).toBe(false);
    expect(isType(two, 'DeletedUser')).toBe(true);
    // @ts-expect-error
    expect(isType(two, 'User')).toBe(false);
  });
  it('isEither', () => {
    expect(isEither(userOrDeletedUserUnion, ['User', 'DeletedUser'])).toBe(
      true
    );
    // @ts-expect-error
    expect(isEither(userOrDeletedUserUnion, ['User', 'BannedUser'])).toBe(true);
    // @ts-expect-error
    expect(isEither(userOrDeletedUserUnion, ['BannedUser'])).toBe(false);
  });
  it('isNot', () => {
    // @ts-expect-error
    expect(isNot(userOrDeletedUserUnion, ['BannedUser'])).toBe(true);
    // @ts-expect-error
    expect(isNot(userOrDeletedUserUnion, ['User', 'BannedUser'])).toBe(false);
  });
  it('isTypeInTuple', () => {
    const user = userOrDeletedArray.filter(isTypeInTuple('User'));
    const deletedUser = userOrDeletedArray.filter(isTypeInTuple('DeletedUser'));
    // @ts-expect-error
    const bannedUser = userOrDeletedArray.filter(isTypeInTuple('BannedUser'));
    expect(user.length).toBe(1);
    expect(deletedUser.length).toBe(1);
    expect(bannedUser.length).toBe(0);
  });
  it('isEitherTypesInTuple', () => {
    const userAndDeletedUser = userOrDeletedOrInactiveArray.filter(
      isEitherTypesInTuple(['User', 'DeletedUser'])
    );
    const deletedUser = userOrDeletedOrInactiveArray.filter(
      isEitherTypesInTuple(['DeletedUser'])
    );
    const user = userOrDeletedOrInactiveArray.filter(
      isEitherTypesInTuple(['User'])
    );

    const bannedUser = userOrDeletedOrInactiveArray.filter(
      // @ts-expect-error
      isEitherTypesInTuple(['BannedUser'])
    );
    expect(userAndDeletedUser.length).toBe(2);
    expect(user.length).toBe(1);
    expect(deletedUser.length).toBe(1);
    expect(bannedUser.length).toBe(0);
  });

  it('isNotTypesInTuple', () => {
    const notUserAndDeletedUser = userOrDeletedOrInactiveArray.filter(
      isNotTypesInTuple(['User', 'DeletedUser'])
    );

    const notDeletedUser = userOrDeletedOrInactiveArray.filter(
      isNotTypesInTuple(['DeletedUser'])
    );
    const notUser = userOrDeletedOrInactiveArray.filter(
      isNotTypesInTuple(['User'])
    );
    const bannedUser = userOrDeletedOrInactiveArray.filter(
      // @ts-expect-error
      isNotTypesInTuple(['BannedUser'])
    );
    expect(notUserAndDeletedUser.length).toBe(1);
    expect(notUser.length).toBe(2);
    expect(notDeletedUser.length).toBe(2);
    expect(bannedUser.length).toBe(3);
  });
});
