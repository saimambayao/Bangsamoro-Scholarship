import { View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import '../../global.css';

export default function LoginScreen() {
    const router = useRouter();

    const handleLogin = () => {
        // Navigate to tabs on success
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
                    <View className="items-center mb-8">
                        <View className="w-20 h-20 bg-primary/10 rounded-2xl items-center justify-center mb-4 rotate-3">
                            <Text className="text-4xl">🎓</Text>
                        </View>
                        <Text className="text-3xl font-bold text-primary text-center">Welcome Back</Text>
                        <Text className="text-gray-500 text-center mt-2">Sign in to continue to your scholarship portal</Text>
                    </View>

                    <View className="space-y-4">
                        <Input
                            label="Email Address"
                            placeholder="juan@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Input
                            label="Password"
                            placeholder="••••••••"
                            secureTextEntry
                        />

                        <TouchableOpacity className="self-end">
                            <Text className="text-primary font-medium">Forgot Password?</Text>
                        </TouchableOpacity>

                        <Button
                            title="Sign In"
                            onPress={handleLogin}
                            className="mt-4"
                            size="lg"
                        />

                        <View className="flex-row justify-center mt-6">
                            <Text className="text-gray-500">Don't have an account? </Text>
                            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                                <Text className="text-primary font-bold">Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
