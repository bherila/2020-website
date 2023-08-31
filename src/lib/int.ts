export default function assertInteger(input: any): number {
  if (typeof input === 'string') {
    const parsedInt = parseInt(input, 10)
    if (isNaN(parsedInt)) {
      throw new Error(`Invalid integer string: ${input}`)
    }
    return parsedInt
  } else if (typeof input === 'number') {
    if (Number.isInteger(input)) {
      return input
    }
    throw new Error(`Expected integer, but got ${input}`)
  } else {
    throw new Error(`Expected integer or string, but got ${input}`)
  }
}

/*
const value1 = '3.14'; // Throws an error
const value2 = 3.14; // Returns 3.14
const value3 = '3'; // Returns 3
const value4 = '3.0001'; // Returns 3
const value5 = '3.000001'; // Throws an error
decimalValue(value1); // Throws an error
decimalValue(value2); // Returns 3.14
decimalValue(value3); // Returns 3
decimalValue(value4); // Returns 3
decimalValue(value5); // Throws an error
*/
