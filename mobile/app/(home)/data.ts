// app/(home)/data.ts
export interface Contact {
  name: string;
  relationship: string;
  "phone-number": string;
}

export const data = {
  "contacts": [
    {
      "name": "Sarah Chen",
      "relationship": "Sister",
      "phone-number": "+1 (555) 123-4567"
    },
    {
      "name": "Michael Rodriguez",
      "relationship": "Best Friend",
      "phone-number": "+1 (555) 234-5678"
    },
    {
      "name": "Emma Thompson",
      "relationship": "Mom",
      "phone-number": "+1 (555) 345-6789"
    },
    {
      "name": "David Park",
      "relationship": "College Friend",
      "phone-number": "+1 (555) 456-7890"
    },
    {
      "name": "Lisa Anderson",
      "relationship": "Cousin",
      "phone-number": "+1 (555) 567-8901"
    }
  ],
  "topics": [
    "Basketball",
    "Astrology",
    "Space",
    "History",
    "Music",
    "Cooking",
    "Technology",
    "Mental Health"
  ]
} as const;