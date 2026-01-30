export const SUCCESS_STORIES = [
    {
        id: "1",
        name: "Maria Santos, RN",
        role: "AHME Scholar 2020-2024",
        school: "Notre Dame University",
        program: "BS Nursing",
        image: require('../assets/images/scholars/maria_santos.png'),
        quote: "The AHME scholarship didn't just fund my education—it gave me a community of mentors and fellow scholars who pushed me to excel.",
        story: "Growing up in a farming family in Maguindanao, I never thought I could afford a nursing degree. The financial burden was too great. But when I discovered the AHME scholarship, it opened a door I thought was closed forever. Beyond the tuition and allowance, the mentorship program connected me with senior nurses who guided me through the toughest parts of my clinical rotations. Today, I serve at the Cotabato Regional Hospital, giving back to the community that raised me, fully licensed and debt-free.",
        achievements: ["Passed Nursing Board Exam (Top 10%)", "Dean's Lister (8 semesters)"],
        featured: true
    },
    {
        id: "2",
        name: "Ahmed Hassan",
        role: "BASE Scholar 2021-2025",
        school: "Mindanao State University - Main",
        program: "BS Civil Engineering",
        image: require('../assets/images/scholars/ahmad_pendatun.png'),
        quote: "Science and technology are the keys to rebuilding our region. This scholarship empowered me to be part of that foundation.",
        story: "Rebuilding Marawi and other conflict-affected areas requires skilled engineers who understand the local context. The BASE-Merit program allowed me to focus entirely on my studies without worrying about laboratory fees or textbooks. My research on sustainable, low-cost housing materials for displaced communities was fully funded by the grant, and I'm now working with the Ministry of Public Works to implement some of these solutions.",
        achievements: ["Magna Cum Laude", "Best Undergraduate Thesis"],
        featured: false
    },
    {
        id: "3",
        name: "Fatima Abdullah",
        role: "TESDA Grantee 2024",
        school: "Regional Manpower Training Center",
        program: "Computer Systems Servicing NC II",
        image: require('../assets/images/scholars/fatima_musa.png'),
        quote: "You don't always need a 4-year degree to succeed. Technical skills are just as valuable.",
        story: "After high school, I couldn't afford college. I felt potentialless until I found the TVET Skills Training Grant. In just six months, I learned how to diagnose and repair computer hardware and set up networks. The toolkit they provided allowed me to start a small repair shop in my barangay. I'm now earning enough to support my siblings' education and planning to take further certifications.",
        achievements: ["NC II Certified", "Outstanding Trainee Award"],
        featured: false
    }
];

export const SCHOLARSHIPS = [
    {
        id: "1",
        title: "Bangsamoro Assistance for Science Education (BASE)",
        provider: "MOST",
        deadline: "Oct 15, 2024",
        tags: ['Undergrad', 'Science', 'Stipend'],
        amount: "₱8,000 / month",
        description: "The BASE program is designed to support Bangsamoro students pursuing science, technology, engineering, and mathematics (STEM) courses. It aims to develop a pool of highly qualified scientists and engineers who will contribute to the region's development.",
        eligibility: [
            "Must be a bonafide resident of BARMM",
            "Incoming 1st year college student",
            "Enrolled in a priority STEM course",
            "General Average of at least 85%"
        ],
        requirements: [
            "Proof of Residency (Barangay Clearance)",
            "Report Card (Form 138)",
            "Certificate of Enrollment",
            "Income Tax Return of parents"
        ],
        featured: true
    },
    {
        id: "2",
        title: "CMO Scholarship Program",
        provider: "Chief Minister's Office",
        deadline: "Nov 01, 2024",
        tags: ['Merit', 'All Courses'],
        amount: "Full Tuition",
        description: "A prestigious merit-based scholarship from the Office of the Chief Minister, supporting high-achieving students across all academic disciplines. This program covers full tuition and provides a monthly living allowance.",
        eligibility: [
            "Resident of BARMM",
            "Exceptional academic record (90%+ average)",
            "Active involvement in community service",
            "No other existing government scholarship"
        ],
        requirements: [
            "Official Transcript of Records",
            "Certificate of Good Moral Character",
            "Essay on Regional Development",
            "2x2 ID Photo"
        ],
        featured: false
    },
    {
        id: "3",
        title: "Access to Higher Education (AHME)",
        provider: "MBHTE",
        deadline: "Sep 30, 2024",
        tags: ['Tertiary', 'Financial Aid'],
        amount: "₱60,000 / year",
        description: "The AHME program focuses on providing financial assistance to underprivileged but deserving students in the Bangsamoro region. It aims to increase the tertiary education enrollment rate among marginalized communities.",
        eligibility: [
            "Member of a marginalized group",
            "Combined family income below ₱250,000/year",
            "Enrolled in any CHED-recognized institution",
            "Passing grades in all subjects"
        ],
        requirements: [
            "Certificate of Indigency",
            "Birth Certificate",
            "Latest Grades",
            "Recommendation from local leader"
        ],
        featured: false
    }
];
