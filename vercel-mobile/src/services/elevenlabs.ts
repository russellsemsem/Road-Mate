// src/services/elevenlabs.ts
import { data } from './data';


// Define interfaces for the data structure
interface Contact {
  name: string;
  relationship: string;
  "phone-number": string;
}

interface DataStructure {
  topics: string[];
  contacts: Contact[];
}

// Function to convert JSON to plain text format
function jsonToPlainText(jsonData: DataStructure | string): string {
  const obj = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
  
  let text = 'Topics:\n';
  text += obj.topics.map((topic: string) => `- ${topic}`).join('\n');
  
  text += '\n\nContacts:\n';
  text += obj.contacts.map((contact: Contact) => 
    `- Name: ${contact.name}\n  Relationship: ${contact.relationship}\n  Phone: ${contact["phone-number"]}`
  ).join('\n\n');
  
  return text;
}

// Function to create text file
function createTextFile(content: string): File {
  const blob = new Blob([content], { type: 'text/plain' });
  return new File([blob], 'knowledge.txt', { type: 'text/plain' });
}

// Function to upload knowledge base
// Function to update agent
export async function updateAgent(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch(
      'https://api.elevenlabs.io/v1/convai/agents/t8oRb5fMcATNT0Zv6i0Z',
      {
        method: 'PATCH',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      }
    );

    console.log('Update agent response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error updating agent:', error);
    throw error;
  }
}


interface UploadResponse {
  success: boolean;
  id?: string;
  error?: string;
  status?: number;
}


// Function to fetch knowledge base
export async function fetchKnowledgeBase(apiKey: string, knowledgeBaseId: string): Promise<UploadResponse> {
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/knowledge-base/${knowledgeBaseId}`,
      {
        headers: {
          'xi-api-key': apiKey
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching knowledge base:', error);
    throw error;
  }
}

export async function uploadKnowledgeBase(apiKey: string): Promise<{ success: boolean; id?: string; error?: string; status?: number }> {
  console.log('uploadKnowledgeBase called');
  
  try {
    // Convert JSON to plain text
    const plainText = jsonToPlainText(data);
    console.log('Converted to plain text:', plainText);

    // Create text file
    const file = createTextFile(plainText);
    console.log('Created file:', {
      name: file.name,
      size: file.size,
      type: file.type
    });

    // Create FormData
    const formData = new FormData();
    formData.append('file', file);

    // Make API request
    const response = await fetch('https://api.elevenlabs.io/v1/convai/knowledge-base', {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey
      },
      body: formData
    });

    console.log('Response status:', response.status);
    const responseText = await response.text();
    console.log('Response body:', responseText);

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
        status: response.status
      };
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      return {
        success: false,
        error: 'Failed to parse response as JSON  BAKA',
        status: response.status
      };
    }

    return {
      success: true,
      id: result.id,
      status: response.status
    };

  } catch (error) {
    console.error('Error in uploadKnowledgeBase:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}