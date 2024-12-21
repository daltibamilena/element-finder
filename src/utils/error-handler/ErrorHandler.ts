import { BadRequestException, ForbiddenException } from '@nestjs/common'
import { ErrorMessages } from 'src/utils/error-handler/ErrorMessages'
import { AxiosError } from 'axios'

export default class ErrorHandler {
  static handleScrapingError({ message }: { message: string }) {
    return {
      message: ErrorMessages.ELEMENT_NOT_FOUND,
      errors: message,
    }
  }

  static handleAppError(error: AxiosError) {
    if (error.response?.status === 403)
      return new ForbiddenException({
        message: ErrorMessages.NETWORK_ERROR,
        errors: error.message,
      })
    
    return new BadRequestException({
      message: ErrorMessages.UNKNOWN_ERROR,
      errors: error.message,
    })
  }
}
