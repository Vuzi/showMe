
export function filenameTrim(filename: string): string {
	return filename.substr(0, filename.lastIndexOf('.')) || filename
}

