export class insertError extends Error {
    constructor() {
        super('Error occurred during database insert.')
    }
}