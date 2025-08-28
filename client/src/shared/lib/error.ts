import axios, { AxiosError, AxiosResponse, HttpStatusCode } from "axios"

const SERVICE_NAMES: Record<string, string> = {
  "/categories": "получения категорий",
}

export const HTTP_ERROR_DESCRIPTIONS: Partial<
  Record<HttpStatusCode, (serviceName: string, methodName: string) => string>
> = {
  [HttpStatusCode.BadRequest]: (serviceName: string, methodName: string) =>
    `Сервис ${serviceName} не смог понять запрос метода ${methodName} из-за некорректного синтаксиса`,
  [HttpStatusCode.ServiceUnavailable]: (serviceName: string) =>
    `Сервис ${serviceName} не доступен`,
}

export interface ErrorsModel {
  errors: Record<string, string[]>
}

export interface MessageErrorModel {
  message: string
}

export const ERROR_DESCRIPTIONS: Record<
  string,
  (serviceName: string) => string
> = {
  [AxiosError.ERR_CANCELED]: (serviceName) =>
    `Запрос к сервису ${serviceName} отменен пользователем`,
}

export class ErrorUtils {
  static async getErrors(error: unknown): Promise<string[]> {
    let errorMessages: string[]

    if (axios.isAxiosError(error)) {
      const serviceName = this._getServiceName(
        error.config?.baseURL,
        error.config?.url
      )

      if (error?.response) {
        errorMessages = await this._getResponseErrors(
          error.response,
          error.message,
          serviceName
        )
      } else if (error?.request) {
        errorMessages = this._getRequestErrors(serviceName, error.code)
      } else {
        errorMessages = [
          `Не удалось отправить запрос к сервису ${serviceName}: ${error.message}`,
        ]
      }
    } else {
      errorMessages = this._handleNotAxiosError(error)
    }

    return this._processErrorMessages(errorMessages)
  }

  private static async _getResponseErrors(
    response: AxiosResponse,
    message: string,
    serviceName: string
  ): Promise<string[]> {
    const methodName = response.config?.description || ""

    const errorMessages = await this._tryGetErrorFromData(response)
    if (errorMessages && typeof errorMessages !== "number") {
      return errorMessages
    }

    const getErrorMessageFn =
      HTTP_ERROR_DESCRIPTIONS[response.status as HttpStatusCode]
    if (getErrorMessageFn) {
      return [getErrorMessageFn(serviceName, methodName)]
    }

    return [
      `При вызове метода ${methodName} произошла ошибка при получении ответа от сервиса ${serviceName}: ${message}`,
    ]
  }

  private static _getServiceName(baseURL?: string, url?: string): string {
    const serviceUrl = (baseURL || "") + (url || "")
    for (const key in SERVICE_NAMES) {
      if (serviceUrl.indexOf(key) !== -1) {
        return SERVICE_NAMES[key]
      }
    }

    return ""
  }

  private static async _tryGetErrorFromData(response: AxiosResponse) {
    if (!response.data) {
      return undefined
    }

    let errorMessages = new Array<string>()

    const errors = (response.data as ErrorsModel).errors
    if (errors) {
      for (const errorKey in errors) {
        const errorValue = errors[errorKey]
        errorMessages = errorMessages.concat(errorValue)
      }
      return errorMessages
    }

    const errorMessage = (response.data as MessageErrorModel).message
    if (errorMessage) {
      return errorMessages.push(errorMessage)
    }

    return undefined
  }

  private static _getRequestErrors(serviceName: string, code?: string) {
    if (code) {
      const errorMessage = ERROR_DESCRIPTIONS[code]?.(serviceName)
      if (errorMessage) {
        return [errorMessage]
      }
    }

    return [`Не удалось получить ответ от сервиса ${serviceName}`]
  }

  private static _handleNotAxiosError(error: unknown): string[] {
    if (error instanceof Error) {
      return [`Ошибка на стороне клиента: ${error.message}`]
    }

    return typeof error === "string" ? [error] : ["Ошибка на стороне клиента"]
  }

  private static _processErrorMessages(messages: string[]): string[] {
    const resultMessages: string[] = []
    messages.forEach((message) =>
      resultMessages.push(message.replace("  ", " ").trim())
    )
    return resultMessages
  }
}
