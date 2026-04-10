export class duplicatedValue extends Error {
    constructor() {
        super('The "original" link alredys exists.')
    }
}