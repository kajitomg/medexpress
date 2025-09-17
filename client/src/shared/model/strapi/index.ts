export type ExtractByComponent<
  E extends { __component: string },
  T extends E["__component"],
> = Extract<E, { __component: T }>
