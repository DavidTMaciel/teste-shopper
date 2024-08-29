class StorageLocal {
    public generateTemporaryLink(fileName: string): string {
        const baseUrl = 'http://localhost:3000/static'
        return `${baseUrl}/${fileName}`
    }
}

const storageLocal = new StorageLocal()

export {
    storageLocal
}