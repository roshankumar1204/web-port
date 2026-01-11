export const projectsData = [
    {
        id: 1,
        name: 'Soni – AI Virtual Assistant Platform',
        description: "Built an AI-powered virtual assistant that can read and send emails, manage Google Calendar events, and perform intelligent web-based tasks using natural language. The platform integrates secure Google OAuth, LLM-powered reasoning, and real-time voice interaction to deliver a fully automated personal productivity experience.",
        tools: ['React', 'Next.js', 'Python', 'Flask', 'Google OAuth', 'Gmail API', 'Google Calendar API', 'LangChain', 'LLM', 'Cloud Run', 'Supabase'],
        role: 'Full Stack Developer',
        code: '',
        demo: 'https://sonii.app/home'
    }
    ,
    {
        id: 2,
        name: 'Website Cloner ',
        description: "Built an end-to-end AI pipeline that automatically converts real websites into fully functional React + Tailwind applications. The system captures full-page screenshots and DOM using Puppeteer, intelligently splits large pages into semantic visual sections, and uses a multi-model vision-LLM cascade to reconstruct pixel-accurate UI components. It integrates HTML and CSS semantic analysis to preserve layout, content, and design while eliminating noise from hydration scripts and trackers. The pipeline outputs a complete, ready-to-run React project with merged components, layout fidelity, and minimal hallucination.",
        tools: [
            'Node.js',
            'Puppeteer',
            'Sharp',
            'Cheerio',
            'React',
            'Tailwind CSS',
            'Gemini Vision',
            'Qwen2-VL',
            'Docker',
            'HTML5',
            'CSS3'
        ],
        role: 'Full-Stack AI Engineer & System Architect',
        code: '',
        demo: 'https://cloner.live'
    }
    , {
        id: 3,
        name: 'Indian Sign Language Recognition & Sentence Builder',
        description: "Built an end-to-end AI-powered ISL recognition system that converts sign language videos into words and full Hindi sentences. The platform supports webcam recording and multi-video uploads, extracts hand and pose keypoints using MediaPipe, and uses an LSTM deep learning model to classify 61 ISL gestures. A Gemini-powered language model converts predicted words into grammatically correct Hindi sentences in real time.",
        tools: ['Python', 'TensorFlow', 'MediaPipe', 'LSTM', 'Gradio', 'Gemini API', 'OpenCV', 'NumPy'],
        code: 'https://github.com/roshankumar1204/ISL',
        demo: 'https://github.com/roshankumar1204/ISL',
        role: 'AI Engineer & Full Stack Developer',
    },

    {
        id: 4,
        name: 'Rizhu Token on Blockchain',
        description: "Developed a blockchain token on the Internet Computer platform that allows users to securely transfer and receive funds with double authentication. The UI is inspired by 90s websites to enhance trust and transparency.",
        tools: ['Dfinity', 'Motoko', 'TypeScript', 'React', 'Auth', 'API', 'Canister'],
        code: '',
        role: 'Full Stack Developer',
        demo: 'https://github.com/roshankumar1204/rihzu-token',
    },

];


// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
//     demo: '',
// },