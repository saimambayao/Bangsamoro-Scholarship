import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, FileText, MoreVertical, Search, Upload } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import '../../global.css';

const MOCK_DOCS = [
    { id: '1', name: 'Transcript_of_Records.pdf', size: '2.4 MB', type: 'PDF', date: 'Jan 20, 2026' },
    { id: '2', name: 'Birth_Certificate.png', size: '1.8 MB', type: 'Image', date: 'Jan 15, 2026' },
    { id: '3', name: 'Residency_Certificate.pdf', size: '1.2 MB', type: 'PDF', date: 'Jan 18, 2026' },
];

export default function DocumentVaultScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <ArrowLeft size={24} color="#004d40" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900 flex-1">Document Vault</Text>
            </View>

            <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
                {/* Stats / Storage info */}
                <View className="bg-primary/5 p-6 rounded-[32px] mb-8">
                    <Text className="text-primary font-bold text-lg mb-1">Storage Used</Text>
                    <Text className="text-gray-500 text-sm mb-4">5.4 MB of 100 MB used</Text>
                    <View className="h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
                        <View className="h-full bg-primary w-[5.4%]" />
                    </View>

                    <View className="flex-row gap-3">
                        <Button className="flex-1 flex-row items-center justify-center h-12 rounded-xl">
                            <Camera size={18} color="#fff" className="mr-2" />
                            <Text className="text-white font-bold text-sm">Scan Doc</Text>
                        </Button>
                        <Button variant="outline" className="flex-1 flex-row items-center justify-center h-12 rounded-xl border-primary">
                            <Upload size={18} color="#004d40" className="mr-2" />
                            <Text className="text-primary font-bold text-sm">Upload</Text>
                        </Button>
                    </View>
                </View>

                {/* List Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-lg font-bold text-gray-900">Recent Uploads</Text>
                    <TouchableOpacity>
                        <Search size={20} color="#9ca3af" />
                    </TouchableOpacity>
                </View>

                {/* Docs List */}
                {MOCK_DOCS.map((doc) => (
                    <View key={doc.id} className="flex-row items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-4">
                        <View className="w-12 h-12 bg-white rounded-xl items-center justify-center mr-4 border border-gray-100 shadow-sm">
                            <FileText size={24} color={doc.type === 'PDF' ? '#dc2626' : '#2563eb'} />
                        </View>

                        <View className="flex-1">
                            <Text className="font-bold text-gray-900 mb-0.5" numberOfLines={1}>
                                {doc.name}
                            </Text>
                            <Text className="text-xs text-gray-500">
                                {doc.size} • {doc.date}
                            </Text>
                        </View>

                        <TouchableOpacity className="p-2">
                            <MoreVertical size={20} color="#9ca3af" />
                        </TouchableOpacity>
                    </View>
                ))}

                <View className="h-12" />
            </ScrollView>
        </SafeAreaView>
    );
}
