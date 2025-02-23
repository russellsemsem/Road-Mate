// services/useElevenLabs.ts

import { data } from '../(home)/data';

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const useElevenLabs = () => {
    const ELEVEN_LABS_API_KEY = process.env.EXPO_ELEVENLABS_API_KEY;
    const ELEVEN_LABS_AGENT_ID = process.env.EXPO_ELEVENLABS_AGENT_ID;
    const uploadKnowledgeBase = async (): Promise<ApiResponse> => {
        try {
        const form = new FormData();
        
        // Convert our data object to a JSON string and append it as a file
        const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        form.append('file', jsonBlob, 'data.json');
        form.append('url', '');

        const response = await fetch('https://api.elevenlabs.io/v1/convai/knowledge-base', {
            method: 'POST',
            headers: {
            'xi-api-key': ELEVEN_LABS_API_KEY
            } as HeadersInit,
            body: form
        });

        const responseData = await response.json();
        return { success: true, data: responseData };
        } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to upload knowledge base'
        };
        }
    };

    const updateAgent = async (): Promise<ApiResponse> => {
        try {
        const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${ELEVEN_LABS_AGENT_ID}`, {
            method: 'PATCH',
            headers: {
            'xi-api-key': ELEVEN_LABS_API_KEY,
            'Content-Type': 'application/json'
            } as HeadersInit,
            body: '{}'
        });

        const responseData = await response.json();
        return { success: true, data: responseData };
        } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update agent'
        };
        }
    };

    const processKnowledgeBase = async (): Promise<ApiResponse> => {
        try {
        // Step 1: Upload knowledge base
        const uploadResult = await uploadKnowledgeBase();
        if (!uploadResult.success) {
            return uploadResult;
        }

        // Step 2: Update agent
        const updateResult = await updateAgent();
        return updateResult;

        } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Process failed'
        };
        }
    };

    return { processKnowledgeBase };
};