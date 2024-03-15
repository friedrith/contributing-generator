type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

const deepMerge = <T extends object>(
  obj1: T,
  obj2: DeepPartial<T> | Record<string, string>,
) => {
  const mergeValue = (value: unknown, newValue: unknown) => {
    if (typeof value === 'object' && typeof newValue === 'object') {
      return deepMerge(value, newValue)
    }

    if (newValue === undefined) {
      return value
    }

    return newValue
  }

  return Object.entries(obj1).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: mergeValue(value, obj2[key]),
    }),
    {},
  )
}

const buildMock =
  <T extends object>(defaultValue: T) =>
  (overrides?: DeepPartial<T>): T =>
    deepMerge(defaultValue, overrides ?? {})

export default buildMock
