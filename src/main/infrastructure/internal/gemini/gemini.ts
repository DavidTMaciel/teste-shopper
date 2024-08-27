import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleAIFileManager } from '@google/generative-ai/server'
import { UploadFileResponse } from '../../../domain/entity/measure';

class GeminiService {
    private genAI: GoogleGenerativeAI
    private fileManager: GoogleAIFileManager

    constructor(apiKey: string) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.fileManager = new GoogleAIFileManager(apiKey);
    }

    public async uploadFile(image: string, displayName: string, mimeType: string): Promise<UploadFileResponse> {
        const uploadResponse = await this.fileManager.uploadFile(image, {
            mimeType,
            displayName,
        });
        return new UploadFileResponse(uploadResponse.file.mimeType, uploadResponse.file.uri)
    }

    public async getMesureFromImage(mimeType: string, fileUri: string, prompt: string): Promise<string> {
        const chatSession = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro", })
        const result = await chatSession.generateContent([
            {
                fileData:
                {
                    mimeType: mimeType,
                    fileUri: fileUri
                }
            }, prompt]);
        return result.response.text()
    }

    public async getFile(fileUri: string): Promise<string> {
        const fileResponse = await this.fileManager.getFile(fileUri)
        return fileResponse.uri
    }
}

const geminiService = new GeminiService(process.env.GEMINI_API_KEY!)

export{
    geminiService
}