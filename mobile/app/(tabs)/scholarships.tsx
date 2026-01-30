import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter } from 'lucide-react-native';
import { useState } from 'react';
import { SCHOLARSHIPS } from '../../constants/mock-data'; // Ensure this exists from previous step
import { ScholarshipCard } from '../../components/shared/ScholarshipCard';
import '../../global.css';

export default function ScholarshipsScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredScholarships, setFilteredScholarships] = useState(SCHOLARSHIPS);

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        if (text) {
            const filtered = SCHOLARSHIPS.filter((s) =>
                s.title.toLowerCase().includes(text.toLowerCase()) ||
                s.provider.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredScholarships(filtered);
        } else {
            setFilteredScholarships(SCHOLARSHIPS);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
            {/* Header */}
            <View className="px-6 py-4 bg-white border-b border-gray-100">
                <Text className="text-xl font-bold text-primary mb-4">Browse Scholarships</Text>

                <View className="flex-row gap-3">
                    <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 h-12 border border-gray-200">
                        <Search size={20} color="#9ca3af" />
                        <TextInput
                            className="flex-1 ml-2 text-base text-gray-800"
                            placeholder="Search programs..."
                            placeholderTextColor="#9ca3af"
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                    </View>
                    <TouchableOpacity className="w-12 h-12 bg-gray-100 items-center justify-center rounded-lg border border-gray-200">
                        <Filter size={20} color="#374151" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* List */}
            <FlatList
                data={filteredScholarships}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View className="mb-4">
                        <ScholarshipCard
                            id={item.id}
                            title={item.title}
                            provider={item.provider}
                            deadline={item.deadline}
                            tags={item.tags}
                            amount={item.amount}
                            featured={item.featured}
                        />
                    </View>
                )}
                ListEmptyComponent={
                    <View className="items-center justify-center py-20">
                        <Text className="text-gray-400 text-center">No scholarships found.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
