export class linkNotFound extends Error {
    constructor(){
        super("The link was not found.")
    }
}