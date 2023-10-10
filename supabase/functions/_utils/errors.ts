export class ApplicationError extends Error {
	constructor(
		message: string,
		public data: Record<string, unknown> = {},
	) {
		super(message)
	}
}

export class UserError extends ApplicationError {}
