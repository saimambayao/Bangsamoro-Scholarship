import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { ArrowLeft, Check, ChevronRight, Upload, User, GraduationCap, FileText, Send } from 'lucide-react-native';
import { SCHOLARSHIPS } from '../../constants/mock-data';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import '../../global.css';

const STEPS = [
    { id: 1, title: 'Personal', icon: User },
    { id: 2, title: 'Education', icon: GraduationCap },
    { id: 3, title: 'Documents', icon: FileText },
    { id: 4, title: 'Review', icon: Send },
];

export default function ApplicationWizardScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);

    const scholarship = SCHOLARSHIPS.find(s => s.id === id);

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        } else {
            Alert.alert(
                "Application Submitted",
                "Your application for " + scholarship?.title + " has been submitted successfully!",
                [{ text: "Great!", onPress: () => router.replace('/(tabs)/applications') }]
            );
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            router.back();
        }
    };

    const renderStepIndicator = () => (
        <View className="flex-row px-6 py-6 bg-white border-b border-gray-100">
            {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                    <View key={step.id} className="flex-1 items-center">
                        <View className="flex-row items-center w-full">
                            {/* Connector Line Left */}
                            <View className={`h-1 flex-1 ${i === 0 ? 'bg-transparent' : (isCompleted || isActive ? 'bg-primary' : 'bg-gray-100')}`} />

                            {/* Circle */}
                            <View className={`w-10 h-10 rounded-full items-center justify-center border-2 ${isActive ? 'bg-primary border-primary' :
                                    isCompleted ? 'bg-primary border-primary' : 'bg-white border-gray-200'
                                }`}>
                                {isCompleted ? (
                                    <Check size={20} color="#fff" />
                                ) : (
                                    <Icon size={18} color={isActive ? "#fff" : "#94a3b8"} />
                                )}
                            </View>

                            {/* Connector Line Right */}
                            <View className={`h-1 flex-1 ${i === STEPS.length - 1 ? 'bg-transparent' : (isCompleted ? 'bg-primary' : 'bg-gray-100')}`} />
                        </View>
                        <Text className={`text-[10px] mt-2 font-bold uppercase tracking-tighter ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                            {step.title}
                        </Text>
                    </View>
                );
            })}
        </View>
    );

    const renderFormContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <View className="p-6">
                        <Text className="font-bold text-xl text-gray-900 mb-2">Personal Information</Text>
                        <Text className="text-gray-500 mb-6">Tell us a bit about yourself.</Text>

                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 mb-2">Full Name</Text>
                            <Input placeholder="Enter your full name" defaultValue="Saidamen Mambayao" />
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 mb-2">Email Address</Text>
                            <Input placeholder="email@example.com" defaultValue="saidamen@example.com" keyboardType="email-address" />
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 mb-2">Phone Number</Text>
                            <Input placeholder="+63 9xx xxx xxxx" defaultValue="+63 912 345 6789" keyboardType="phone-pad" />
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 mb-2">Home Address</Text>
                            <Input placeholder="Enter your complete address" />
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View className="p-6">
                        <Text className="font-bold text-xl text-gray-900 mb-2">Academic Background</Text>
                        <Text className="text-gray-500 mb-6">Provide your educational details.</Text>

                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 mb-2">Current School</Text>
                            <Input placeholder="Name of your institution" />
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 mb-2">Degree / Program</Text>
                            <Input placeholder="BS Computer Science, etc." />
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 mb-2">Year Level</Text>
                            <Input placeholder="e.g. 1st Year" />
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 mb-2">GWA / Average</Text>
                            <Input placeholder="Enter your current average" keyboardType="numeric" />
                        </View>
                    </View>
                );
            case 3:
                return (
                    <View className="p-6">
                        <Text className="font-bold text-xl text-gray-900 mb-2">Required Documents</Text>
                        <Text className="text-gray-500 mb-6">Upload clear photos or PDFs.</Text>

                        {scholarship?.requirements?.map((req, i) => (
                            <TouchableOpacity key={i} className="mb-4 p-5 bg-gray-50 rounded-2xl border border-dashed border-gray-300 items-center justify-center">
                                <Upload size={24} color="#004d40" className="mb-2" />
                                <Text className="font-bold text-gray-900 text-center">{req}</Text>
                                <Text className="text-xs text-gray-500 text-center mt-1">Tap to select file</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                );
            case 4:
                return (
                    <View className="p-6">
                        <Text className="font-bold text-xl text-gray-900 mb-2">Review Application</Text>
                        <Text className="text-gray-500 mb-6">Double check your details before submitting.</Text>

                        <View className="bg-primary/5 p-4 rounded-2xl mb-6">
                            <Text className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Applying For</Text>
                            <Text className="text-lg font-bold text-gray-900">{scholarship?.title}</Text>
                        </View>

                        <View className="mb-6">
                            <Text className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Profile Details</Text>
                            <Text className="text-gray-600 mb-1">Saidamen Mambayao</Text>
                            <Text className="text-gray-600 mb-1">saidamen@example.com</Text>
                            <Text className="text-gray-600">+63 912 345 6789</Text>
                        </View>

                        <View className="mb-6">
                            <Text className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Uploaded Files</Text>
                            <View className="flex-row items-center mb-2">
                                <Check size={16} color="#059669" className="mr-2" />
                                <Text className="text-gray-600">Verification.pdf</Text>
                            </View>
                            <View className="flex-row items-center mb-2">
                                <Check size={16} color="#059669" className="mr-2" />
                                <Text className="text-gray-600">Transcript_Final.png</Text>
                            </View>
                        </View>

                        <View className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                            <Text className="text-amber-800 text-xs font-medium leading-5">By submitting, you agree that all information provided is true and correct to the best of your knowledge.</Text>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
                <TouchableOpacity onPress={handleBack} className="mr-4">
                    <ArrowLeft size={24} color="#004d40" />
                </TouchableOpacity>
                <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-900">Application Form</Text>
                    <Text className="text-xs text-gray-500">Step {currentStep} of 4</Text>
                </View>
            </View>

            {renderStepIndicator()}

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {renderFormContent()}
            </ScrollView>

            {/* Float Actions */}
            <View className="p-6 bg-white border-t border-gray-100 shadow-lg">
                <Button
                    onPress={handleNext}
                    className="h-14 rounded-2xl flex-row items-center justify-center"
                >
                    <Text className="text-white font-bold text-lg mr-2">
                        {currentStep === 4 ? 'Submit Application' : 'Continue to Next Step'}
                    </Text>
                    {currentStep < 4 && <ChevronRight size={20} color="#fff" />}
                </Button>

                {currentStep > 1 && (
                    <TouchableOpacity onPress={handleBack} className="mt-4 py-2 items-center">
                        <Text className="text-gray-400 font-bold">Go Back</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}
