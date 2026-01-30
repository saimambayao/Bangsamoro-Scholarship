import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, CheckCircle2, XCircle, AlertCircle, FileText, MessageSquare } from 'lucide-react-native';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import '../../global.css';

export default function ApplicationDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // Mock application data - in real app, fetch by ID
    const application = {
        id: id,
        title: "Access to Higher Education (AHME)",
        provider: "MBHTE",
        status: "Under Review" as const,
        submittedAt: "Jan 15, 2026",
        lastUpdated: "Jan 28, 2026",
        timeline: [
            { status: "Submitted", date: "Jan 15, 2026", completed: true, description: "Your application was successfully received." },
            { status: "Document Verification", date: "Jan 20, 2026", completed: true, description: "All uploaded documents have been verified." },
            { status: "Initial Screening", date: "Jan 25, 2026", completed: true, description: "Eligibility check completed." },
            { status: "Technical Evaluation", date: "Jan 28, 2026", completed: false, description: "Committee is reviewing your academic records." },
            { status: "Final Approval", date: "TBD", completed: false, description: "Final decision pending." },
        ],
        documents: [
            { name: "Transcript of Records", status: "Verified" },
            { name: "Birth Certificate", status: "Verified" },
            { name: "Certificate of Indigency", status: "Verified" },
        ]
    };

    const getStatusIcon = (status: string, completed: boolean) => {
        if (completed) return <CheckCircle2 size={20} color="#059669" />;
        if (status === "Rejected") return <XCircle size={20} color="#dc2626" />;
        return <Clock size={20} color="#94a3b8" />;
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <ArrowLeft size={24} color="#004d40" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900 flex-1">Application Details</Text>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Status Summary */}
                <View className="p-6 bg-primary/5">
                    <Text className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">{application.provider}</Text>
                    <Text className="text-xl font-bold text-gray-900 mb-4">{application.title}</Text>

                    <View className="flex-row items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <View>
                            <Text className="text-xs text-gray-500 mb-1">Current Status</Text>
                            <Text className="text-lg font-bold text-gray-900">{application.status}</Text>
                        </View>
                        <Badge label={application.status} variant="warning" />
                    </View>
                </View>

                {/* Timeline */}
                <View className="p-6">
                    <Text className="text-lg font-bold text-gray-900 mb-6">Application Timeline</Text>

                    {application.timeline.map((item, i) => (
                        <View key={i} className="flex-row mb-6">
                            <View className="items-center mr-4">
                                <View className={`w-10 h-10 rounded-full items-center justify-center ${item.completed ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                                    {getStatusIcon(item.status, item.completed)}
                                </View>
                                {i < application.timeline.length - 1 && (
                                    <View className={`w-0.5 flex-1 my-1 ${item.completed ? 'bg-emerald-200' : 'bg-gray-100'}`} />
                                )}
                            </View>
                            <View className="flex-1 py-1">
                                <View className="flex-row justify-between items-center mb-1">
                                    <Text className={`font-bold ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>{item.status}</Text>
                                    <Text className="text-xs text-gray-400 font-medium">{item.date}</Text>
                                </View>
                                <Text className="text-sm text-gray-500 leading-5">{item.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Documents & Support */}
                <View className="px-6 pb-6">
                    <View className="flex-row gap-4">
                        <TouchableOpacity className="flex-1 bg-gray-50 p-4 rounded-2xl border border-gray-100 items-center">
                            <FileText size={24} color="#004d40" className="mb-2" />
                            <Text className="font-bold text-gray-900 text-sm">Documents</Text>
                            <Text className="text-xs text-gray-500">{application.documents.length} Verified</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-1 bg-gray-50 p-4 rounded-2xl border border-gray-100 items-center">
                            <MessageSquare size={24} color="#004d40" className="mb-2" />
                            <Text className="font-bold text-gray-900 text-sm">Ask Support</Text>
                            <Text className="text-xs text-gray-500">Live Chat</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="h-24" />
            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
                <Button variant="outline" className="h-12 rounded-xl mb-3">
                    <Text className="text-primary font-bold">Withdraw Application</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
