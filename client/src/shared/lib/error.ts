const ErrorHandler = (e: unknown, serviceName?: string) => {
  if (e instanceof Error && e?.name === "AbortError") {
    throw new Error(`Запрос ${serviceName}: запрос был отменен`, e)
  } else if (e instanceof Error && e?.name === "TimeoutError") {
    throw new Error(`Запроса ${serviceName}: истекло время ожидания`, e)
  } else if (e instanceof TypeError) {
    throw new Error(`Запрос ${serviceName}: ошибка сети`, e)
  } else if (e instanceof SyntaxError) {
    throw new Error(`Запрос ${serviceName}: ошибка синтаксиса`, e)
  }
  throw new Error(`Запрос ${serviceName}: непредвиденная ошибка`)
}

export { ErrorHandler }
