"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Save, UploadCloud, AlertCircle, Loader2, PartyPopper, Home } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "next/navigation";
import { SCHOLARSHIPS } from "@/lib/mock-data";

const STEPS = [
    { id: 1, title: "Personal Info", description: "Basic details" },
    { id: 2, title: "Family", description: "Parents & Income" },
    { id: 3, title: "Education", description: "Academic history" },
    { id: 4, title: "Documents", description: "Upload requirements" },
    { id: 5, title: "Review", description: "Verify & Submit" }
];

import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function ApplicationFormPage() {
    const params = useParams();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push(`/login?callbackUrl=/scholarships/${params.id}/apply`);
        } else {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [params.id, router]);

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [formData, setFormData] = useState({
        // Step 1
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        gender: "",
        region: "",
        province: "",
        city: "",
        barangay: "",
        street: "",
        // Step 2
        fatherName: "",
        fatherOccupation: "",
        motherName: "",
        motherOccupation: "",
        annualIncome: "",
        // Step 3
        school: "",
        program: "",
        yearLevel: "",
        gpa: "",
        honors: "",
    });

    // Find scholarship details (mock)
    const scholarship = SCHOLARSHIPS.find(s => s.id === params.id) || SCHOLARSHIPS[0];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (error) setError(null); // Clear error on type
    };

    const handleSelectChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        if (error) setError(null);
    };

    const validateStep = (step: number) => {
        if (step === 1) {
            const required = ['firstName', 'lastName', 'dob', 'gender', 'region', 'province', 'city', 'barangay', 'street'];
            for (const field of required) {
                if (!formData[field as keyof typeof formData]) {
                    return `Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`;
                }
            }
        }
        if (step === 2) {
            const required = ['fatherName', 'fatherOccupation', 'motherName', 'motherOccupation', 'annualIncome'];
            for (const field of required) {
                if (!formData[field as keyof typeof formData]) {
                    return `Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`;
                }
            }
        }
        if (step === 3) {
            const required = ['school', 'program', 'yearLevel', 'gpa'];
            for (const field of required) {
                if (!formData[field as keyof typeof formData]) {
                    return `Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`;
                }
            }
        }
        // Step 4 documents validation could go here
        return null;
    };

    const handleNext = () => {
        const validationError = validateStep(currentStep);
        if (validationError) {
            setError(validationError);
            return;
        }

        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1);
            setError(null);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setError(null);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = async () => {
        if (!termsAccepted) {
            setError("Please accept the terms and conditions to submit your application.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            window.scrollTo(0, 0);
        }, 3000);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
            </div>
        );
    }

    if (!isAuthenticated) return null;

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full"
                >
                    <Card className="border-slate-200 shadow-xl overflow-hidden">
                        <div className="h-2 bg-emerald-600 w-full" />
                        <CardContent className="p-8 md:p-12 text-center space-y-8">
                            <div className="space-y-2 pt-4">
                                <h1 className="text-3xl font-bold text-slate-900">Application Submitted!</h1>
                                <p className="text-slate-600 text-lg max-w-md mx-auto">
                                    Your application for the <span className="font-semibold text-emerald-700">{scholarship.title}</span> has been successfully received.
                                </p>
                            </div>

                            <div className="bg-slate-50 border rounded-xl p-6 text-left space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Application ID:</span>
                                    <span className="font-mono font-bold text-slate-900">BSP-{Math.random().toString(36).substring(2, 9).toUpperCase()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Submission Date:</span>
                                    <span className="font-semibold text-slate-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <Separator />
                                <div className="flex items-start gap-3 text-sm text-slate-600">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                                    <p>Our evaluators will review your documents. You can track your application status in your dashboard.</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Link href="/" className="w-full sm:w-auto">
                                    <Button variant="outline" className="w-full h-11">
                                        <Home className="mr-2 h-4 w-4" /> Go to Home
                                    </Button>
                                </Link>
                                <Link href="/login" className="w-full sm:w-auto">
                                    <Button className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white">
                                        Go to My Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                    <p className="text-center text-slate-400 mt-8 text-sm">
                        A confirmation email has been sent to your registered email address.
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link href={`/scholarships/${params.id}`} className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 mb-4 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Scholarship Details
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            {scholarship.logo && (
                                <div className="h-16 w-16 flex items-center justify-center">
                                    <Image
                                        src={scholarship.logo}
                                        alt={scholarship.provider}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-contain mix-blend-multiply"
                                    />
                                </div>
                            )}
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Application Form</h1>
                                <p className="text-slate-600 mt-1">Applying for: <span className="font-semibold text-emerald-700">{scholarship.title}</span></p>
                            </div>
                        </div>
                        <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border shadow-sm">
                            Deadline: <span className="font-bold text-red-600">{scholarship.deadline}</span>
                        </div>
                    </div>
                </div>

                {/* Stepper */}
                <div className="mb-6">
                    <div className="hidden md:flex justify-between">
                        {STEPS.map((step) => (
                            <div key={step.id} className={`flex flex-col items-center relative z-10 w-full ${step.id !== STEPS.length ? 'after:content-[""] after:h-[2px] after:w-full after:bg-slate-200 after:absolute after:top-4 after:left-1/2 after:-z-10' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors ${currentStep >= step.id ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                                    }`}>
                                    {currentStep > step.id ? <CheckCircle2 className="h-5 w-5" /> : step.id}
                                </div>
                                <span className={`text-xs font-semibold ${currentStep >= step.id ? 'text-emerald-700' : 'text-slate-400'}`}>
                                    {step.title}
                                </span>
                                <span className="text-[10px] text-slate-400 hidden lg:block">{step.description}</span>
                            </div>
                        ))}
                    </div>
                    {/* Mobile Stepper */}
                    <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
                        <span className="font-bold text-emerald-700">Step {currentStep} of {STEPS.length}</span>
                        <span className="text-sm text-slate-600">{STEPS[currentStep - 1].title}</span>
                    </div>
                </div>

                {/* Form Content */}
                <Card className="border-slate-200 shadow-sm border-t-4 border-t-emerald-600 relative overflow-hidden">
                    {/* Background Logo Watermark */}
                    <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.4] transition-all duration-500 ${scholarship.provider === 'TESDA' ? 'w-[600px] h-[600px]' : 'w-[400px] h-[400px]'
                        }`}>
                        <Image
                            src={scholarship.logo}
                            alt=""
                            width={scholarship.provider === 'TESDA' ? 600 : 400}
                            height={scholarship.provider === 'TESDA' ? 600 : 400}
                            className="w-full h-full object-contain mix-blend-multiply"
                        />
                    </div>

                    <CardContent className="p-6 md:p-8 space-y-6 relative z-10">
                        {/* Step 1: Personal Info */}
                        {currentStep === 1 && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <motion.div variants={itemVariants} className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                            <Input id="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Juan" className="focus-visible:ring-emerald-500 transition-all" />
                                        </motion.div>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="space-y-2">
                                        <Label htmlFor="middleName">Middle Name</Label>
                                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                            <Input id="middleName" value={formData.middleName} onChange={handleInputChange} placeholder="Santos" className="focus-visible:ring-emerald-500 transition-all" />
                                        </motion.div>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                            <Input id="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Dela Cruz" className="focus-visible:ring-emerald-500 transition-all" />
                                        </motion.div>
                                    </motion.div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <motion.div variants={itemVariants} className="space-y-2">
                                        <Label htmlFor="dob">Date of Birth</Label>
                                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                            <Input id="dob" type="date" value={formData.dob} onChange={handleInputChange} className="focus-visible:ring-emerald-500 transition-all" />
                                        </motion.div>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="space-y-2">
                                        <Label htmlFor="gender">Gender</Label>
                                        <motion.div whileHover={{ scale: 1.01 }}>
                                            <Select value={formData.gender} onValueChange={(val) => handleSelectChange('gender', val)}>
                                                <SelectTrigger className="focus:ring-emerald-500 transition-all">
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </motion.div>
                                    </motion.div>
                                </div>
                                <motion.div variants={itemVariants}>
                                    <Separator />
                                </motion.div>
                                <motion.div variants={itemVariants} className="space-y-4">
                                    <Label className="text-base font-semibold">Permanent Address</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input id="region" value={formData.region} onChange={handleInputChange} placeholder="Region (BARMM)" className="focus-visible:ring-emerald-500 transition-all" />
                                        <Input id="province" value={formData.province} onChange={handleInputChange} placeholder="Province" className="focus-visible:ring-emerald-500 transition-all" />
                                        <Input id="city" value={formData.city} onChange={handleInputChange} placeholder="City / Municipality" className="focus-visible:ring-emerald-500 transition-all" />
                                        <Input id="barangay" value={formData.barangay} onChange={handleInputChange} placeholder="Barangay" className="focus-visible:ring-emerald-500 transition-all" />
                                        <Input id="street" value={formData.street} onChange={handleInputChange} placeholder="House No. / Street" className="md:col-span-2 focus-visible:ring-emerald-500 transition-all" />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Step 2: Family Background */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                                        Father's Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Full Name</Label>
                                            <Input id="fatherName" value={formData.fatherName} onChange={handleInputChange} placeholder="Father's Name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Occupation</Label>
                                            <Input id="fatherOccupation" value={formData.fatherOccupation} onChange={handleInputChange} placeholder="Occupation" />
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                                        Mother's Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Full Name</Label>
                                            <Input id="motherName" value={formData.motherName} onChange={handleInputChange} placeholder="Mother's Maiden Name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Occupation</Label>
                                            <Input id="motherOccupation" value={formData.motherOccupation} onChange={handleInputChange} placeholder="Occupation" />
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label htmlFor="income">Combined Annual Family Income</Label>
                                    <Select value={formData.annualIncome} onValueChange={(val) => handleSelectChange('annualIncome', val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select income range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="range1">Below Php 60,000</SelectItem>
                                            <SelectItem value="range2">Php 60,000 - Php 120,000</SelectItem>
                                            <SelectItem value="range3">Php 120,000 - Php 250,000</SelectItem>
                                            <SelectItem value="range4">Above Php 250,000</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Education */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="space-y-2">
                                    <Label htmlFor="school">Current School / University</Label>
                                    <Input id="school" value={formData.school} onChange={handleInputChange} placeholder="Enter school name" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="program">Program / Course</Label>
                                        <Input id="program" value={formData.program} onChange={handleInputChange} placeholder="e.g. BS Civil Engineering" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="year">Year Level (Next Sem)</Label>
                                        <Select value={formData.yearLevel} onValueChange={(val) => handleSelectChange('yearLevel', val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1st Year</SelectItem>
                                                <SelectItem value="2">2nd Year</SelectItem>
                                                <SelectItem value="3">3rd Year</SelectItem>
                                                <SelectItem value="4">4th Year</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gpa">General Weighted Average (Last Sem)</Label>
                                    <Input id="gpa" value={formData.gpa} onChange={handleInputChange} placeholder="e.g. 1.5 or 90%" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Academic Achievements / Honors</Label>
                                    <Input id="honors" value={formData.honors} onChange={handleInputChange} placeholder="List any honors received" />
                                </div>
                            </div>
                        )}

                        {/* Step 4: Documents */}
                        {currentStep === 4 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-blue-800 mb-4">
                                    Please upload clear, scanned copies of the following documents. Allowed formats: PDF, JPG, PNG. Max size: 5MB.
                                </div>

                                {[
                                    "PSA Birth Certificate",
                                    "Certificate of Grades / TOR",
                                    "Certificate of Enrolment / Registration",
                                    "Barangay Certificate of Residency",
                                    "Income Tax Return of Parents / Cert. of Indigency"
                                ].map((doc, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-slate-50 gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-white rounded-lg border flex items-center justify-center text-slate-400">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{doc}</p>
                                                <p className="text-xs text-slate-500">Required</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="border-dashed border-slate-300 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50">
                                            <UploadCloud className="mr-2 h-4 w-4" /> Upload
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Step 5: Review */}
                        {currentStep === 5 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="text-center py-6">
                                    <h3 className="text-xl font-bold text-slate-900">Review Application</h3>
                                    <p className="text-slate-600">Please review your information before submitting.</p>
                                </div>

                                <Card className="bg-slate-50 border-0 shadow-none">
                                    <CardContent className="p-4 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <p className="font-semibold text-slate-900">{formData.firstName} {formData.middleName} {formData.lastName}</p>
                                            <Button variant="link" size="sm" className="h-auto p-0 text-emerald-600" onClick={() => setCurrentStep(1)}>Edit</Button>
                                        </div>
                                        <p className="text-sm text-slate-600">{formData.barangay}, {formData.city}, {formData.province}</p>
                                        <Separator className="bg-slate-200" />
                                        <div className="flex justify-between items-start">
                                            <p className="font-semibold text-slate-900">{formData.school}</p>
                                            <Button variant="link" size="sm" className="h-auto p-0 text-emerald-600" onClick={() => setCurrentStep(3)}>Edit</Button>
                                        </div>
                                        <p className="text-sm text-slate-600">{formData.program} • {formData.yearLevel ? `${formData.yearLevel}${['st', 'nd', 'rd', 'th'][Math.min(parseInt(formData.yearLevel) - 1, 3)] || 'th'} Year` : ''}</p>
                                        <Separator className="bg-slate-200" />
                                        <div className="flex justify-between items-start">
                                            <p className="font-semibold text-slate-900">Documents (5/5)</p>
                                            <Button variant="link" size="sm" className="h-auto p-0 text-emerald-600" onClick={() => setCurrentStep(4)}>Edit</Button>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-emerald-700">
                                            <CheckCircle2 className="h-4 w-4" /> All required documents uploaded
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="flex items-start space-x-2 pt-4">
                                    <Checkbox
                                        id="terms"
                                        checked={termsAccepted}
                                        onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                                    />
                                    <Label htmlFor="terms" className="text-sm leading-relaxed text-slate-600 font-normal cursor-pointer select-none">
                                        I hereby certify that the information provided in this application is true and correct to the best of my knowledge. I understand that any false statement may result in the disqualification of my application.
                                    </Label>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 bg-slate-50/50 border-t p-6">
                        {error && (
                            <div className="w-full bg-red-50 text-red-600 px-4 py-3 rounded-md flex items-center text-sm border border-red-200">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                {error}
                            </div>
                        )}
                        <div className="flex justify-between w-full">
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                disabled={currentStep === 1 || isSubmitting}
                                className="text-slate-600"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>

                            {currentStep < 5 ? (
                                <Button onClick={handleNext} disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700">
                                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="bg-emerald-600 hover:bg-emerald-700 px-8 min-w-[180px]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" /> Submit Application
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
