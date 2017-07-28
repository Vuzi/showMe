import { ErrorCode, UNKNOWN } from './errorCode'

export interface Exception {
	error: Error
	code: ErrorCode
	detail: any
}

export interface ApiError extends Exception {
	status: number
}


function isException(object: any): object is Exception {
  return object && object.error !== undefined;
}


export function fail(error: Error | Exception | string, code?: ErrorCode, detail?: any): Exception {
	if (error instanceof Error) {
		return {
			error,
			code : code || UNKNOWN,
			detail
		}
	} else if(isException(error)) {
		return error // Do not wrap
	} else {
		return {
			error: Error(error),
			code : code || UNKNOWN,
			detail
		}
	}
}

export function reject(status: number, error: Error | Exception | string, code?: ErrorCode, detail?: any): ApiError {
	return {
		status,
		...fail(error, code, detail)
	}
}
