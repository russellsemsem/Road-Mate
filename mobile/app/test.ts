// // test.ts
// import dotenv from 'dotenv';
// import { useElevenLabs } from './services/useElevenLabs';

// // Load environment variables from .env file
// dotenv.config();

// async function test() {
//     // Debug: Log the actual values (first few characters only for security)
//     const apiKey = process.env.EXPO_ELEVENLABS_API_KEY;
//     const agentId = process.env.EXPO_ELEVENLABS_AGENT_ID;
    
//     console.log('API Key:', apiKey ? `${apiKey.substring(0, 4)}...` : 'not found');
//     console.log('Agent ID:', agentId ? `${agentId.substring(0, 4)}...` : 'not found');

//     if (!apiKey || !agentId) {
//         console.error('Environment variables are not properly loaded!');
//         return;
//     }
    
//     const elevenLabs = useElevenLabs();
//     console.log('Testing ElevenLabs API...');
    
//     try {
//         const result = await elevenLabs.processKnowledgeBase();
//         console.log('Result:', result);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// test();