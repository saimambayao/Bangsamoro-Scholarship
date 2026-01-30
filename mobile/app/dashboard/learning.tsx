import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Play, Download, BookOpen, Clock, ChevronRight } from 'lucide-react-native';
import '../../global.css';

const MOCK_COURSES = [
    {
        id: '1',
        title: 'Scholarship Success 101',
        instructor: 'Dr. Amina J.',
        duration: '45 mins',
        lessons: 5,
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop',
        progress: 75
    },
    {
        id: '2',
        title: 'Digital Literacy for Students',
        instructor: 'Prof. Khalid S.',
        duration: '1.5 hours',
        lessons: 8,
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
        progress: 10
    }
];

const MOCK_RESOURCES = [
    { name: 'Application Guide 2026', type: 'PDF', size: '1.5 MB' },
    { name: 'Interview Tips & Tricks', type: 'Video', size: '25 MB' },
    { name: 'Requirement Checklist', type: 'DOCX', size: '450 KB' },
];

export default function LearningScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <ArrowLeft size={24} color="#004d40" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900 flex-1">Learning Hub</Text>
            </View>

            <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
                {/* Featured Course */}
                <View className="mb-8">
                    <Text className="text-lg font-bold text-gray-900 mb-4">My Courses</Text>
                    {MOCK_COURSES.map((course) => (
                        <TouchableOpacity key={course.id} className="bg-gray-50 rounded-[32px] overflow-hidden border border-gray-100 mb-4">
                            <View className="h-32 w-full bg-gray-200">
                                <Image source={{ uri: course.thumbnail }} className="w-full h-full" resizeMode="cover" />
                                <View className="absolute inset-0 bg-black/20 items-center justify-center">
                                    <View className="w-10 h-10 rounded-full bg-white/30 backdrop-blur items-center justify-center">
                                        <Play size={20} color="#fff" fill="#fff" />
                                    </View>
                                </View>
                            </View>
                            <View className="p-5">
                                <Text className="font-bold text-gray-900 text-base mb-1">{course.title}</Text>
                                <Text className="text-xs text-gray-500 mb-4">{course.instructor} • {course.lessons} Lessons</Text>

                                <View className="flex-row items-center justify-between mb-2">
                                    <View className="h-1.5 flex-1 bg-gray-200 rounded-full mr-4 overflow-hidden">
                                        <View className="h-full bg-primary" style={{ width: `${course.progress}%` }} />
                                    </View>
                                    <Text className="text-xs font-bold text-primary">{course.progress}%</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Downloads / Offline Resources */}
                <View className="mb-12">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold text-gray-900">Offline Resources</Text>
                        <Text className="text-sm text-primary font-bold">View All</Text>
                    </View>

                    {MOCK_RESOURCES.map((res, i) => (
                        <TouchableOpacity key={i} className="flex-row items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-3">
                            <View className="w-10 h-10 bg-white rounded-xl items-center justify-center mr-4 border border-gray-100 shadow-sm">
                                <Download size={20} color="#004d40" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-bold text-gray-900 text-sm mb-0.5">{res.name}</Text>
                                <Text className="text-xs text-gray-500">{res.type} • {res.size}</Text>
                            </View>
                            <ChevronRight size={16} color="#9ca3af" />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
