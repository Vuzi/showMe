
export interface RejectionError {
	error: Error
	status: number
	detail: any
}

export function reject(status: number, error: Error | string, detail?: any): RejectionError {

	if (error instanceof Error) {
		return {
			error,
			status,
			detail
		}
	} else {
		return {
			error: Error(error),
			status,
			detail
		}
	}

}

