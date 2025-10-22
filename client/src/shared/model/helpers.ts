export type WithNamespace<T, K extends string> = {
  [P in K]: T
}
