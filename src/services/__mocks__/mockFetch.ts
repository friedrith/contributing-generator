const mockFetch = (url: string, status: number, data: object = {}) => {
  jest.spyOn(global, 'fetch').mockImplementationOnce(
    jest.fn((url: string) =>
      Promise.resolve({
        status,
        json: () => {
          if (url === url) {
            return Promise.resolve(data)
          }
          return Promise.resolve({ data: 100 })
        },
      }),
    ) as jest.Mock,
  )
}

export default mockFetch
