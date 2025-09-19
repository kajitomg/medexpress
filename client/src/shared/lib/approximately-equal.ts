export const approximatelyEqual = (
  num1: number,
  num2: number,
  epsilon: number = 0.0001
) => {
  return Math.abs(num1 - num2) < epsilon
}
