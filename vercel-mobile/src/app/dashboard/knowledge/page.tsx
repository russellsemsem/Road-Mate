'use client';

import React from 'react';
import { PlusCircle, Edit, Trash, X } from 'lucide-react';

export default function Knowledge() {
  const data = {
    "topics": ["Basketball", "History", "Music", "Technology", "Literature"],
    "contacts": [
      {
        "name": "Kayla Smith",
        "relationship": "Mother",
        "phone-number": "555-123-4567"
      },
      {
        "name": "Maria Garcia",
        "relationship": "Sister",
        "phone-number": "555-234-5678"
      },
      {
        "name": "David Lee",
        "relationship": "Brother",
        "phone-number": "555-345-6789"
      },
      {
        "name": "Sarah Wilson",
        "relationship": "Friend",
        "phone-number": "555-456-7890"
      },
      {
        "name": "Tom Anderson",
        "relationship": "Friend",
        "phone-number": "555-567-8901"
      }
    ]
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 pb-20">
      
      <div className="rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Topics</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm flex items-center hover:bg-blue-600">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Topic
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.topics.map((topic, index) => (
            <div 
              key={index} 
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-lg"
            >
              {topic}
              <button className="hover:bg-blue-200 rounded-full p-1">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className=" rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Contacts</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm flex items-center hover:bg-blue-600">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Contact
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.contacts.map((contact, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="space-y-1">
                <h3 className="font-medium text-blue-800">{contact.name}</h3>
                <div className="flex gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {contact.relationship}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {contact["phone-number"]}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded">
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}