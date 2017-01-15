import createRT from '../src/index'

describe('redux-rt test', () => {
  it('createRT is a function', () => {
    expect(createRT).toBeInstanceOf(Function)
  })
})
