export class ApplicationError extends Error {
	constructor(
		message: string,
		public data: unknown = {},
	) {
		super(message)
	}
}

export class UserError extends ApplicationError {}
