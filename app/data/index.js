export const projects = [
    {
        title: 'Healix',
        subtitle: 'AI Health Companion',
        category: 'AI Healthcare',
        year: '2025',
        tags: ['Next.js', 'FastAPI', 'OpenAI', 'WebSockets'],
        image: '/projects/healix.png',
        description: 'AI-powered health companion for anxiety management, symptom checking, and emergency guidance.',
        color: '#3b82f6',
        github: 'https://github.com',
        link: 'https://example.com',
        details: {
            mainDescription: "Healix is an AI-powered healthcare and mental-health companion designed to assist users during moments of uncertainty, anxiety, and medical concern. The platform combines physical health guidance, mental health support, and emergency assistance into a single, unified system.",
            extendedDescription: "Unlike traditional health apps that focus on only one aspect, Healix provides real-time guidance, voice-based therapy, and emergency navigation, helping users understand what to do next when it matters most. The project focuses on early intervention, emotional support, and decision guidance, making healthcare assistance more accessible and less intimidating.",
            pillars: [
                { label: "Safety" },
                { label: "Privacy" },
                { label: "Clarity" },
                { label: "Emotional awareness" }
            ],
            features: [
                {
                    title: 'AI Therapy & Mental Health',
                    desc: 'Real-time CBT-based AI therapy conversations with crisis detection and escalation logic.',
                    type: 'brain'
                },
                {
                    title: 'Voice-Based Companion',
                    desc: 'Users can speak instead of typing during panic, receiving real-time spoken AI responses.',
                    type: 'activity'
                },
                {
                    title: 'AI Symptom Checker',
                    desc: 'Natural language symptom assessment with severity risk analysis and home-care suggestions.',
                    type: 'shield'
                },
                {
                    title: 'Emergency Navigator',
                    desc: 'Step-by-step guidance for medical emergencies, helping users act calmly during panic.',
                    type: 'clock'
                },
                {
                    title: 'Medication Management',
                    desc: 'Track medications, dosage, and timing with daily adherence monitoring.',
                    type: 'activity'
                },
                {
                    title: 'Mood & Emotional Tracking',
                    desc: 'Daily mood logging and emotional trend analysis to help identify patterns.',
                    type: 'heart'
                }
            ],
            techStack: {
                frontend: ['Next.js 14', 'React', 'Tailwind CSS', 'Framer Motion'],
                backend: ['FastAPI', 'PostgreSQL', 'SQLAlchemy'],
                ai: ['OpenAI GPT-4', 'Real-time WebSockets', 'Text-to-Speech']
            }
        }
    },
    {
        title: 'AUTONIQX',
        subtitle: 'AI-Powered Email Automation',
        category: 'AI & Automation',
        year: '2025',
        tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Python'],
        image: '/projects/autoniqx.png',
        description: 'AI-powered email automation platform that intelligently manages campaigns, personalizes outreach, and optimizes engagement with minimal human effort.',
        color: '#8b5cf6',
        github: 'https://github.com',
        link: 'https://example.com',
        details: {
            mainDescription: "AUTONIQX is an enterprise-grade AI automation platform designed to simplify and optimize email marketing workflows. The platform uses intelligent automation and AI decision-making to manage campaigns, personalize emails, handle follow-ups, and continuously improve engagement results — all with minimal human intervention.",
            extendedDescription: "AUTONIQX helps businesses automate their entire email marketing lifecycle using AI. Instead of manually managing campaigns, contacts, and follow-ups, users can rely on the platform’s intelligent system to handle everything automatically. It is built for startups, agencies, and businesses that want smarter outreach without increasing operational effort. The platform solves critical problems like inefficient manual campaigns, poorly timed follow-ups, and the difficulty of personalization at scale by using AI logic that adapts and improves over time.",
            pillars: [
                { label: "Enterprise Scalable" },
                { label: "Zero-Touch Automation" },
                { label: "AI Decision Logic" }
            ],
            features: [
                {
                    title: 'AI Campaign Management',
                    desc: 'AI-driven campaign automation that handles segmentation, content, and execution based on adapter logic.',
                    type: 'brain'
                },
                {
                    title: 'Personalized Content Gen',
                    desc: 'Dynamically generates personalized email content at scale for maximum recipient engagement.',
                    type: 'zap'
                },
                {
                    title: 'No-Code Workflow Builder',
                    desc: 'Visual interface to design complex automation flows and AI decision points easily.',
                    type: 'activity'
                },
                {
                    title: 'Engagement Optimization',
                    desc: 'Smart scheduling and timing optimization to ensure follow-ups occur at the perfect moment.',
                    type: 'clock'
                },
                {
                    title: 'RAG Support Chatbot',
                    desc: 'Integrated AI chatbot for product assistance and automated customer inquiry handling.',
                    type: 'shield'
                }
            ],
            techStack: {
                frontend: ['Next.js', 'React', 'Tailwind CSS'],
                backend: ['FastAPI', 'Python', 'PostgreSQL', 'Docker'],
                ai: ['AI Decision Logic', 'RAG Architecture', 'SendGrid API']
            }
        }
    },
    {
        title: 'FORESENSE',
        subtitle: 'AI Resume Intelligence & Career Platform',
        category: 'AI Product / SaaS',
        year: '2025',
        tags: ['Next.js 16', 'FastAPI', 'PostgreSQL', 'OpenAI'],
        image: '/projects/foresense.png',
        description: 'AI-powered resume and job intelligence platform that analyzes resumes, matches them with real jobs, and tracks applications.',
        color: '#10b981',
        github: 'https://github.com',
        link: 'https://example.com',
        details: {
            mainDescription: "FORESENSE is a full-stack, enterprise-grade AI Resume Intelligence platform designed to help job seekers improve their resumes, match with real job opportunities, and track their job applications intelligently.",
            extendedDescription: "Unlike basic ATS score checkers, FORESENSE provides a complete end-to-end career workflow — from resume analysis and AI-driven improvements to real job matching, application tracking, and career guidance — all in one platform. The platform integrates modern AI models with real-world hiring workflows to ensure resumes are optimized for Applicant Tracking Systems (ATS) while also aligning with actual job market requirements. It is built with a strong focus on real usability, clean enterprise UI, and scalable architecture, making it suitable for individual job seekers, HR teams, and training academies.",
            pillars: [
                { label: "ATS Optimization" },
                { label: "Real Job Matching" },
                { label: "Explainable AI" },
                { label: "Application Tracking" }
            ],
            features: [
                {
                    title: 'AI Resume ATS Analysis',
                    desc: 'Analyzes resumes against ATS standards, highlights weaknesses, missing keywords, and formatting issues.',
                    type: 'shield'
                },
                {
                    title: 'AI Resume Editor',
                    desc: 'Improves resume content using AI while preserving professional tone and generates clean templates.',
                    type: 'brain'
                },
                {
                    title: 'Real Job Matching Engine',
                    desc: 'Fetches real job postings from external platforms and matches them with the resume using AI fitting.',
                    type: 'zap'
                },
                {
                    title: 'Smart Apply & Tracking',
                    desc: 'Redirects users to real job platforms and tracks application status (Applied, Interviewing, etc.)',
                    type: 'activity'
                },
                {
                    title: 'Career & Interview Intelligence',
                    desc: 'Generates job-ready scores, skill gap analysis, roadmaps, and AI-based interview feedback.',
                    type: 'check-circle'
                },
                {
                    title: 'B2B Dashboards',
                    desc: 'HR and Academy dashboards for bulk resume evaluation, candidate ranking, and student tracking.',
                    type: 'shield'
                }
            ],
            techStack: {
                frontend: ['Next.js 16 (App Router)', 'JavaScript/JSX', 'TailwindCSS', 'Server Components'],
                backend: ['FastAPI (Python)', 'SQLAlchemy', 'Alembic', 'OpenAI APIs'],
                ai: ['PostgreSQL', 'Prisma ORM', 'Shared DB Architecture']
            }
        }
    },
    {
        title: 'IoT-Based Data Logging System Using Cloud',
        subtitle: 'Real-time Data Sync System',
        category: 'IoT & Cloud',
        year: '2025',
        tags: ['Next.js', 'Tailwind CSS', 'MQTT', 'Supabase', 'IoT Sensors'],
        image: '/projects/iot.png',
        description: 'Designed a real-time IoT data logging system to collect and store sensor readings on the cloud.',
        color: '#38bdf8',
        github: 'https://github.com',
        link: 'https://example.com',
        details: {
            mainDescription: "Designed a real-time IoT data logging system to collect and store sensor readings on the cloud. The system bridge physical hardware with cloud infrastructure for seamless monitoring.",
            extendedDescription: "Ensured scalability and reliability for continuous sensor data ingestion. The architecture focuses on low-latency data transmission and robust storage for industrial or personal use cases.",
            pillars: [
                { label: "Scalability" },
                { label: "Reliability" },
                { label: "Secure Auth" }
            ],
            features: [
                {
                    title: 'Real-time Data Logging',
                    desc: 'Systematic collection and storage of sensor readings on the cloud for historical and live analysis.',
                    type: 'activity'
                },
                {
                    title: 'Wi-Fi / MQTT Comms',
                    desc: 'Implemented high-speed, low-latency sensor data transmission using MQTT protocol.',
                    type: 'zap'
                },
                {
                    title: 'Next.js Dashboard',
                    desc: 'Built a modern frontend dashboard using Next.js and Tailwind CSS for live monitoring.',
                    type: 'eye'
                },
                {
                    title: 'Supabase Integration',
                    desc: 'Integrated Supabase Cloud for secure data storage, authentication, and real-time updates.',
                    type: 'shield'
                }
            ],
            techStack: {
                frontend: ['Next.js', 'Tailwind CSS', 'Lucide React'],
                backend: ['Supabase', 'MQTT Broker'],
                ai: ['IoT Sensors', 'Wi-Fi Modules', 'Cloud Storage']
            }
        }
    },
    {
        title: 'Autonomous Drone Navigation (DQN)',
        subtitle: 'AI-Based Drone Control',
        category: 'AI & Robotics',
        year: '2025',
        tags: ['Python', 'TensorFlow', 'DQN', 'FastAPI', 'Flutter', 'Render'],
        image: '/projects/drone.png',
        description: 'Built an AI-driven autonomous drone navigation system using Deep Q-Learning.',
        color: '#8b5cf6',
        github: 'https://github.com',
        link: 'https://example.com',
        details: {
            mainDescription: "Built an AI-driven autonomous drone navigation system using Deep Q-Learning (DQN) for real-time decision making.",
            extendedDescription: "Deployed backend services on Render and packaged the system as an Android APK, featuring a Flutter app for real-time control and visualization.",
            pillars: [
                { label: "DQN Training" },
                { label: "Model Inference" },
                { label: "Control System" }
            ],
            features: [
                {
                    title: 'Self-Learning Navigation',
                    desc: 'Trained a DQN model to make real-time navigation decisions based on sensor inputs.',
                    type: 'brain'
                },
                {
                    title: 'FastAPI Backend',
                    desc: 'Developed a FastAPI backend for high-performance model inference and API communication.',
                    type: 'zap'
                },
                {
                    title: 'Flutter Visualizer',
                    desc: 'Integrated a Flutter mobile app for real-time control and visualization of drone state.',
                    type: 'activity'
                }
            ],
            techStack: {
                frontend: ['Flutter (Dart)', 'Mobile App APK'],
                backend: ['FastAPI', 'Python', 'Render Deployment'],
                ai: ['TensorFlow', 'Deep Q-Learning', 'Real-time decision making']
            }
        }
    },
    {
        title: 'Spam Email Detection (NLP + Flutter)',
        subtitle: 'Intelligent Spam Classifier',
        category: 'Machine Learning',
        year: '2025',
        tags: ['Python', 'NLP', 'Naive Bayes', 'TF-IDF', 'FastAPI', 'Flutter'],
        image: '/projects/spam.png',
        description: 'Implemented an NLP-based spam email classification system with real-time detection.',
        color: '#ec4899',
        github: 'https://github.com',
        link: 'https://example.com',
        details: {
            mainDescription: "Implemented an NLP-based spam email classification system using advanced text processing algorithms.",
            extendedDescription: "Achieved accurate and fast classification suitable for real-time usage, integrated into a user-friendly Flutter mobile application.",
            pillars: [
                { label: "TF-IDF Extraction" },
                { label: "Naive Bayes" },
                { label: "Real-time Usage" }
            ],
            features: [
                {
                    title: 'Classification Model',
                    desc: 'Used TF-IDF feature extraction and Naive Bayes for efficient and accurate text classification.',
                    type: 'brain'
                },
                {
                    title: 'Inference Engine',
                    desc: 'Built a FastAPI backend for prediction and served the model for real-time requests.',
                    type: 'zap'
                },
                {
                    title: 'Mobile Interface',
                    desc: 'Developed a Flutter mobile application for user-friendly spam detection interaction.',
                    type: 'activity'
                }
            ],
            techStack: {
                frontend: ['Flutter'],
                backend: ['FastAPI', 'Python'],
                ai: ['NLP', 'Naive Bayes Classifier', 'TF-IDF Vectorizer']
            }
        }
    },
    {
        title: 'Government Website Vulnerability Assessment',
        subtitle: 'Security Audit & Assessment',
        category: 'Cybersecurity',
        year: '2024',
        tags: ['Web Security', 'Vulnerability Assessment', 'CWE', 'OWASP'],
        image: '/projects/security.png',
        description: 'Conducted a security assessment of government websites focusing on authentication mechanisms.',
        color: '#10b981',
        github: 'https://github.com',
        link: 'https://example.com',
        details: {
            mainDescription: "Conducted a security assessment of government websites focusing on authentication mechanisms and discovering critical flaws.",
            extendedDescription: "Prepared detailed vulnerability reports with clear mitigation strategies and provided actionable recommendations aligned with secure coding standards.",
            pillars: [
                { label: "CWE-287 Focus" },
                { label: "Attack Vector Analysis" },
                { label: "OWASP Alignment" }
            ],
            features: [
                {
                    title: 'CWE-287 Discovery',
                    desc: 'Identified multiple CWE-287: Improper Authentication vulnerabilities across systems.',
                    type: 'shield'
                },
                {
                    title: 'Vulnerability Analysis',
                    desc: 'Analyzed potential attack vectors and real-world exploitation risks for discovered flaws.',
                    type: 'activity'
                },
                {
                    title: 'Mitigation Reports',
                    desc: 'Prepared detailed vulnerability reports with clear mitigation strategies and recommendations.',
                    type: 'zap'
                }
            ],
            techStack: {
                frontend: ['Vulnerability Scanners', 'Manual Pentesting'],
                backend: ['Security Audit Tools'],
                ai: ['Secure Coding Standards', 'CWE Mapping', 'Risk Assessment']
            }
        }
    },
    {
        title: 'Restaurant Website Development',
        subtitle: 'Responsive Restaurant Platform',
        category: 'Web Development',
        year: '2023',
        tags: ['HTML', 'CSS', 'JavaScript'],
        image: '/projects/restaurant.png',
        description: 'Developed a fully responsive restaurant website with a strong focus on UI/UX.',
        color: '#facc15',
        github: 'https://github.com',
        link: 'https://example.com',
        details: {
            mainDescription: "Developed a fully responsive restaurant website with a strong focus on UI/UX, ensuring a premium digital presence for the brand.",
            extendedDescription: "Optimized layout, typography, and animations for a professional brand presence. The project ensures fast loading performance and cross-browser compatibility.",
            pillars: [
                { label: "Responsive" },
                { label: "UI/UX Focus" },
                { label: "Performance" }
            ],
            features: [
                {
                    title: 'Mobile-First Design',
                    desc: 'Implemented mobile-first design to ensure smooth browsing across all devices.',
                    type: 'zap'
                },
                {
                    title: 'Interactive Sections',
                    desc: 'Created interactive sections for menu browsing, restaurant info, and contact details.',
                    type: 'activity'
                },
                {
                    title: 'Brand Presence',
                    desc: 'Optimized layout, typography, and animations for a professional brand presence.',
                    type: 'heart'
                }
            ],
            techStack: {
                frontend: ['HTML5', 'CSS3', 'JavaScript'],
                backend: ['Static Hosting'],
                ai: ['UI/UX Principles', 'Cross-browser compatibility', 'Fast Loading']
            }
        }
    },
    {
        title: 'Banking System (Java + JavaFX)',
        subtitle: 'Core Banking Application',
        category: 'Desktop Software',
        year: '2023',
        tags: ['Java', 'JavaFX', 'Swing'],
        image: '/projects/banking.png',
        description: 'Developed core banking system functionalities such as account creation, transactions, and balance management.',
        color: '#ef4444',
        github: 'https://github.com',
        link: 'https://example.com',
        details: {
            mainDescription: "Developed core banking system functionalities such as account creation, transactions, and balance management using Java.",
            extendedDescription: "Implemented business logic using object-oriented Java principles. Designed the system to be modular and easily extensible for future financial features.",
            pillars: [
                { label: "Secure Operations" },
                { label: "Modular Design" },
                { label: "JavaFX GUI" }
            ],
            features: [
                {
                    title: 'Core Functionalities',
                    desc: 'Account creation, transactions, and balance management with robust state tracking.',
                    type: 'activity'
                },
                {
                    title: 'Interactive GUI',
                    desc: 'Built an interactive and user-friendly GUI using JavaFX / Swing for better engagement.',
                    type: 'zap'
                },
                {
                    title: 'Input Validation',
                    desc: 'Ensured proper input validation and error handling for secure financial operations.',
                    type: 'shield'
                }
            ],
            techStack: {
                frontend: ['JavaFX', 'Swing', 'Custom Styles'],
                backend: ['Java SE', 'OOP Logic'],
                ai: ['Error Handling', 'Secure Input Validation', 'Modular Architecture']
            }
        }
    },
];

export const experiences = [
    {
        company: 'Singularity Technologies',
        role: 'Software Engineer (Full-time)',
        period: 'June 2025 — Present',
        startDate: '2025-06-01',
        endDate: null,
        location: 'Full-stack Development',
        type: 'zap',
        description: 'Transitioned to full-time after internship based on strong performance.',
        details: [
            'Working on OutCallerAI, contributing to full-stack features (frontend + backend).',
            'Implementing scalable functionalities, integrating APIs, and enhancing UI/UX.',
            'Collaborating with cross-functional teams to drive new product enhancements.'
        ],
        tags: ['Full-stack', 'OutCallerAI', 'API Integration', 'UI/UX']
    },
    {
        company: 'Omiyo (UK Company)',
        role: 'Software Developer (Contract)',
        period: 'Dec 2025 — Present',
        startDate: '2025-12-01',
        endDate: null,
        location: 'Remote (UK)',
        type: 'globe',
        description: 'Developing AsiansVibe, a social media community platform for asians abroad and businesses.',
        details: [
            'AsiansVibe project: social media community platform for asians people abroad also for businessness'
        ],
        tags: ['Social Media', 'Community', 'Next.js', 'Contract']
    },
    {
        company: 'Freelance',
        role: 'Freelance Software Developer',
        period: '2025 — Present',
        startDate: '2025-01-01',
        endDate: null,
        location: 'Global / Remote',
        type: 'award',
        description: 'Delivering tailored digital solutions and expert software consultancy to international clients.',
        details: [
            'Built complex web applications and interfaces for diverse industry verticals.',
            'Consulted on technical architecture and digital transformation for startups.',
            'Delivered end-to-end projects from conceptualization to global deployment.'
        ],
        tags: ['Consulting', 'Full-stack', 'Global Delivery'],
        highlight: true
    },
    {
        company: 'Singularity Technologies',
        role: 'Software Developer (Intern)',
        period: 'Aug 2024 — Jan 2025',
        startDate: '2024-08-01',
        endDate: '2025-01-31',
        location: 'Frontend Development',
        type: 'terminal',
        description: 'Contributed to frontend development for multiple internal and client projects.',
        details: [
            'OutRiskAI: Built and improved frontend components.',
            'Hiranandani VAPT Project: Performed penetration testing and prepared security reports.',
            'Company Website: Led frontend design and implementation.',
            'Gained experience with modern frameworks in an agile development environment.'
        ],
        tags: ['Frontend', 'VAPT', 'Security', 'Agile']
    },
];

export const caseStudies = [
    {
        id: '01',
        year: '2025',
        title: 'IoT-Based Data Logging System Using Cloud',
        category: 'IoT & Cloud Computing',
        problem: 'Industrial sectors lacked a reliable 24/7 real-time monitoring system for operational variables, relying on error-prone manual logging.',
        solution: 'Developed an automated IoT framework with a centralized cloud database, featuring real-time data transmission and a multi-user visual dashboard.',
        metrics: [
            { label: 'Monitoring', value: '24/7' },
            { label: 'Reliability', value: '100%' },
            { label: 'OpEx', value: '-40%' }
        ],
        image: '/case-studies/iot-logging.png',
        color: '#00f2ff',
        url: 'https://www.ijariit.com/manuscript/iot-based-data-logging-system-using-cloud/'
    },
    {
        id: '02',
        year: '2024',
        title: 'CWE-287 Vulnerability Disclosure',
        category: 'Cyber Security',
        problem: 'Identified critical Improper Authentication (CWE-287) vulnerabilities in government infrastructure that could lead to unauthorized access.',
        solution: 'Reported vulnerabilities through official channels (NCIIPC/CERT-In), providing detailed reproduction steps and mitigation strategies.',
        metrics: [
            { label: 'Impact', value: 'Critical' },
            { label: 'Auth', value: 'Official' },
            { label: 'Security', value: 'Verified' }
        ],
        image: '/case-studies/security-ack.png',
        color: '#ffd700'
    }
];
