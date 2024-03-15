const mockFetch = (referenceUrl: string, status: number, data: object = {}) => {
  jest.spyOn(global, 'fetch').mockImplementationOnce(
    jest.fn((url: string) =>
      Promise.resolve({
        status,
        json: () => {
          if (url === referenceUrl) {
            return Promise.resolve(data)
          }
          return Promise.resolve({ data: 100 })
        },
      }),
    ) as jest.Mock,
  )
}

export default mockFetch
