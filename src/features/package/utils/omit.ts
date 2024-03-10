const omit = (object: object, keys: string[]) =>
  Object.entries(object).reduce((acc, [key, value]) => {
    if (keys.includes(key)) {
      return acc
    }

    return {
      ...acc,
      [key]: value,
    }
  }, {})

export default omit
