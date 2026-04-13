export class duplicatedValue extends Error {
    constructor() {
        super('The "shortLink" alredys exists.')
    }
}