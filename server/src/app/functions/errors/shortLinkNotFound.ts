export class shortLinkNotFound extends Error {
    constructor() {
        super("The short link was not found.")
    }
}