import "axios"

declare module "axios" {
  export interface AxiosRequestConfig {
    description?: string
  }
}
