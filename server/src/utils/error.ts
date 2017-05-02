import { ErrorCode, UNKNOWN } from './errorCode'

export interface FailureError {
	error: Error
	code: ErrorCode
	detail: any
}

export interface RejectionError extends FailureError {
	status: number
}

export function fail(error: Error | string, code?: ErrorCode, detail?: any): FailureError {
	if (error instanceof Error) {
		return {
			error,
			code : code || UNKNOWN,
			detail
		}
	} else {
		return {
			error: Error(error),
			code : code || UNKNOWN,
			detail
		}
	}
}

export function reject(status: number, error: Error | string, code?: ErrorCode, detail?: any): RejectionError {
	return {
		status,
		...fail(error, code, detail)
	}
}
