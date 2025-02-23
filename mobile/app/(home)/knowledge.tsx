// app/(home)/knowledge.tsx
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { data } from './data'
import { Phone, Tag, ChevronRight } from 'lucide-react-native'

export default function KnowledgeScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 30 }}>
      {/* Header */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: '600', marginBottom: 10 }}>Knowledge</Text>
        <Text style={{ fontSize: 16, color: '#666' }}>
          Manage your contacts and topics of interest
        </Text>
      </View>

      {/* Contacts Section */}
      <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: '600', 
          marginBottom: 15,
          color: '#333' 
        }}>
          Your Contacts
        </Text>
        
        {data.contacts.map((contact, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              paddingHorizontal: 15,
              backgroundColor: '#f8f9fa',
              borderRadius: 12,
              marginBottom: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }}>
            {/* Contact Circle */}
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#e9ecef',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12
            }}>
              <Text style={{ fontSize: 18, fontWeight: '500' }}>
                {contact.name[0]}
              </Text>
            </View>

            {/* Contact Info */}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 4 }}>
                {contact.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: '#666', marginRight: 12 }}>
                  {contact.relationship}
                </Text>
                <Phone size={14} color="#666" />
              </View>
            </View>

            <ChevronRight size={20} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Topics Section */}
      <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: '600', 
          marginBottom: 15,
          color: '#333' 
        }}>
          Your Topics
        </Text>

        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          gap: 10 
        }}>
          {data.topics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: '#f1f3f5',
                borderRadius: 20,
                gap: 6
              }}>
              <Tag size={16} color="#666" />
              <Text style={{ 
                fontSize: 14, 
                color: '#495057',
                fontWeight: '500'
              }}>
                {topic}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}