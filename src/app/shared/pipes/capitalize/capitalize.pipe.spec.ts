import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize the first letter of a string', () => {
    const input = 'hello world';
    const expectedOutput = 'Hello world';
    const output = pipe.transform(input);
    expect(output).toEqual(expectedOutput);
  });

  it('should not modify empty strings', () => {
    const input = '';
    const expectedOutput = '';
    const output = pipe.transform(input);
    expect(output).toEqual(expectedOutput);
  });
});
