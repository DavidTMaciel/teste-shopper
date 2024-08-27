class ErrorEntity {
    public error_code: string
    public error_description: string

    constructor(error_code: string, error_description: string) {
        this.error_code = error_code
        this.error_description = error_description
    }

}

export {
    ErrorEntity
}