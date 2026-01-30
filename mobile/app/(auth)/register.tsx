import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import '../../global.css';

export default function RegisterScreen() {
    const router = useRouter();

    const handleRegister = () => {
        // Navigate to tabs on success
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
                    <View className="mb-8 mt-4">
                        <Text className="text-3xl font-bold text-primary">Create Account</Text>
                        <Text className="text-gray-500 mt-2">Join the Bangsamoro Scholarship Program</Text>
                    </View>

                    <View className="space-y-4">
                        <View className="flex-row gap-3">
                            <Input
                                label="First Name"
                                placeholder="Juan"
                                containerClassName="flex-1"
                            />
                            <Input
                                label="Last Name"
                                placeholder="Dela Cruz"
                                containerClassName="flex-1"
                            />
                        </View>

                        <Input
                            label="Email Address"
                            placeholder="juan@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Input
                            label="Phone Number"
                            placeholder="+63 912 345 6789"
                            keyboardType="phone-pad"
                        />

                        <Input
                            label="Password"
                            placeholder="••••••••"
                            secureTextEntry
                        />

                        <Input
                            label="Confirm Password"
                            placeholder="••••••••"
                            secureTextEntry
                        />

                        <Button
                            title="Create Account"
                            onPress={handleRegister}
                            className="mt-4"
                            size="lg"
                        />

                        <View className="flex-row justify-center mt-6 mb-8">
                            <Text className="text-gray-500">Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text className="text-primary font-bold">Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
