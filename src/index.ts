export type GraphQLResult = { __typename: string };
export type ValueOfTypename<T extends GraphQLResult> = T['__typename'];

export function isType<
  Result extends GraphQLResult,
  Typename extends ValueOfTypename<Result>
>(
  result: Result,
  typename: Typename
): result is Extract<Result, { __typename: Typename }> {
  return result?.__typename === typename;
}

export function isEither<
  Result extends GraphQLResult,
  Typename extends ValueOfTypename<Result>,
  PossibleTypes extends Array<Typename>
>(
  result: Result,
  typenames: PossibleTypes
): result is Extract<Result, { __typename: typeof typenames[number] }> {
  const types = typenames?.filter(type => isType(result, type));
  return types ? types.length > 0 : false;
}

export function isNot<
  Result extends GraphQLResult,
  Typename extends ValueOfTypename<Result>,
  ExcludedTypes extends Array<Typename>
>(
  result: Result,
  typenames: ExcludedTypes
): result is Exclude<Result, { __typename: typeof typenames[number] }> {
  const types = typenames?.filter(type => isType(result, type));
  return types ? types.length === 0 : false;
}

export function isTypeInTuple<
  ResultItem extends GraphQLResult,
  Typename extends ValueOfTypename<ResultItem>
>(
  typename: Typename
): (o: ResultItem) => o is Extract<ResultItem, { __typename: Typename }> {
  return function(
    resultItem: ResultItem
  ): resultItem is Extract<ResultItem, { __typename: Typename }> {
    return isType(resultItem, typename);
  };
}

export function isEitherTypesInTuple<
  ResultItem extends GraphQLResult,
  Typename extends ValueOfTypename<ResultItem>,
  PossibleTypes extends Array<Typename>
>(
  typenames: PossibleTypes
): (
  o: ResultItem
) => o is Extract<ResultItem, { __typename: typeof typenames[number] }> {
  return function(
    resultItem: ResultItem
  ): resultItem is Extract<
    ResultItem,
    { __typename: typeof typenames[number] }
  > {
    return isEither(resultItem, typenames);
  };
}

export function isNotTypesInTuple<
  ResultItem extends GraphQLResult,
  Typename extends ValueOfTypename<ResultItem>,
  ExcludedTypes extends Array<Typename>
>(
  typenames: ExcludedTypes
): (
  o: ResultItem
) => o is Exclude<ResultItem, { __typename: typeof typenames[number] }> {
  return function(
    resultItem: ResultItem
  ): resultItem is Exclude<
    ResultItem,
    { __typename: typeof typenames[number] }
  > {
    return isNot(resultItem, typenames);
  };
}
