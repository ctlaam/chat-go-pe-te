import express from 'express';
import RequestHandler from "../../base";
import { streamingHandler } from './streaming';
import { basicHandler } from './basic';
import { config } from '../../../config';

export const endpoint = 'https://api.openai.com/v1/chat/completions';
export const apiKey = "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";

export default class OpenAIProxyRequestHandler extends RequestHandler {
    async handler(req: express.Request, res: express.Response) {
        if (req.body?.stream) {
            await streamingHandler(req, res);
        } else {
            await basicHandler(req, res);
        }
    }

    public isProtected() {
        return config.services?.openai?.loginRequired ?? true;
    }
}