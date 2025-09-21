// Global variables
let currentUser = null;
let dashboardInterval = null; // To hold the interval for automatic refresh
let qrScanner = null;
let scheduleRefreshIntervalId = null;
let lastDayString = new Date().toDateString();

// Real-time timetable (day-wise) for student and teacher
const scheduleData = {
    student: {
        Monday: [
            { time: "10:00 - 11:50", subject: "CN LAB (A1) / CSL LAB (A2)", room: "Lab", code: "LAB" },
            { time: "11:50 - 12:10", subject: "Short Break", room: "", code: "BREAK" },
            { time: "12:10 - 1:05", subject: "MR&MM", room: "LH", code: "MRMM" },
            { time: "1:05 - 2:00", subject: "TOC", room: "LH", code: "TOC" },
            { time: "2:00 - 3:10", subject: "Lunch", room: "Cafeteria", code: "LUNCH" },
            { time: "3:10 - 4:05", subject: "Library Hour", room: "Library", code: "LIB" },
            { time: "4:05 - 5:00", subject: "", room: "", code: "" }
        ],
        Tuesday: [
            { time: "10:00 - 10:55", subject: "RMIPR", room: "LH", code: "RMIPR" },
            { time: "10:55 - 11:50", subject: "MR&MM", room: "LH", code: "MRMM" },
            { time: "11:50 - 12:10", subject: "Short Break", room: "", code: "BREAK" },
            { time: "12:10 - 1:05", subject: "TOC", room: "LH-303", code: "TOC" },
            { time: "1:05 - 2:00", subject: "CN", room: "LH", code: "CN" },
            { time: "2:00 - 3:10", subject: "Lunch", room: "Cafeteria", code: "LUNCH" },
            { time: "3:10 - 4:05", subject: "Mini Project", room: "Project Lab", code: "MP" },
            { time: "4:05 - 5:00", subject: "", room: "", code: "" }
        ],
        Wednesday: [
            { time: "10:00 - 10:55", subject: "MR&MM", room: "LH", code: "MRMM" },
            { time: "10:55 - 11:50", subject: "FM", room: "LH-303", code: "FM" },
            { time: "11:50 - 12:10", subject: "Short Break", room: "", code: "BREAK" },
            { time: "12:10 - 2:00", subject: "CN LAB (A2) / CSL LAB (A1)", room: "Lab", code: "LAB" },
            { time: "2:00 - 3:10", subject: "Lunch", room: "Cafeteria", code: "LUNCH" },
            { time: "3:10 - 4:05", subject: "", room: "", code: "" },
            { time: "4:05 - 5:00", subject: "", room: "", code: "" }
        ],
        Thursday: [
            { time: "10:00 - 10:55", subject: "FM", room: "LH-303", code: "FM" },
            { time: "10:55 - 11:50", subject: "TOC", room: "LH-303", code: "TOC" },
            { time: "11:50 - 12:10", subject: "Short Break", room: "", code: "BREAK" },
            { time: "12:10 - 1:05", subject: "CN", room: "LH-303", code: "CN" },
            { time: "1:05 - 2:00", subject: "RMIPR", room: "LH-303", code: "RMIPR" },
            { time: "2:00 - 3:10", subject: "Lunch", room: "Cafeteria", code: "LUNCH" },
            { time: "3:10 - 4:05", subject: "", room: "", code: "" },
            { time: "4:05 - 5:00", subject: "", room: "", code: "" }
        ],
        Friday: [
            { time: "10:00 - 10:55", subject: "CN", room: "LH-303", code: "CN" },
            { time: "10:55 - 11:50", subject: "RMIPR", room: "LH-303", code: "RMIPR" },
            { time: "11:50 - 12:10", subject: "Short Break", room: "", code: "BREAK" },
            { time: "12:10 - 1:05", subject: "FM", room: "LH-303", code: "FM" },
            { time: "1:05 - 2:00", subject: "TOC", room: "LH-303", code: "TOC" },
            { time: "2:00 - 3:10", subject: "Lunch", room: "Cafeteria", code: "LUNCH" },
            { time: "4:05 - 5:00", subject: "NSS/YOGA/PE", room: "Ground", code: "NSS" },
            { time: "4:05 - 5:00", subject: "", room: "", code: "" }
        ],
        Saturday: [
            { time: "10:00 - 10:55", subject: "TOC", room: "LH-303", code: "TOC" },
            { time: "10:55 - 11:50", subject: "FM", room: "LH-303", code: "FM" },
            { time: "11:50 - 12:10", subject: "Short Break", room: "", code: "BREAK" },
            { time: "12:10 - 1:05", subject: "RMIPR", room: "LH", code: "RMIPR" },
            { time: "1:05 - 2:00", subject: "ESWM", room: "LH", code: "ESWM" },
            { time: "2:00 - 3:10", subject: "Lunch", room: "Cafeteria", code: "LUNCH" },
            { time: "3:10 - 4:05", subject: "LH-303", room: "LH-303", code: "LH303" },
            { time: "4:05 - 5:00", subject: "", room: "", code: "" }
        ]
    },
    teacher: {
        Monday: [
            { time: "10:00 - 10:55", subject: "CN", room: "LH-303", code: "CN" },
            { time: "10:55 - 11:50", subject: "RMIPR", room: "LH-303", code: "RMIPR" },
            { time: "11:50 - 12:10", subject: "Short Break", room: "", code: "BREAK" },
            { time: "12:10 - 1:05", subject: "MR&MM", room: "LH", code: "MRMM" },
            { time: "1:05 - 2:00", subject: "FM", room: "LH-303", code: "FM" },
            { time: "2:00 - 3:10", subject: "Lunch", room: "Cafeteria", code: "LUNCH" },
            { time: "3:10 - 4:05", subject: "", room: "", code: "" },
            { time: "4:05 - 5:00", subject: "", room: "", code: "" }
        ],
        Tuesday: [
            { time: "10:00 - 10:55", subject: "FM", room: "LH-303", code: "FM" },
            { time: "10:55 - 11:50", subject: "TOC", room: "LH-303", code: "TOC" },
            { time: "11:50 - 12:10", subject: "Short Break", room: "", code: "BREAK" },
            { time: "12:10 - 1:05", subject: "CN LAB (A1) / CSL LAB (A2)", room: "Lab", code: "LAB" },
            { time: "1:05 - 2:00", subject: "RMIPR", room: "LH-303", code: "RMIPR" },
            { time: "2:00 - 3:10", subject: "Lunch", room: "Cafeteria", code: "LUNCH" },
            { time: "3:10 - 4:05", subject: "", room: "", code: "" },
            { time: "4:05 - 5:00", subject: "", room: "", code: "" }
        ],
        Wednesday: [
            { time: "10:00 - 10:55", subject: "MR&MM", room: "LH", code: "MRMM" },
            { time: "10:55 - 11:50", subject: "CN", room: "LH-303", code: "CN" },
            { time: "11:50 - 12:10", subject: "Short Break", room: "", code: "BREAK" },
            { time: "12:10 - 2:00", subject: "TOC", room: "LH-303", code: "TOC" },
            { time: "2:00 - 3:10", subject: "Lunch", room: "Cafeteria", code: "LUNCH" },
            { time: "3:10 - 4:05", subject: "Mini Project", room: "Project Lab", code: "MP" },
            { time: "4:05 - 5:00", subject: "", room: "", code: "" }
        ],
        Thursday: [
            { time: "10:00 - 10:55", subject: "RMIPR", room: "LH-303", code: "RMIPR" },
            { time: "10:55 - 11:50", subject: "FM", room: "LH-303", code: "FM" },
            { time: "11:50 - 12:10", subject: "Short Break", room: "", code: "BREAK" },
            { time: "12:10 - 1:05", subject: "TOC", room: "LH-303", code: "TOC" },
            { time: "1:05 - 2:00", subject: "CN", room: "LH-303", code: "CN" },
            { time: "2:00 - 3:10", subject: "Lunch", room: "Cafeteria", code: "LUNCH" },
            { time: "3:10 - 4:05", subject: "Library Hour", room: "Library", code: "LIB" },
            { time: "4:05 - 5:00", subject: "", room: "", code: "" }
        ],
        Friday: [
            { time: "10:00 - 10:55", subject: "TOC", room: "LH-303", code: "TOC" },
            { time: "10:55 - 11:50", subject: "CN", room: "LH-303", code: "CN" },
            { time: "11:50 - 12:10", subject: "Short Break", room: "", code: "BREAK" },
            { time: "12:10 - 1:05", subject: "RMIPR", room: "LH-303", code: "RMIPR" },
            { time: "1:05 - 2:00", subject: "FM", room: "LH-303", code: "FM" },
            { time: "2:00 - 3:10", subject: "Lunch", room: "Cafeteria", code: "LUNCH" },
            { time: "4:05 - 5:00", subject: "NSS/YOGA/PE", room: "Ground", code: "NSS" },
            { time: "4:05 - 5:00", subject: "", room: "", code: "" }
        ],
        Saturday: [
            { time: "10:00 - 10:55", subject: "MR&MM", room: "LH", code: "MRMM" },
            { time: "10:55 - 11:50", subject: "CN LAB (A2) / CSL LAB (A1)", room: "Lab", code: "LAB" },
            { time: "11:50 - 12:10", subject: "Short Break", room: "", code: "BREAK" },
            { time: "12:10 - 1:05", subject: "ESWM", room: "LH", code: "ESWM" },
            { time: "1:05 - 2:00", subject: "Library Hour", room: "Library", code: "LIB" },
            { time: "2:00 - 3:10", subject: "Lunch", room: "Cafeteria", code: "LUNCH" },
            { time: "3:10 - 4:05", subject: "", room: "", code: "" },
            { time: "4:05 - 5:00", subject: "", room: "", code: "" }
        ]
    }
};

function getTodayDayName() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
}

function isNowWithin(timeRange) {
    // timeRange format: "HH:MM - HH:MM"
    const [start, end] = timeRange.split('-').map(s => s.trim());
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const startMin = sh * 60 + sm;
    const endMin = eh * 60 + em;
    return nowMin >= startMin && nowMin < endMin;
}

const activities = [
    {
        title: "📖 Practice Python Programming",
        description: "Complete coding challenges on HackerRank",
        duration: "30-45 minutes",
        category: "skill",
        link: "explore_more/pythonProgramming.html"
    },
    {
        title: "📚 Read Research Papers",
        description: "Explore academic journals and publications. Focus on recent advancements in your field, identify key researchers, and summarize findings. Good sources include IEEE Xplore, ACM Digital Library, or arXiv.",
        duration: "45-60 minutes",
        category: "academic",
        link: "quiz/aiMlResearchPapers.html"
    },
    {
        title: "🎯 Career Planning",
        description: "Update your resume to highlight recent achievements, refine your LinkedIn profile with new skills, research potential employers, and practice interview questions. Consider setting up informational interviews.",
        duration: "30 minutes",
        category: "career",
        link: "explore_more/careerPlanning.html"
    },
    {
        title: "🧮 Math Problem Solving",
        description: "Solve practice problems for upcoming exam",
        duration: "45 minutes",
        category: "academic",
        link: "explore_more/mathProblemSolving.html"
    },
    {
        title: "💡 Project Brainstorming",
        description: "Explore ideas for mini-projects to enhance your skills and portfolio.",
        duration: "30-60 minutes",
        category: "project",
        link: "explore_more/projectBrainstorming.html"
    },
    {
        title: "🏃 Physical Activity",
        description: "Engage in light to moderate physical activity such as a brisk walk, stretching, yoga, or a short cardio session. This helps improve focus, reduce stress, and boost overall well-being.",
        duration: "15-20 minutes",
        category: "wellness",
        link: "explore_more/physicalActivity.html"
    }
];

// Initialize app on load
window.onload = function() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    }
    
    // Call loadQuizzes from quiz1.js if student dashboard is active
    if (document.getElementById('studentDashboard').classList.contains('active') && typeof loadQuizzes === 'function') {
        loadQuizzes();
    }
    
    // Initialize sample attendance data if not exists
    if (!localStorage.getItem('attendanceData')) {
        localStorage.setItem('attendanceData', JSON.stringify({}));
    }
};

// Login function
function login() {
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('userRole').value;
    
    if (!userId || !password) {
        alert('Please enter User ID and Password');
        return;
    }
    
    // For demo, accept any credentials
    currentUser = {
        id: userId,
        name: userId,
        role: role
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showDashboard();
}

// Show appropriate dashboard
function showDashboard() {
    document.getElementById('loginScreen').classList.remove('active');
    
    if (currentUser.role === 'student') {
        document.getElementById('studentDashboard').classList.add('active');
        document.getElementById('studentName').textContent = currentUser.name;
        loadStudentDashboard();
        startDashboardUpdates(); // Start automatic updates
    } else {
        document.getElementById('teacherDashboard').classList.add('active');
        document.getElementById('teacherName').textContent = currentUser.name;
        loadTeacherDashboard();
    }
}

// Load Student Dashboard
function loadStudentDashboard() {
    displayStudentProfile();
    displayStudentSchedule();
    displayProductivityTracker();
    displayActivities(); // This will now display only non-linked activities
    displayLinkedActivities(); // New function to display linked activities
    displayAttendanceHistory();
    
    // Load quizzes and explore more activities
    setTimeout(() => {
        if (typeof loadQuizzes === 'function') {
            loadQuizzes();
            console.log('✓ Quizzes loaded');
        } else {
            console.log('loadQuizzes function not found, loading manually...');
            loadQuizzesManually();
        }
        
        displayLinkedActivities();
        console.log('✓ Explore More activities loaded');
    }, 500);
    
    // Setup auto-refresh for today's schedule and activities
    setupStudentScheduleAutoRefresh();
}

// Enhanced Student Schedule Display with Time Table
function displayStudentSchedule() {
    const scheduleDiv = document.getElementById('scheduleList');
    if (!scheduleDiv) return;

    const today = getTodayDayName();
    const currentTime = new Date();
    const items = (scheduleData.student[today] || []);

    // Calculate stats
    const totalClasses = items.filter(item => item.subject && item.code !== 'BREAK' && item.code !== 'LUNCH').length;
    const labClasses = items.filter(item => /LAB/i.test(item.subject) || item.code === 'LAB').length;
    const currentClass = items.find(item => isNowWithin(item.time));
    const nextClass = getNextClass(items);
    const attendedClasses = getStudentAttendedClasses(today);

    // Build enhanced UI with time table
    let html = '';

    // Header with live stats and day navigation
    html += `
        <div style="background: linear-gradient(135deg, #2196f3 0%, #21cbf3 100%); color: white; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div>
                    <h4 style="margin: 0; font-size: 18px;">📚 Today's Schedule</h4>
                    <p style="margin: 5px 0 0; opacity: 0.9;">${today} • ${currentTime.toLocaleTimeString()}</p>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 24px; font-weight: bold;">${totalClasses}</div>
                    <div style="font-size: 12px; opacity: 0.9;">Classes</div>
                </div>
            </div>
            
            <!-- Day Navigation -->
            <div style="display: flex; gap: 5px; justify-content: center; margin-top: 10px;">
                ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => `
                    <button onclick="switchStudentDay('${day}')" 
                            style="padding: 4px 8px; background: ${day === today ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}; 
                                   color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; cursor: pointer; font-size: 10px;">
                        ${day.substr(0, 3)}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    // Current/Next class info bar
    if (currentClass) {
        const timeLeft = getTimeLeft(currentClass.time);
        html += `
            <div style="background: #e8f5e9; border: 1px solid #4caf50; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="color: #2e7d32;">🟢 Current Class: ${currentClass.subject || 'Free Period'}</strong>
                        <span style="margin-left: 15px; color: #666;">Room: ${currentClass.room || 'N/A'}</span>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 14px; font-weight: bold; color: #2e7d32;">${timeLeft}</div>
                        <div style="font-size: 11px; color: #666;">Time Left</div>
                    </div>
                </div>
            </div>
        `;
    } else if (nextClass) {
        const timeUntil = getTimeUntil(nextClass.time);
        html += `
            <div style="background: #fff3e0; border: 1px solid #ff9800; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="color: #f57c00;">⏰ Next Class: ${nextClass.subject}</strong>
                        <span style="margin-left: 15px; color: #666;">Room: ${nextClass.room || 'N/A'}</span>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 14px; font-weight: bold; color: #f57c00;">${timeUntil}</div>
                        <div style="font-size: 11px; color: #666;">Starts In</div>
                    </div>
                </div>
            </div>
        `;
    } else {
        html += `
            <div style="background: #f3e5f5; border: 1px solid #9c27b0; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="text-align: center;">
                    <strong style="color: #7b1fa2;">✨ All Classes Completed for Today!</strong>
                </div>
            </div>
        `;
    }

    // Quick stats bar
    html += `
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <div style="flex: 1; background: #e3f2fd; border: 1px solid #90caf9; border-radius: 8px; padding: 10px; text-align: center;">
                <div style="font-size: 18px; font-weight: bold; color: #1976d2;">${totalClasses}</div>
                <div style="font-size: 11px; color: #666;">Total Classes</div>
            </div>
            <div style="flex: 1; background: #e8f5e9; border: 1px solid #81c784; border-radius: 8px; padding: 10px; text-align: center;">
                <div style="font-size: 18px; font-weight: bold; color: #388e3c;">${labClasses}</div>
                <div style="font-size: 11px; color: #666;">Lab Sessions</div>
            </div>
            <div style="flex: 1; background: #fff3e0; border: 1px solid #ffb74d; border-radius: 8px; padding: 10px; text-align: center;">
                <div style="font-size: 18px; font-weight: bold; color: #f57c00;">${attendedClasses}</div>
                <div style="font-size: 11px; color: #666;">Attended</div>
            </div>
            <div style="flex: 1; background: #f3e5f5; border: 1px solid #ce93d8; border-radius: 8px; padding: 10px; text-align: center;">
                <div style="font-size: 18px; font-weight: bold; color: #7b1fa2;">${items.filter(i => i.code === 'BREAK' || i.code === 'LUNCH').length}</div>
                <div style="font-size: 11px; color: #666;">Breaks</div>
            </div>
        </div>
    `;

    // Time Table View
    if (items.length === 0) {
        html += `
            <div style="text-align: center; padding: 30px; background: #f8f9fa; border-radius: 8px; border: 2px dashed #dee2e6;">
                <div style="font-size: 48px; margin-bottom: 10px;">📅</div>
                <h4 style="color: #6c757d; margin: 0;">No Classes Scheduled</h4>
                <p style="color: #6c757d; margin: 5px 0 0;">Enjoy your free day!</p>
            </div>
        `;
    } else {
        html += `<div style="margin-bottom: 10px;">`;
        items.forEach((item, index) => {
            const isCurrent = isNowWithin(item.time);
            const isPast = isPastTime(item.time);
            const isBreak = item.code === 'BREAK' || item.code === 'LUNCH';
            const isLab = /LAB/i.test(item.subject || '') || item.code === 'LAB';
            const isAttended = hasAttendedClass(item.code, today);

            let bgColor = '#fff';
            let borderColor = '#eee';
            let statusBadge = '';
            let statusColor = '#666';

            if (isCurrent) {
                bgColor = '#e8f5e9';
                borderColor = '#4caf50';
                statusBadge = '🟢 CURRENT';
                statusColor = '#2e7d32';
            } else if (isPast) {
                bgColor = isAttended ? '#e8f5e9' : '#ffebee';
                borderColor = isAttended ? '#81c784' : '#ef5350';
                statusBadge = isAttended ? '✅ ATTENDED' : '❌ MISSED';
                statusColor = isAttended ? '#388e3c' : '#d32f2f';
            } else {
                statusBadge = '⏰ UPCOMING';
                statusColor = '#1976d2';
            }

            if (isBreak) {
                bgColor = isCurrent ? '#fff3e0' : (isPast ? '#f5f5f5' : '#fffbf0');
                borderColor = '#ffb74d';
                statusBadge = isPast ? '✅ BREAK' : (isCurrent ? '🟢 BREAK' : '⏰ BREAK');
            }

            html += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; border: 1px solid ${borderColor}; border-radius: 8px; background: ${bgColor}; margin-bottom: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 40px; height: 40px; background: ${isBreak ? '#ff9800' : (isLab ? '#4caf50' : '#2196f3')}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">
                            ${isBreak ? '☕' : (isLab ? '🧪' : '📖')}
                        </div>
                        <div>
                            <div style="font-weight: 600; color: #333; font-size: 16px;">${item.subject || 'Free Period'}</div>
                            <div style="font-size: 12px; color: #666;">
                                ${item.time} ${item.room ? `• Room: ${item.room}` : ''}
                                ${item.code ? `• Code: ${item.code}` : ''}
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="margin-bottom: 4px;">
                            <span style="display: inline-block; padding: 2px 6px; border-radius: 12px; font-size: 10px; font-weight: bold; color: ${statusColor}; background: ${isCurrent ? '#d4edda' : (isPast ? (isAttended ? '#d4edda' : '#f8d7da') : '#e3f2fd')};">
                                ${statusBadge}
                            </span>
                        </div>
                        ${isCurrent ? `<div style="font-size: 11px; color: #666;">${getTimeLeft(item.time)} left</div>` : ''}
                        ${!isCurrent && !isPast ? `<div style="font-size: 11px; color: #666;">${getTimeUntil(item.time)}</div>` : ''}
                        ${!isBreak && (isCurrent || isPast) ? `
                            <button onclick="markStudentAttendance('${item.code}', '${today}')" 
                                    style="margin-top: 4px; padding: 2px 6px; background: ${isAttended ? '#4caf50' : '#2196f3'}; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 10px;">
                                ${isAttended ? '✓ Attended' : '📝 Mark'}
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        });
        html += `</div>`;

        // Action buttons
        html += `
            <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px;">
                <button onclick="refreshStudentSchedule()" style="padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
                    🔄 Refresh
                </button>
                <button onclick="exportStudentSchedule()" style="padding: 8px 16px; background: #4caf50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
                    📄 Export
                </button>
                <button onclick="viewWeeklySchedule()" style="padding: 8px 16px; background: #9c27b0; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
                    📅 Weekly View
                </button>
            </div>
        `;
    }

    scheduleDiv.innerHTML = html;
}

// Switch student day view
function switchStudentDay(selectedDay) {
    // Temporarily override the day for display
    const originalGetTodayDayName = window.getTodayDayName;
    window.getTodayDayName = () => selectedDay;
    
    displayStudentSchedule();
    
    // Restore original function after a delay
    setTimeout(() => {
        window.getTodayDayName = originalGetTodayDayName;
    }, 100);
    
    showProductivityNotification(`📅 Viewing ${selectedDay}'s schedule`);
}

// Get student attended classes count
function getStudentAttendedClasses(date) {
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData') || '{}');
    const userAttendance = attendanceData[currentUser.id] || {};
    const dayAttendance = userAttendance[date] || [];
    return dayAttendance.length;
}

// Check if student has attended a specific class
function hasAttendedClass(classCode, date) {
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData') || '{}');
    const userAttendance = attendanceData[currentUser.id] || {};
    const dayAttendance = userAttendance[date] || [];
    return dayAttendance.includes(classCode);
}

// Mark student attendance manually
function markStudentAttendance(classCode, date) {
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData') || '{}');
    if (!attendanceData[currentUser.id]) attendanceData[currentUser.id] = {};
    if (!attendanceData[currentUser.id][date]) attendanceData[currentUser.id][date] = [];
    
    const dayAttendance = attendanceData[currentUser.id][date];
    
    if (dayAttendance.includes(classCode)) {
        // Remove attendance
        const index = dayAttendance.indexOf(classCode);
        dayAttendance.splice(index, 1);
        showProductivityNotification(`❌ Attendance removed for ${classCode}`);
    } else {
        // Add attendance
        dayAttendance.push(classCode);
        showProductivityNotification(`✅ Attendance marked for ${classCode}`);
    }
    
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
    displayStudentSchedule(); // Refresh display
}

// Refresh student schedule
function refreshStudentSchedule() {
    displayStudentSchedule();
    showProductivityNotification('🔄 Schedule refreshed!');
}

// Export student schedule
function exportStudentSchedule() {
    const today = getTodayDayName();
    const items = (scheduleData.student[today] || []);
    
    if (items.length === 0) {
        showProductivityNotification('❌ No classes to export for ' + today);
        return;
    }
    
    const csv = [['Time', 'Subject', 'Room', 'Code', 'Type', 'Status', 'Student', 'Date']];
    
    items.forEach(item => {
        const type = item.code === 'BREAK' || item.code === 'LUNCH' ? 'Break' : 
                    (/LAB/i.test(item.subject || '') || item.code === 'LAB' ? 'Lab' : 'Lecture');
        const isAttended = hasAttendedClass(item.code, today);
        const isPast = isPastTime(item.time);
        
        let status = 'Scheduled';
        if (isPast) {
            status = isAttended ? 'Attended' : 'Missed';
        }
        
        csv.push([
            item.time,
            item.subject || '',
            item.room || '',
            item.code || '',
            type,
            status,
            currentUser.name,
            today
        ]);
    });
    
    const csvContent = csv.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_schedule_${today}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showProductivityNotification(`📄 ${today} schedule exported!`);
}

// View weekly schedule
function viewWeeklySchedule() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.8); z-index: 10000; display: flex; 
        align-items: center; justify-content: center;
    `;
    
    let weeklyHtml = `
        <div style="background: white; border-radius: 12px; padding: 20px; max-width: 900px; width: 95%; max-height: 90vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #333;">📅 Weekly Schedule</h2>
                <button onclick="this.closest('div').parentElement.remove()" style="background: #f44336; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">×</button>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
    `;
    
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach(day => {
        const dayItems = scheduleData.student[day] || [];
        const isToday = day === getTodayDayName();
        
        weeklyHtml += `
            <div style="border: 2px solid ${isToday ? '#2196f3' : '#ddd'}; border-radius: 8px; padding: 12px; background: ${isToday ? '#e3f2fd' : '#f9f9f9'};">
                <h4 style="margin: 0 0 10px; color: ${isToday ? '#1976d2' : '#333'}; text-align: center;">
                    ${day} ${isToday ? '(Today)' : ''}
                </h4>
        `;
        
        if (dayItems.length === 0) {
            weeklyHtml += '<p style="text-align: center; color: #666; font-style: italic;">No classes</p>';
        } else {
            dayItems.forEach(item => {
                const isBreak = item.code === 'BREAK' || item.code === 'LUNCH';
                const isLab = /LAB/i.test(item.subject || '') || item.code === 'LAB';
                
                weeklyHtml += `
                    <div style="background: ${isBreak ? '#fff3e0' : (isLab ? '#e8f5e9' : '#e3f2fd')}; padding: 8px; border-radius: 4px; margin-bottom: 6px; border-left: 3px solid ${isBreak ? '#ff9800' : (isLab ? '#4caf50' : '#2196f3')};">
                        <div style="font-size: 12px; font-weight: bold;">${item.time}</div>
                        <div style="font-size: 11px; color: #666;">${item.subject || 'Free'}</div>
                        <div style="font-size: 10px; color: #888;">${item.room || ''}</div>
function displayStudentProfile() {
    const profileDiv = document.getElementById('studentProfile');
    
    // Generate student details based on logged-in user
    const studentDetails = getStudentDetails(currentUser.id);
    
    profileDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 12px;">
            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 20px; font-weight: bold;">${studentDetails.name.charAt(0)}</span>
            </div>
            <div style="flex: 1;">
                <div style="font-weight: bold; color: #333; font-size: 16px; margin-bottom: 2px;">${studentDetails.name}</div>
                <div style="color: #666; font-size: 12px;">${studentDetails.studentId} | ${studentDetails.rollNo}</div>
            </div>
            <div style="text-align: center; padding: 5px 12px; background: ${studentDetails.attendance >= 75 ? '#d4edda' : '#fff3cd'}; border-radius: 6px;">
                <div style="font-size: 18px; font-weight: bold; color: ${studentDetails.attendance >= 75 ? '#155724' : '#856404'};">${studentDetails.attendance}%</div>
                <div style="color: #666; font-size: 10px;">Attendance</div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
            <div style="padding: 6px; background: #f8f9fa; border-radius: 4px;">
                <span style="color: #888;">🎓</span>
                <span style="color: #333; margin-left: 4px;">${studentDetails.course}</span>
            </div>
            <div style="padding: 6px; background: #f8f9fa; border-radius: 4px;">
                <span style="color: #888;">🏫</span>
                <span style="color: #333; margin-left: 4px;">${studentDetails.section}</span>
            </div>
            <div style="padding: 6px; background: #f8f9fa; border-radius: 4px;">
                <span style="color: #888;">📅</span>
                <span style="color: #333; margin-left: 4px;">${studentDetails.semester}</span>
            </div>
            <div style="padding: 6px; background: #f8f9fa; border-radius: 4px;">
                <span style="color: #888;">🏪</span>
                <span style="color: #333; margin-left: 4px;">${studentDetails.department.split(' ')[0]}</span>
            </div>
        </div>

        <div id="profileDateTimeSection" style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;">
            <div id="profileDateTime" style="font-size: 14px; font-weight: 500; color: #333;"></div>
            <div id="profileTimeZone" style="font-size: 11px; color: #777; margin-top: 4px;"></div>
        </div>
    `;
}

// Get student details based on user ID
function getStudentDetails(userId) {
    // Sample student profiles - in real app, this would come from database
    const studentProfiles = {
        'student1': {
            name: 'Rahul Kumar',
            studentId: 'STU2023001',
            course: 'B.Tech Computer Science',
            section: 'Section A',
            rollNo: 'A001',
            semester: '5th Semester',
            email: 'rahul.kumar@punjabuniv.edu',
            phone: '+91 98765-43210',
            department: 'Computer Science & Engineering',
            attendance: 85
        },
        'student2': {
            name: 'Priya Singh',
            studentId: 'STU2023002',
            course: 'B.Tech Computer Science',
            section: 'Section A',
            rollNo: 'A002',
            semester: '5th Semester',
            email: 'priya.singh@punjabuniv.edu',
            phone: '+91 98765-43211',
            department: 'Computer Science & Engineering',
            attendance: 92
        },
        'default': {
            name: currentUser.name || 'Student Name',
            studentId: 'STU2023XXX',
            course: 'B.Tech Computer Science',
            section: 'Section A',
            rollNo: 'AXXX',
            semester: '5th Semester',
            email: 'student@punjabuniv.edu',
            phone: '+91 XXXXX-XXXXX',
            department: 'Computer Science & Engineering',
            attendance: 78
        }
    };
    
    return studentProfiles[userId] || studentProfiles['default'];
}

// Enhanced Teacher Schedule Display
function displayTeacherSchedule() {
    const scheduleDiv = document.getElementById('teacherSchedule');
    if (!scheduleDiv) return;
    
    const today = getTodayDayName();
    const items = (scheduleData.teacher[today] || []);
    const currentTime = new Date().toLocaleTimeString();
    
    // Calculate stats
    const totalClasses = items.filter(item => item.subject && item.code !== 'BREAK' && item.code !== 'LUNCH').length;
    const labClasses = items.filter(item => /LAB/i.test(item.subject) || item.code === 'LAB').length;
    const currentClass = items.find(item => isNowWithin(item.time));
    const nextClass = getNextClass(items);
    
    // Build enhanced UI
    let html = '';
    
    // Header with live stats
    html += `
        <div style="background: linear-gradient(135deg, #4caf50 0%, #45a049 100%); color: white; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="margin: 0; font-size: 18px;">📚 Your Classes Today</h4>
                    <p style="margin: 5px 0 0; opacity: 0.9;">${today} • ${currentTime}</p>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 24px; font-weight: bold;">${totalClasses}</div>
                    <div style="font-size: 12px; opacity: 0.9;">Classes</div>
                </div>
            </div>
        </div>
    `;
    
    // Current/Next class info bar
    if (currentClass) {
        const timeLeft = getTimeLeft(currentClass.time);
        html += `
            <div style="background: #e8f5e9; border: 1px solid #4caf50; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="color: #2e7d32;">🟢 Current Class: ${currentClass.subject || 'Free Period'}</strong>
                        <span style="margin-left: 15px; color: #666;">Room: ${currentClass.room || 'N/A'}</span>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 14px; font-weight: bold; color: #2e7d32;">${timeLeft}</div>
                        <div style="font-size: 11px; color: #666;">Time Left</div>
                    </div>
                </div>
            </div>
        `;
    } else if (nextClass) {
        const timeUntil = getTimeUntil(nextClass.time);
        html += `
            <div style="background: #fff3e0; border: 1px solid #ff9800; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="color: #f57c00;">⏰ Next Class: ${nextClass.subject}</strong>
                        <span style="margin-left: 15px; color: #666;">Room: ${nextClass.room || 'N/A'}</span>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 14px; font-weight: bold; color: #f57c00;">${timeUntil}</div>
                        <div style="font-size: 11px; color: #666;">Starts In</div>
                    </div>
                </div>
            </div>
        `;
    } else {
        html += `
            <div style="background: #f3e5f5; border: 1px solid #9c27b0; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="text-align: center;">
                    <strong style="color: #7b1fa2;">✨ All Classes Completed for Today!</strong>
                </div>
            </div>
        `;
    }
    
    // Quick stats bar
    html += `
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <div style="flex: 1; background: #e3f2fd; border: 1px solid #90caf9; border-radius: 8px; padding: 10px; text-align: center;">
                <div style="font-size: 18px; font-weight: bold; color: #1976d2;">${totalClasses}</div>
                <div style="font-size: 11px; color: #666;">Total Classes</div>
            </div>
            <div style="flex: 1; background: #e8f5e9; border: 1px solid #81c784; border-radius: 8px; padding: 10px; text-align: center;">
                <div style="font-size: 18px; font-weight: bold; color: #388e3c;">${labClasses}</div>
                <div style="font-size: 11px; color: #666;">Lab Sessions</div>
            </div>
            <div style="flex: 1; background: #fff3e0; border: 1px solid #ffb74d; border-radius: 8px; padding: 10px; text-align: center;">
                <div style="font-size: 18px; font-weight: bold; color: #f57c00;">${items.filter(i => i.code === 'BREAK' || i.code === 'LUNCH').length}</div>
                <div style="font-size: 11px; color: #666;">Breaks</div>
            </div>
        </div>
    `;
    
    // Classes list
    if (items.length === 0) {
        html += `
            <div style="text-align: center; padding: 30px; background: #f8f9fa; border-radius: 8px; border: 2px dashed #dee2e6;">
                <div style="font-size: 48px; margin-bottom: 10px;">📅</div>
                <h4 style="color: #6c757d; margin: 0;">No Classes Scheduled</h4>
                <p style="color: #6c757d; margin: 5px 0 0;">Enjoy your free day!</p>
            </div>
        `;
    } else {
        html += `<div style="margin-bottom: 10px;">`;
        items.forEach((item, index) => {
            const isCurrent = isNowWithin(item.time);
            const isPast = isPastTime(item.time);
            const isBreak = item.code === 'BREAK' || item.code === 'LUNCH';
            const isLab = /LAB/i.test(item.subject || '') || item.code === 'LAB';
            
            let bgColor = '#fff';
            let borderColor = '#eee';
            let statusBadge = '';
            let statusColor = '#666';
            
            if (isCurrent) {
                bgColor = '#e8f5e9';
                borderColor = '#4caf50';
                statusBadge = '🟢 CURRENT';
                statusColor = '#2e7d32';
            } else if (isPast) {
                bgColor = '#f5f5f5';
                borderColor = '#ccc';
                statusBadge = '✅ COMPLETED';
                statusColor = '#666';
            } else {
                statusBadge = '⏰ UPCOMING';
                statusColor = '#1976d2';
            }
            
            if (isBreak) {
                bgColor = isCurrent ? '#fff3e0' : (isPast ? '#f5f5f5' : '#fffbf0');
                borderColor = '#ffb74d';
            }
            
            // Get enhanced class data
            const classNotes = getClassNotes(item.code, today);
            const attendanceCount = getClassAttendanceCount(item.code);
            const isMarkedComplete = isClassMarkedComplete(item.code, today);
            const classStatus = getClassStatus(item.code, today);
            const isSessionActive = isClassSessionActive(item.code, today);
            const cancellationInfo = getClassCancellationInfo(item.code, today);
            
            html += `
                <div style="border: 1px solid ${borderColor}; border-radius: 8px; background: ${bgColor}; margin-bottom: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
                    <!-- Main class info -->
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 40px; height: 40px; background: ${isBreak ? '#ff9800' : (isLab ? '#4caf50' : '#2196f3')}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">
                                ${isBreak ? '☕' : (isLab ? '🧪' : '📖')}
                            </div>
                            <div>
                                <div style="font-weight: 600; color: #333; font-size: 16px; display: flex; align-items: center; gap: 8px;">
                                    ${item.subject || 'Free Period'}
                                    ${classStatus === 'taught' ? '<span style="color: #4caf50;">✅</span>' : ''}
                                    ${classStatus === 'cancelled' ? '<span style="color: #f44336;">❌</span>' : ''}
                                    ${isSessionActive ? '<span style="color: #ff9800;">🎯</span>' : ''}
                                </div>
                                <div style="font-size: 12px; color: #666;">
                                    ${item.time} ${item.room ? `• Room: ${item.room}` : ''}
                                    ${item.code ? `• Code: ${item.code}` : ''}
                                    ${attendanceCount > 0 ? `• ${attendanceCount} students attended` : ''}
                                    ${classStatus === 'cancelled' && cancellationInfo ? `• Cancelled: ${cancellationInfo.reason}` : ''}
                                </div>
                                ${classNotes ? `<div style="font-size: 11px; color: #888; background: #f8f9fa; padding: 4px 8px; border-radius: 4px; margin-top: 4px;">📝 ${classNotes}</div>` : ''}
                                ${isSessionActive ? `<div style="font-size: 11px; color: #ff9800; background: #fff3e0; padding: 4px 8px; border-radius: 4px; margin-top: 4px;">🎯 Teaching session in progress</div>` : ''}
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="margin-bottom: 4px;">
                                <span style="display: inline-block; padding: 2px 6px; border-radius: 12px; font-size: 10px; font-weight: bold; color: ${statusColor}; background: ${isCurrent ? '#d4edda' : (isPast ? '#f8f9fa' : '#e3f2fd')};">
                                    ${statusBadge}
                                </span>
                            </div>
                            ${isCurrent ? `<div style="font-size: 11px; color: #666;">${getTimeLeft(item.time)} left</div>` : ''}
                            ${!isCurrent && !isPast ? `<div style="font-size: 11px; color: #666;">${getTimeUntil(item.time)}</div>` : ''}
                        </div>
                    </div>
                    
                    <!-- Action buttons for non-break periods -->
                    ${!isBreak && item.subject ? `
                        <div style="border-top: 1px solid #eee; padding: 8px 15px; background: #f8f9fa; display: flex; gap: 8px; flex-wrap: wrap;">
                            ${isCurrent || isPast ? `
                                <button onclick="toggleTeacherClassStatus('${item.code}', '${today}')" style="padding: 4px 8px; background: ${isMarkedComplete ? '#4caf50' : '#2196f3'}; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                    ${isMarkedComplete ? '✅ Taught' : '📚 Mark as Taught'}
                                </button>
                                <button onclick="viewClassAttendance('${item.code}')" style="padding: 4px 8px; background: #ff9800; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                    👥 Attendance (${attendanceCount})
                                </button>
                                <button onclick="syncToClassAttendance('${item.code}')" style="padding: 4px 8px; background: #673ab7; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                    🔗 View in Attendance
                                </button>
                                <button onclick="markClassCancelled('${item.code}', '${today}')" style="padding: 4px 8px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                    ❌ Mark Cancelled
                                </button>
                            ` : ''}
                            <button onclick="addClassNote('${item.code}', '${today}')" style="padding: 4px 8px; background: #9c27b0; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                📝 ${classNotes ? 'Edit Note' : 'Add Note'}
                            </button>
                            <button onclick="showClassDetails('${item.code}', '${today}')" style="padding: 4px 8px; background: #17a2b8; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                ℹ️ Details
                            </button>
                            <button onclick="editClassDetails('${item.code}', '${today}')" style="padding: 4px 8px; background: #607d8b; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                ⚙️ Edit
                            </button>
                            ${isCurrent && !isSessionActive ? `
                                <button onclick="startClassSession('${item.code}', '${today}')" style="padding: 4px 8px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                    🎯 Start Session
                                </button>
                            ` : ''}
                            ${isSessionActive ? `
                                <button onclick="endClassSession('${item.code}', '${today}')" style="padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                    🏁 End Session
                                </button>
                            ` : ''}
                            ${isCurrent || isSessionActive ? `
                                <button onclick="generateQuickQR('${item.code}')" style="padding: 4px 8px; background: #e91e63; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                    📱 Quick QR
                                </button>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
        });
        html += `</div>`;
        
        // Action buttons
        html += `
            <div style="display: flex; gap: 8px; justify-content: center; margin-top: 15px; flex-wrap: wrap;">
                <button onclick="refreshTeacherSchedule()" style="padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
                    🔄 Refresh
                </button>
                <button onclick="addNewClass()" style="padding: 8px 16px; background: #4caf50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
                    ➕ Add Class
                </button>
                <button onclick="exportTeacherSchedule()" style="padding: 8px 16px; background: #ff9800; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
                    📄 Export
                </button>
                <button onclick="setClassReminder()" style="padding: 8px 16px; background: #9c27b0; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
                    🔔 Set Reminder
                </button>
                <button onclick="viewDayStats()" style="padding: 8px 16px; background: #607d8b; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
                    📊 Day Stats
                </button>
                <button onclick="openAdvancedDataManager()" style="padding: 8px 16px; background: #673ab7; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
                    🗄️ Data Manager
                </button>
            </div>
        `;
    }
    
    scheduleDiv.innerHTML = html;
}

// Helper function to get next class
function getNextClass(items) {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    
    for (let item of items) {
        const [start] = item.time.split('-').map(s => s.trim());
        const [sh, sm] = start.split(':').map(Number);
        const startMin = sh * 60 + sm;
        
        if (startMin > nowMin && item.subject) {
            return item;
        }
    }
    return null;
}

// Helper function to check if time is past
function isPastTime(timeRange) {
    const [start, end] = timeRange.split('-').map(s => s.trim());
    const [eh, em] = end.split(':').map(Number);
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const endMin = eh * 60 + em;
    return nowMin > endMin;
}

// Helper function to get time left in current class
function getTimeLeft(timeRange) {
    const [start, end] = timeRange.split('-').map(s => s.trim());
    const [eh, em] = end.split(':').map(Number);
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const endMin = eh * 60 + em;
    const diffMin = endMin - nowMin;
    
    if (diffMin <= 0) return 'Ending now';
    if (diffMin < 60) return `${diffMin}m`;
    const hours = Math.floor(diffMin / 60);
    const mins = diffMin % 60;
    return `${hours}h ${mins}m`;
}

// Helper function to get time until next class
function getTimeUntil(timeRange) {
    const [start] = timeRange.split('-').map(s => s.trim());
    const [sh, sm] = start.split(':').map(Number);
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const startMin = sh * 60 + sm;
    const diffMin = startMin - nowMin;
    
    if (diffMin <= 0) return 'Starting now';
    if (diffMin < 60) return `${diffMin}m`;
    const hours = Math.floor(diffMin / 60);
    const mins = diffMin % 60;
    return `${hours}h ${mins}m`;
}

// Action functions for teacher schedule
function refreshTeacherSchedule() {
    displayTeacherSchedule();
    showProductivityNotification('Schedule refreshed!');
}

function exportTeacherSchedule() {
    const today = getTodayDayName();
    const items = (scheduleData.teacher[today] || []);
    const csv = [['Time', 'Subject', 'Room', 'Code', 'Type']];
    
    items.forEach(item => {
        const type = item.code === 'BREAK' || item.code === 'LUNCH' ? 'Break' : 
                    (/LAB/i.test(item.subject || '') || item.code === 'LAB' ? 'Lab' : 'Lecture');
        csv.push([item.time, item.subject || '', item.room || '', item.code || '', type]);
    });
    
    const csvContent = csv.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `teacher_schedule_${today}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showProductivityNotification('Schedule exported!');
}

function setClassReminder() {
    const nextClass = getNextClass(scheduleData.teacher[getTodayDayName()] || []);
    if (nextClass) {
        const timeUntil = getTimeUntil(nextClass.time);
        if (confirm(`Set reminder for ${nextClass.subject} in ${timeUntil}?`)) {
            // In a real app, this would set a browser notification
            showProductivityNotification(`Reminder set for ${nextClass.subject}!`);
        }
    } else {
        alert('No upcoming classes to set reminders for.');
    }
}

// Realistic class management functions
function getClassNotes(classCode, date) {
    const notes = JSON.parse(localStorage.getItem('classNotes') || '{}');
    return notes[`${classCode}_${date}`] || '';
}

function saveClassNote(classCode, date, note) {
    const notes = JSON.parse(localStorage.getItem('classNotes') || '{}');
    notes[`${classCode}_${date}`] = note;
    localStorage.setItem('classNotes', JSON.stringify(notes));
}

function getClassAttendanceCount(classCode) {
    const today = new Date().toDateString();
    const scannedStore = JSON.parse(localStorage.getItem('scannedAttendance') || '{}');
    const todayRecords = scannedStore[today] || {};
    const classRecords = todayRecords[classCode] || [];
    return classRecords.length;
}

function isClassMarkedComplete(classCode, date) {
    const completed = JSON.parse(localStorage.getItem('completedClasses') || '{}');
    return completed[`${classCode}_${date}`] || false;
}

function markClassComplete(classCode, date) {
    const completed = JSON.parse(localStorage.getItem('completedClasses') || '{}');
    const key = `${classCode}_${date}`;
    completed[key] = !completed[key]; // Toggle completion
    localStorage.setItem('completedClasses', JSON.stringify(completed));
    
    displayTeacherSchedule(); // Refresh display
    showProductivityNotification(completed[key] ? 'Class marked as completed!' : 'Class unmarked');
}

function addClassNote(classCode, date) {
    const currentNote = getClassNotes(classCode, date);
    const newNote = prompt('Add/Edit class note:', currentNote);
    
    if (newNote !== null) {
        saveClassNote(classCode, date, newNote.trim());
        displayTeacherSchedule(); // Refresh display
        showProductivityNotification(newNote.trim() ? 'Note saved!' : 'Note removed');
    }
}

function editClassDetails(classCode, date) {
    const today = getTodayDayName();
    const items = scheduleData.teacher[today] || [];
    const classItem = items.find(item => item.code === classCode);
    
    if (!classItem) {
        alert('Class not found');
        return;
    }
    
    const newSubject = prompt('Edit subject name:', classItem.subject);
    const newRoom = prompt('Edit room:', classItem.room);
    
    if (newSubject !== null && newRoom !== null) {
        // Update the schedule data
        classItem.subject = newSubject.trim();
        classItem.room = newRoom.trim();
        
        // Save to localStorage for persistence
        const customSchedule = JSON.parse(localStorage.getItem('customScheduleChanges') || '{}');
        if (!customSchedule[today]) customSchedule[today] = {};
        customSchedule[today][classCode] = {
            subject: newSubject.trim(),
            room: newRoom.trim()
        };
        localStorage.setItem('customScheduleChanges', JSON.stringify(customSchedule));
        
        displayTeacherSchedule(); // Refresh display
        showProductivityNotification('Class details updated!');
    }
}

function viewClassAttendance(classCode) {
    const today = new Date().toDateString();
    const scannedStore = JSON.parse(localStorage.getItem('scannedAttendance') || '{}');
    const todayRecords = scannedStore[today] || {};
    const classRecords = todayRecords[classCode] || [];
    
    if (classRecords.length === 0) {
        alert(`No students have scanned attendance for ${classCode} yet.`);
        return;
    }
    
    let message = `Attendance for ${classCode} (${classRecords.length} students):\n\n`;
    classRecords.forEach((record, index) => {
        message += `${index + 1}. ${record.name} (${record.studentId}) - ${record.time}\n`;
    });
    
    alert(message);
}

function generateQuickQR(classCode) {
    // Set the class in the dropdown and generate QR
    const classSelect = document.getElementById('classSelect');
    if (classSelect) {
        classSelect.value = classCode;
        generateQR(); // Use existing QR generation function
        showProductivityNotification(`Quick QR generated for ${classCode}!`);
        
        // Scroll to QR section
        const qrDisplay = document.getElementById('qrDisplay');
        if (qrDisplay) {
            qrDisplay.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Load custom schedule changes on startup
function loadCustomScheduleChanges() {
    const customChanges = JSON.parse(localStorage.getItem('customScheduleChanges') || '{}');
    const today = getTodayDayName();
    
    if (customChanges[today]) {
        const todayChanges = customChanges[today];
        const items = scheduleData.teacher[today] || [];
        
        items.forEach(item => {
            if (todayChanges[item.code]) {
                item.subject = todayChanges[item.code].subject;
                item.room = todayChanges[item.code].room;
            }
        });
    }
}

// Enhanced action functions
function addNewClass() {
    const today = getTodayDayName();
    const time = prompt('Enter class time (e.g., "14:00 - 15:00"):');
    const subject = prompt('Enter subject name:');
    const room = prompt('Enter room:');
    const code = prompt('Enter class code:');
    
    if (time && subject && room && code) {
        const newClass = {
            time: time.trim(),
            subject: subject.trim(),
            room: room.trim(),
            code: code.trim()
        };
        
        // Add to current schedule
        if (!scheduleData.teacher[today]) scheduleData.teacher[today] = [];
        scheduleData.teacher[today].push(newClass);
        
        // Sort by time
        scheduleData.teacher[today].sort((a, b) => {
            const aTime = a.time.split('-')[0].trim();
            const bTime = b.time.split('-')[0].trim();
            return aTime.localeCompare(bTime);
        });
        
        // Save to localStorage
        const customSchedule = JSON.parse(localStorage.getItem('customScheduleChanges') || '{}');
        if (!customSchedule[today]) customSchedule[today] = {};
        customSchedule[today][code] = newClass;
        localStorage.setItem('customScheduleChanges', JSON.stringify(customSchedule));
        
        displayTeacherSchedule();
        showProductivityNotification('New class added!');
    }
}

// Enhanced Recommended Schedule Functions
function getRecScheduleNotes(classCode, date) {
    const notes = JSON.parse(localStorage.getItem('recScheduleNotes') || '{}');
    return notes[`${classCode}_${date}`] || '';
}

function saveRecScheduleNote(classCode, date, note) {
    const notes = JSON.parse(localStorage.getItem('recScheduleNotes') || '{}');
    notes[`${classCode}_${date}`] = note;
    localStorage.setItem('recScheduleNotes', JSON.stringify(notes));
}

function isClassBookmarked(classCode, date) {
    const bookmarks = JSON.parse(localStorage.getItem('classBookmarks') || '{}');
    return bookmarks[`${classCode}_${date}`] || false;
}

function toggleRecClassComplete(classCode, date) {
    const completed = JSON.parse(localStorage.getItem('completedClasses') || '{}');
    const key = `${classCode}_${date}`;
    completed[key] = !completed[key];
    localStorage.setItem('completedClasses', JSON.stringify(completed));
    
    displayTeacherRecommendedSchedule(); // Refresh display
    showProductivityNotification(completed[key] ? 'Class marked as completed!' : 'Class unmarked');
}

function toggleRecBookmark(classCode, date) {
    const bookmarks = JSON.parse(localStorage.getItem('classBookmarks') || '{}');
    const key = `${classCode}_${date}`;
    bookmarks[key] = !bookmarks[key];
    localStorage.setItem('classBookmarks', JSON.stringify(bookmarks));
    
    displayTeacherRecommendedSchedule(); // Refresh display
    showProductivityNotification(bookmarks[key] ? 'Class starred!' : 'Star removed');
}

function addRecScheduleNote(classCode, date) {
    const currentNote = getRecScheduleNotes(classCode, date);
    const newNote = prompt('Add/Edit class note:', currentNote);
    
    if (newNote !== null) {
        saveRecScheduleNote(classCode, date, newNote.trim());
        displayTeacherRecommendedSchedule(); // Refresh display
        showProductivityNotification(newNote.trim() ? 'Note saved!' : 'Note removed');
    }
}

function editRecClassDetails(classCode, date) {
    const items = scheduleData.teacher[date] || [];
    const classItem = items.find(item => item.code === classCode);
    
    if (!classItem) {
        alert('Class not found');
        return;
    }
    
    const newSubject = prompt('Edit subject name:', classItem.subject);
    const newRoom = prompt('Edit room:', classItem.room);
    const newTime = prompt('Edit time:', classItem.time);
    
    if (newSubject !== null && newRoom !== null && newTime !== null) {
        // Update the schedule data
        classItem.subject = newSubject.trim();
        classItem.room = newRoom.trim();
        classItem.time = newTime.trim();
        
        // Save to localStorage for persistence
        const customSchedule = JSON.parse(localStorage.getItem('customScheduleChanges') || '{}');
        if (!customSchedule[date]) customSchedule[date] = {};
        customSchedule[date][classCode] = {
            subject: newSubject.trim(),
            room: newRoom.trim(),
            time: newTime.trim()
        };
        localStorage.setItem('customScheduleChanges', JSON.stringify(customSchedule));
        
        displayTeacherRecommendedSchedule(); // Refresh display
        showProductivityNotification('Class details updated!');
    }
}

function viewRecClassAttendance(classCode) {
    const today = new Date().toDateString();
    const scannedStore = JSON.parse(localStorage.getItem('scannedAttendance') || '{}');
    const todayRecords = scannedStore[today] || {};
    const classRecords = todayRecords[classCode] || [];
    
    if (classRecords.length === 0) {
        alert(`No students have scanned attendance for ${classCode} yet.`);
        return;
    }
    
    let message = `📊 Attendance Report for ${classCode}\n`;
    message += `Date: ${new Date().toLocaleDateString()}\n`;
    message += `Total Students: ${classRecords.length}\n\n`;
    
    classRecords.forEach((record, index) => {
        message += `${index + 1}. ${record.name}\n`;
        message += `   ID: ${record.studentId}\n`;
        message += `   Time: ${record.time}\n\n`;
    });
    
    alert(message);
}

function duplicateRecClass(classCode, date) {
    const items = scheduleData.teacher[date] || [];
    const classItem = items.find(item => item.code === classCode);
    
    if (!classItem) {
        alert('Class not found');
        return;
    }
    
    const targetDay = prompt('Which day to duplicate to?', 'Monday');
    const newTime = prompt('Enter new time:', classItem.time);
    const newCode = prompt('Enter new class code:', classItem.code + '_copy');
    
    if (targetDay && newTime && newCode) {
        const duplicatedClass = {
            time: newTime.trim(),
            subject: classItem.subject,
            room: classItem.room,
            code: newCode.trim()
        };
        
        // Add to target day
        if (!scheduleData.teacher[targetDay]) scheduleData.teacher[targetDay] = [];
        scheduleData.teacher[targetDay].push(duplicatedClass);
        
        // Sort by time
        scheduleData.teacher[targetDay].sort((a, b) => {
            const aTime = a.time.split('-')[0].trim();
            const bTime = b.time.split('-')[0].trim();
            return aTime.localeCompare(bTime);
        });
        
        // Save to localStorage
        const customSchedule = JSON.parse(localStorage.getItem('customScheduleChanges') || '{}');
        if (!customSchedule[targetDay]) customSchedule[targetDay] = {};
        customSchedule[targetDay][newCode] = duplicatedClass;
        localStorage.setItem('customScheduleChanges', JSON.stringify(customSchedule));
        
        displayTeacherRecommendedSchedule(); // Refresh display
        showProductivityNotification(`Class duplicated to ${targetDay}!`);
    }
}

function deleteRecClass(classCode, date, index) {
    if (confirm(`Are you sure you want to delete this class (${classCode})?`)) {
        // Remove from schedule data
        if (scheduleData.teacher[date]) {
            scheduleData.teacher[date].splice(index, 1);
        }
        
        // Remove from localStorage
        const customSchedule = JSON.parse(localStorage.getItem('customScheduleChanges') || '{}');
        if (customSchedule[date] && customSchedule[date][classCode]) {
            delete customSchedule[date][classCode];
            localStorage.setItem('customScheduleChanges', JSON.stringify(customSchedule));
        }
        
        displayTeacherRecommendedSchedule(); // Refresh display
        showProductivityNotification('Class deleted!');
    }
}

function addRecommendedClass(selectedDay) {
    // Create enhanced add class modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.8); z-index: 10000; display: flex; 
        align-items: center; justify-content: center;
    `;
    
    // Get available subjects and time slots
    const availableSubjects = getAvailableSubjects();
    const timeSlots = getStandardTimeSlots();
    const availableRooms = getAvailableRooms();
    
    let subjectOptions = '<option value="">Select Subject</option>';
    availableSubjects.forEach(subject => {
        subjectOptions += `<option value="${subject}">${subject}</option>`;
    });
    
    let timeOptions = '<option value="">Select Time Slot</option>';
    timeSlots.forEach(slot => {
        timeOptions += `<option value="${slot}">${slot}</option>`;
    });
    
    let roomOptions = '<option value="">Select Room</option>';
    availableRooms.forEach(room => {
        roomOptions += `<option value="${room}">${room}</option>`;
    });
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 20px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #333;">➕ Add New Class</h2>
                <button onclick="this.closest('div').parentElement.remove()" style="background: #f44336; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">×</button>
            </div>
            
            <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin-bottom: 15px;">
                <strong>Adding to: ${selectedDay}</strong>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Subject:</label>
                <select id="newClassSubject" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" onchange="updateClassCodeSuggestions()">
                    ${subjectOptions}
                </select>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Time Slot:</label>
                <select id="newClassTime" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    ${timeOptions}
                </select>
                <small style="color: #666;">Or enter custom time below</small>
                <input type="text" id="customTimeInput" placeholder="e.g., 14:00 - 15:00" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px; margin-top: 5px;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Room:</label>
                <select id="newClassRoom" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    ${roomOptions}
                </select>
                <small style="color: #666;">Or enter custom room below</small>
                <input type="text" id="customRoomInput" placeholder="e.g., LH-305" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px; margin-top: 5px;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Class Code:</label>
                <input type="text" id="newClassCode" placeholder="e.g., CN, TOC, FM" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                <div id="codeSuggestions" style="margin-top: 5px; font-size: 12px; color: #666;"></div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Class Type:</label>
                <select id="newClassType" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="lecture">Lecture</option>
                    <option value="lab">Laboratory</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="seminar">Seminar</option>
                </select>
            </div>
            
            <div style="background: #e3f2fd; padding: 12px; border-radius: 6px; margin-bottom: 15px;">
                <h4 style="margin: 0 0 8px; color: #1976d2;">📋 Preview</h4>
                <div id="classPreview" style="font-size: 14px; color: #333;">
                    Select subject and time to see preview
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: end;">
                <button onclick="this.closest('div').parentElement.remove()" style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
                <button onclick="saveNewRecommendedClass('${selectedDay}', this)" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Add Class</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Set up real-time preview
    setupClassPreview();
}

// Get available subjects from existing schedule
function getAvailableSubjects() {
    const subjects = new Set();
    Object.values(scheduleData.teacher).forEach(daySchedule => {
        daySchedule.forEach(item => {
            if (item.subject && item.subject.trim() && 
                item.code !== 'BREAK' && item.code !== 'LUNCH') {
                subjects.add(item.subject.trim());
            }
        });
    });
    
    // Add common subjects that might not be in schedule
    const commonSubjects = [
        'Computer Networks', 'Theory of Computation', 'Financial Management',
        'Research Methodology & IPR', 'MR&MM', 'Data Structures', 'Algorithms',
        'Database Management', 'Software Engineering', 'Operating Systems',
        'Computer Graphics', 'Artificial Intelligence', 'Machine Learning'
    ];
    
    commonSubjects.forEach(subject => subjects.add(subject));
    return Array.from(subjects).sort();
}

// Get standard time slots
function getStandardTimeSlots() {
    return [
        '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
        '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
        '16:00 - 17:00', '17:00 - 18:00', '10:00 - 12:00', '14:00 - 16:00',
        '10:00 - 11:50', '12:10 - 14:00', '14:10 - 16:00'
    ];
}

// Get available rooms
function getAvailableRooms() {
    const rooms = new Set();
    Object.values(scheduleData.teacher).forEach(daySchedule => {
        daySchedule.forEach(item => {
            if (item.room && item.room.trim()) {
                rooms.add(item.room.trim());
            }
        });
    });
    
    // Add common rooms
    const commonRooms = [
        'LH-301', 'LH-302', 'LH-303', 'LH-304', 'LH-305',
        'Lab-A', 'Lab-B', 'Lab-C', 'Computer Lab', 'Project Lab',
        'Library', 'Seminar Hall', 'Conference Room'
    ];
    
    commonRooms.forEach(room => rooms.add(room));
    return Array.from(rooms).sort();
}

// Update class code suggestions based on selected subject
function updateClassCodeSuggestions() {
    const subjectSelect = document.getElementById('newClassSubject');
    const codeSuggestions = document.getElementById('codeSuggestions');
    const codeInput = document.getElementById('newClassCode');
    
    if (!subjectSelect || !codeSuggestions || !codeInput) return;
    
    const selectedSubject = subjectSelect.value;
    
    // Subject to code mapping
    const subjectCodes = {
        'Computer Networks': 'CN',
        'Theory of Computation': 'TOC',
        'Financial Management': 'FM',
        'Research Methodology & IPR': 'RMIPR',
        'MR&MM': 'MRMM',
        'Data Structures': 'DS',
        'Algorithms': 'ALGO',
        'Database Management': 'DBMS',
        'Software Engineering': 'SE',
        'Operating Systems': 'OS',
        'Computer Graphics': 'CG',
        'Artificial Intelligence': 'AI',
        'Machine Learning': 'ML'
    };
    
    if (selectedSubject && subjectCodes[selectedSubject]) {
        const suggestedCode = subjectCodes[selectedSubject];
        codeSuggestions.innerHTML = `💡 Suggested code: <strong>${suggestedCode}</strong>`;
        codeInput.value = suggestedCode;
    } else {
        codeSuggestions.innerHTML = '';
    }
    
    updateClassPreview();
}

// Setup real-time class preview
function setupClassPreview() {
    const inputs = ['newClassSubject', 'newClassTime', 'customTimeInput', 'newClassRoom', 'customRoomInput', 'newClassCode', 'newClassType'];
    
    inputs.forEach(inputId => {
        const element = document.getElementById(inputId);
        if (element) {
            element.addEventListener('input', updateClassPreview);
            element.addEventListener('change', updateClassPreview);
        }
    });
    
    updateClassPreview();
}

// Update class preview
function updateClassPreview() {
    const preview = document.getElementById('classPreview');
    if (!preview) return;
    
    const subject = document.getElementById('newClassSubject')?.value || '';
    const timeSlot = document.getElementById('newClassTime')?.value || '';
    const customTime = document.getElementById('customTimeInput')?.value || '';
    const room = document.getElementById('newClassRoom')?.value || '';
    const customRoom = document.getElementById('customRoomInput')?.value || '';
    const code = document.getElementById('newClassCode')?.value || '';
    const type = document.getElementById('newClassType')?.value || 'lecture';
    
    const finalTime = customTime || timeSlot;
    const finalRoom = customRoom || room;
    
    if (!subject || !finalTime) {
        preview.innerHTML = 'Select subject and time to see preview';
        return;
    }
    
    const typeIcon = type === 'lab' ? '🧪' : type === 'tutorial' ? '📝' : type === 'seminar' ? '🎤' : '📖';
    
    preview.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">${typeIcon}</span>
            <div>
                <div style="font-weight: 600;">${subject}</div>
                <div style="font-size: 12px; color: #666;">
                    ${finalTime} • ${finalRoom || 'No room'} • ${code || 'No code'} • ${type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
            </div>
        </div>
    `;
}

// Save new recommended class
function saveNewRecommendedClass(selectedDay, button) {
    const modal = button.closest('div').parentElement;
    
    const subject = document.getElementById('newClassSubject').value.trim();
    const timeSlot = document.getElementById('newClassTime').value.trim();
    const customTime = document.getElementById('customTimeInput').value.trim();
    const room = document.getElementById('newClassRoom').value.trim();
    const customRoom = document.getElementById('customRoomInput').value.trim();
    const code = document.getElementById('newClassCode').value.trim();
    const type = document.getElementById('newClassType').value;
    
    const finalTime = customTime || timeSlot;
    const finalRoom = customRoom || room;
    
    if (!subject) {
        alert('Please select a subject');
        return;
    }
    
    if (!finalTime) {
        alert('Please select or enter a time slot');
        return;
    }
    
    if (!code) {
        alert('Please enter a class code');
        return;
    }
    
    // Check for conflicts
    const existingClasses = scheduleData.teacher[selectedDay] || [];
    const conflict = existingClasses.find(item => 
        item.time === finalTime || item.code === code
    );
    
    if (conflict) {
        if (!confirm(`Conflict detected with existing class. Continue anyway?`)) {
            return;
        }
    }
    
    const newClass = {
        time: finalTime,
        subject: subject,
        room: finalRoom || 'TBD',
        code: code
    };
    
    // Add to selected day
    if (!scheduleData.teacher[selectedDay]) scheduleData.teacher[selectedDay] = [];
    scheduleData.teacher[selectedDay].push(newClass);
    
    // Sort by time
    scheduleData.teacher[selectedDay].sort((a, b) => {
        const aTime = a.time.split('-')[0].trim();
        const bTime = b.time.split('-')[0].trim();
        return aTime.localeCompare(bTime);
    });
    
    // Save to localStorage
    const customSchedule = JSON.parse(localStorage.getItem('customScheduleChanges') || '{}');
    if (!customSchedule[selectedDay]) customSchedule[selectedDay] = {};
    customSchedule[selectedDay][code] = newClass;
    localStorage.setItem('customScheduleChanges', JSON.stringify(customSchedule));
    
    modal.remove();
    displayTeacherRecommendedSchedule(); // Refresh display
    populateTeacherSubjectPicker(); // Update subject picker
    showProductivityNotification(`✅ ${subject} (${code}) added to ${selectedDay}!`);
}

// Enhanced CSV export for recommended schedule
function exportTeacherRecCsv() {
    const dayPicker = document.getElementById('teacherDayPicker');
    const selectedDay = (dayPicker && dayPicker.value && dayPicker.value !== 'TODAY') ? dayPicker.value : getTodayDayName();
    const items = (scheduleData.teacher[selectedDay] || []);
    
    if (items.length === 0) {
        showProductivityNotification(' No classes to export for ' + selectedDay);
        return;
    }
    
    // Enhanced CSV headers
    const csv = [
        ['Time', 'Subject', 'Room', 'Code', 'Type', 'Status', 'Priority', 'Notes', 'Attendance', 'Teacher', 'Day', 'Academic Year', 'Semester']
    ];
    
    items.forEach(item => {
        const type = item.code === 'BREAK' || item.code === 'LUNCH' ? 'Break' : 
                    (/LAB/i.test(item.subject || '') || item.code === 'LAB' ? 'Lab' : 'Lecture');
        const isCompleted = isClassMarkedComplete(item.code, selectedDay);
        const isBookmarked = isClassBookmarked(item.code, selectedDay);
        const priority = getRecClassPriority(item.code, selectedDay);
        const notes = getRecScheduleNotes(item.code, selectedDay);
        const attendance = selectedDay === getTodayDayName() ? getClassAttendanceCount(item.code) : 0;
        
        let status = '';
        if (isCompleted) status += 'Taught ';
        if (isBookmarked) status += 'Starred ';
        
        csv.push([
            item.time, 
            item.subject || '', 
            item.room || '', 
            item.code || '', 
            type,
            status.trim() || 'Pending',
            priority,
            notes || '',
            attendance.toString(),
            currentUser.name || 'Teacher',
            selectedDay,
            getCurrentAcademicYear(),
            getCurrentSemester()
        ]);
    });
    
    // Add summary row
    const totalClasses = items.filter(item => item.subject && item.code !== 'BREAK' && item.code !== 'LUNCH').length;
    const completedClasses = items.filter(item => isClassMarkedComplete(item.code, selectedDay)).length;
    const starredClasses = items.filter(item => isClassBookmarked(item.code, selectedDay)).length;
    const highPriorityClasses = items.filter(item => ['High', 'Critical'].includes(getRecClassPriority(item.code, selectedDay))).length;
    
    csv.push([]); // Empty row
    csv.push(['SUMMARY', '', '', '', '', '', '', '', '', '', '', '', '']);
    csv.push(['Total Classes', totalClasses, '', '', '', '', '', '', '', '', '', '', '']);
    csv.push(['Taught Classes', completedClasses, '', '', '', '', '', '', '', '', '', '', '']);
    csv.push(['Starred Classes', starredClasses, '', '', '', '', '', '', '', '', '', '', '']);
    csv.push(['High Priority', highPriorityClasses, '', '', '', '', '', '', '', '', '', '', '']);
    csv.push(['Generated', new Date().toLocaleString(), '', '', '', '', '', '', '', '', '', '', '']);
    
    const csvContent = csv.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recommended_schedule_${selectedDay}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showProductivityNotification(` ${selectedDay} schedule exported! (${totalClasses} classes)`);
}

// Enhanced copy function for recommended schedule
function copyTeacherRecToClipboard() {
    const dayPicker = document.getElementById('teacherDayPicker');
    const selectedDay = (dayPicker && dayPicker.value && dayPicker.value !== 'TODAY') ? dayPicker.value : getTodayDayName();
    const items = (scheduleData.teacher[selectedDay] || []);
    
    if (items.length === 0) {
        showProductivityNotification('❌ No classes to copy for ' + selectedDay);
        return;
    }
    
    let text = `📅 RECOMMENDED SCHEDULE - ${selectedDay.toUpperCase()}\n`;
    text += `Generated: ${new Date().toLocaleString()}\n`;
    text += `Teacher: ${currentUser.name || 'Teacher'}\n`;
    text += `Academic Year: ${getCurrentAcademicYear()} | Semester: ${getCurrentSemester()}\n`;
    text += `${'='.repeat(50)}\n\n`;
    
    items.forEach((item, index) => {
        const isCompleted = isClassMarkedComplete(item.code, selectedDay);
        const isBookmarked = isClassBookmarked(item.code, selectedDay);
        const priority = getRecClassPriority(item.code, selectedDay);
        const notes = getRecScheduleNotes(item.code, selectedDay);
        const attendance = selectedDay === getTodayDayName() ? getClassAttendanceCount(item.code) : 0;
        const type = item.code === 'BREAK' || item.code === 'LUNCH' ? 'Break' : 
                    (/LAB/i.test(item.subject || '') || item.code === 'LAB' ? 'Lab' : 'Lecture');
        
        text += `${index + 1}. ${item.time} - ${item.subject || 'Free Period'}`;
        if (item.room) text += ` (${item.room})`;
        if (item.code) text += ` [${item.code}]`;
        text += `\n   Type: ${type}`;
        if (priority !== 'Medium') text += ` | Priority: ${priority}`;
        if (isCompleted) text += ' | ✅ Taught';
        if (isBookmarked) text += ' | ⭐ Starred';
        if (attendance > 0) text += ` | 👥 ${attendance} attended`;
        text += '\n';
        if (notes) text += `   📝 ${notes}\n`;
        text += '\n';
    });
    
    // Add summary
    const totalClasses = items.filter(item => item.subject && item.code !== 'BREAK' && item.code !== 'LUNCH').length;
    const completedClasses = items.filter(item => isClassMarkedComplete(item.code, selectedDay)).length;
    const starredClasses = items.filter(item => isClassBookmarked(item.code, selectedDay)).length;
    const highPriorityClasses = items.filter(item => ['High', 'Critical'].includes(getRecClassPriority(item.code, selectedDay))).length;
    
    text += `${'='.repeat(50)}\n`;
    text += `SUMMARY:\n`;
    text += `📊 Total Classes: ${totalClasses}\n`;
    text += `✅ Taught: ${completedClasses}/${totalClasses} (${totalClasses > 0 ? Math.round((completedClasses/totalClasses)*100) : 0}%)\n`;
    text += `⭐ Starred: ${starredClasses}\n`;
    text += `🔥 High Priority: ${highPriorityClasses}\n`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showProductivityNotification('📋 Schedule copied to clipboard!');
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showProductivityNotification('📋 Schedule copied to clipboard!');
        } else {
            showProductivityNotification('❌ Failed to copy to clipboard');
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showProductivityNotification('❌ Copy not supported in this browser');
    }
    
    document.body.removeChild(textArea);
}

// Enhanced print function for recommended schedule
function printTeacherRecSchedule() {
    const dayPicker = document.getElementById('teacherDayPicker');
    const selectedDay = (dayPicker && dayPicker.value && dayPicker.value !== 'TODAY') ? dayPicker.value : getTodayDayName();
    const items = (scheduleData.teacher[selectedDay] || []);
    
    if (items.length === 0) {
        showProductivityNotification('❌ No classes to print for ' + selectedDay);
        return;
    }
    
    // Create print content
    let printContent = `
        <html>
        <head>
            <title>Recommended Schedule - ${selectedDay}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
                .header h1 { margin: 0; color: #2196f3; }
                .header p { margin: 5px 0; color: #666; }
                .class-item { border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 10px; background: #f9f9f9; }
                .class-header { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 8px; }
                .class-details { font-size: 14px; color: #666; margin-bottom: 5px; }
                .class-meta { font-size: 12px; color: #888; }
                .class-notes { background: #e3f2fd; padding: 8px; border-radius: 4px; margin-top: 8px; font-style: italic; }
                .summary { border-top: 2px solid #333; padding-top: 15px; margin-top: 20px; }
                .summary h3 { margin: 0 0 10px; color: #2196f3; }
                .summary-item { margin: 5px 0; }
                .break-item { background: #fff3e0 !important; }
                .lab-item { background: #e8f5e9 !important; }
                .status-badges { margin-top: 5px; }
                .badge { display: inline-block; padding: 2px 6px; border-radius: 10px; font-size: 10px; margin-right: 5px; }
                .badge-taught { background: #d4edda; color: #155724; }
                .badge-starred { background: #fff3cd; color: #856404; }
                .badge-priority { background: #f8d7da; color: #721c24; }
                @media print {
                    body { margin: 15px; }
                    .class-item { break-inside: avoid; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>📅 Recommended Schedule</h1>
                <p><strong>${selectedDay}</strong></p>
                <p>Generated: ${new Date().toLocaleString()}</p>
                <p>Teacher: ${currentUser.name || 'Teacher'} | Academic Year: ${getCurrentAcademicYear()} | Semester: ${getCurrentSemester()}</p>
            </div>
    `;
    
    items.forEach((item, index) => {
        const isCompleted = isClassMarkedComplete(item.code, selectedDay);
        const isBookmarked = isClassBookmarked(item.code, selectedDay);
        const priority = getRecClassPriority(item.code, selectedDay);
        const notes = getRecScheduleNotes(item.code, selectedDay);
        const attendance = selectedDay === getTodayDayName() ? getClassAttendanceCount(item.code) : 0;
        const type = item.code === 'BREAK' || item.code === 'LUNCH' ? 'Break' : 
                    (/LAB/i.test(item.subject || '') || item.code === 'LAB' ? 'Lab' : 'Lecture');
        
        const itemClass = type === 'Break' ? 'break-item' : (type === 'Lab' ? 'lab-item' : '');
        
        printContent += `
            <div class="class-item ${itemClass}">
                <div class="class-header">
                    ${index + 1}. ${item.subject || 'Free Period'}
                </div>
                <div class="class-details">
                    <strong>Time:</strong> ${item.time} | 
                    <strong>Room:</strong> ${item.room || 'TBD'} | 
                    <strong>Code:</strong> ${item.code || 'N/A'} | 
                    <strong>Type:</strong> ${type}
                </div>
                <div class="status-badges">
        `;
        
        if (isCompleted) printContent += '<span class="badge badge-taught">✅ Taught</span>';
        if (isBookmarked) printContent += '<span class="badge badge-starred">⭐ Starred</span>';
        if (priority !== 'Medium') printContent += `<span class="badge badge-priority">🔥 ${priority}</span>`;
        if (attendance > 0) printContent += `<span class="badge">👥 ${attendance} attended</span>`;
        
        printContent += '</div>';
        
        if (notes) {
            printContent += `<div class="class-notes">📝 ${notes}</div>`;
        }
        
        printContent += '</div>';
    });
    
    // Add summary
    const totalClasses = items.filter(item => item.subject && item.code !== 'BREAK' && item.code !== 'LUNCH').length;
    const completedClasses = items.filter(item => isClassMarkedComplete(item.code, selectedDay)).length;
    const starredClasses = items.filter(item => isClassBookmarked(item.code, selectedDay)).length;
    const highPriorityClasses = items.filter(item => ['High', 'Critical'].includes(getRecClassPriority(item.code, selectedDay))).length;
    
    printContent += `
            <div class="summary">
                <h3>📊 Summary</h3>
                <div class="summary-item"><strong>Total Classes:</strong> ${totalClasses}</div>
                <div class="summary-item"><strong>Taught Classes:</strong> ${completedClasses}/${totalClasses} (${totalClasses > 0 ? Math.round((completedClasses/totalClasses)*100) : 0}%)</div>
                <div class="summary-item"><strong>Starred Classes:</strong> ${starredClasses}</div>
                <div class="summary-item"><strong>High Priority Classes:</strong> ${highPriorityClasses}</div>
            </div>
        </body>
        </html>
    `;
    
    // Open print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load then print
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
    
    showProductivityNotification('🖨️ Print dialog opened for ' + selectedDay + ' schedule');
}

// Cross-section linking functions
function syncToClassAttendance(classCode) {
    // Set the class in the Class Attendance dropdown
    const classSelect = document.getElementById('classSelect');
    if (classSelect) {
        classSelect.value = classCode;
        // Trigger the attendance view update
        loadClassAttendance();
        
        // Scroll to the Class Attendance section
        const attendanceSection = document.getElementById('classAttendanceView');
        if (attendanceSection) {
            attendanceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Add a highlight effect
            attendanceSection.style.border = '3px solid #673ab7';
            attendanceSection.style.borderRadius = '8px';
            setTimeout(() => {
                attendanceSection.style.border = '';
                attendanceSection.style.borderRadius = '';
            }, 3000);
        }
        
        showProductivityNotification(`Viewing attendance for ${classCode}`);
    }
}

function syncFromClassAttendance(classCode) {
    // Find the class in today's schedule and highlight it
    const today = getTodayDayName();
    const items = scheduleData.teacher[today] || [];
    const classItem = items.find(item => item.code === classCode);
    
    if (classItem) {
        // Scroll to Your Classes Today section
        const scheduleSection = document.getElementById('teacherSchedule');
        if (scheduleSection) {
            scheduleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Add a highlight effect to the entire section
            scheduleSection.style.border = '3px solid #4caf50';
            scheduleSection.style.borderRadius = '8px';
            setTimeout(() => {
                scheduleSection.style.border = '';
                scheduleSection.style.borderRadius = '';
            }, 3000);
        }
        
        showProductivityNotification(`Found ${classCode} in Your Classes Today`);
    } else {
        showProductivityNotification(`${classCode} not found in today's schedule`);
    }
}

// Enhanced Class Attendance with cross-linking
function loadClassAttendanceEnhanced() {
    const attendanceView = document.getElementById('classAttendanceView');
    if (!attendanceView) return;
    const classSelect = document.getElementById('classSelect');
    const selectedClass = classSelect ? classSelect.value : '';
    const todayDateStr = new Date().toDateString();
    const today = getTodayDayName();

    const scannedStore = JSON.parse(localStorage.getItem('scannedAttendance') || '{}');
    const todayRecords = scannedStore[todayDateStr] || {};
    const classRecords = selectedClass ? (todayRecords[selectedClass] || []) : [];

    // Check if this class exists in today's schedule
    const todaySchedule = scheduleData.teacher[today] || [];
    const scheduleClass = todaySchedule.find(item => item.code === selectedClass);
    
    // Calculate stats
    const totalScanned = classRecords.length;
    const expectedTotal = 30; // Typical class size
    const attendancePercentage = totalScanned > 0 ? Math.round((totalScanned / expectedTotal) * 100) : 0;
    const currentTime = new Date().toLocaleTimeString();

    // Build enhanced UI with cross-linking
    let html = '';
    
    // Header with stats and cross-link
    html += `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="margin: 0; font-size: 18px;">📋 Class Attendance</h4>
                    <p style="margin: 5px 0 0; opacity: 0.9;">${new Date().toLocaleDateString()} • ${currentTime}</p>
                    ${scheduleClass ? `<p style="margin: 5px 0 0; opacity: 0.8; font-size: 12px;">🔗 Linked to: ${scheduleClass.subject} (${scheduleClass.time})</p>` : ''}
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 24px; font-weight: bold;">${totalScanned}</div>
                    <div style="font-size: 12px; opacity: 0.9;">Present</div>
                    ${scheduleClass ? `<button onclick="syncFromClassAttendance('${selectedClass}')" style="margin-top: 5px; padding: 4px 8px; background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; cursor: pointer; font-size: 10px;">🔗 View in Schedule</button>` : ''}
                </div>
            </div>
        </div>
    `;

    // Class selector and stats with enhanced info
    if (!selectedClass) {
        html += `
            <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 2px dashed #dee2e6;">
                <div style="font-size: 48px; margin-bottom: 10px;">📚</div>
                <h4 style="color: #6c757d; margin: 0;">Select a Class</h4>
                <p style="color: #6c757d; margin: 5px 0 0;">Choose a class from the "Generate Attendance QR" section above to view scanned students.</p>
                <div style="margin-top: 15px;">
                    <h5 style="color: #495057; margin: 10px 0 5px;">📅 Today's Classes Available:</h5>
                    <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                        ${todaySchedule.filter(item => item.subject && item.code !== 'BREAK' && item.code !== 'LUNCH').map(item => `
                            <button onclick="selectClassFromSchedule('${item.code}')" style="padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                                ${item.code} (${item.subject})
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    } else {
        // Class info bar with schedule integration
        html += `
            <div style="background: #e3f2fd; border: 1px solid #90caf9; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="color: #1976d2;">Class: ${selectedClass}</strong>
                        ${scheduleClass ? `<span style="margin-left: 15px; color: #666;">📅 ${scheduleClass.subject} • ${scheduleClass.time} • Room: ${scheduleClass.room}</span>` : '<span style="margin-left: 15px; color: #666;">Expected: 30 students</span>'}
                        ${scheduleClass && isClassMarkedComplete(selectedClass, today) ? '<span style="margin-left: 10px; color: #4caf50;">✓ Completed</span>' : ''}
                    </div>
                    <div style="display: flex; gap: 15px; align-items: center;">
                        <div style="text-align: center;">
                            <div style="font-size: 18px; font-weight: bold; color: #4caf50;">${totalScanned}</div>
                            <div style="font-size: 11px; color: #666;">Scanned</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 18px; font-weight: bold; color: ${attendancePercentage >= 75 ? '#4caf50' : attendancePercentage >= 50 ? '#ff9800' : '#f44336'};">${attendancePercentage}%</div>
                            <div style="font-size: 11px; color: #666;">Rate</div>
                        </div>
                    </div>
                </div>
                <!-- Progress bar -->
                <div style="background: #e0e0e0; border-radius: 10px; height: 8px; margin-top: 10px; overflow: hidden;">
                    <div style="background: ${attendancePercentage >= 75 ? '#4caf50' : attendancePercentage >= 50 ? '#ff9800' : '#f44336'}; height: 100%; width: ${attendancePercentage}%; border-radius: 10px; transition: width 0.5s ease;"></div>
                </div>
            </div>
        `;

        if (classRecords.length === 0) {
            html += `
                <div style="text-align: center; padding: 30px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px;">
                    <div style="font-size: 48px; margin-bottom: 10px;">⏳</div>
                    <h4 style="color: #856404; margin: 0;">Waiting for Students</h4>
                    <p style="color: #856404; margin: 5px 0 0;">No students have scanned the QR code for this class yet.</p>
                    <p style="color: #856404; margin: 5px 0 0; font-size: 12px;">Make sure to generate and display the QR code for students to scan.</p>
                    ${scheduleClass ? `
                        <div style="margin-top: 15px;">
                            <button onclick="generateQuickQR('${selectedClass}')" style="padding: 8px 16px; background: #e91e63; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                                📱 Generate QR for ${selectedClass}
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;
        } else {
            // Students list with enhanced info
            html += `<div style="margin-bottom: 10px;">`;
            classRecords.forEach((r, index) => {
                const timeAgo = getTimeAgo(r.time);
                const isRecent = isRecentScan(r.time);
                html += `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; border: 1px solid #eee; border-radius: 8px; background: ${isRecent ? '#e8f5e9' : '#fff'}; margin-bottom: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">
                                ${(index + 1).toString().padStart(2, '0')}
                            </div>
                            <div>
                                <div style="font-weight: 600; color: #333; font-size: 16px;">${r.name}</div>
                                <div style="font-size: 12px; color: #666;">Student ID: ${r.studentId}</div>
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                                <span style="display: inline-block; padding: 2px 6px; border-radius: 12px; font-size: 10px; font-weight: bold; color: ${isRecent ? '#155724' : '#666'}; background: ${isRecent ? '#d4edda' : '#f8f9fa'};">
                                    ${isRecent ? '🟢 RECENT' : '✅ PRESENT'}
                                </span>
                            </div>
                            <div style="font-size: 12px; color: #555; font-weight: 500;">${r.time}</div>
                            <div style="font-size: 11px; color: #888;">${timeAgo}</div>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;

            // Summary footer with cross-link actions
            html += `
                <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 12px;">
                    <div style="text-align: center; margin-bottom: 10px;">
                        <div style="font-size: 14px; color: #495057;">
                            <strong>${totalScanned}</strong> students scanned • Last update: ${currentTime}
                        </div>
                        <div style="font-size: 12px; color: #6c757d; margin-top: 4px;">
                            Auto-refreshes every hour • Next refresh: ${getNextRefreshTime()}
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="downloadCurrentClassList('${selectedClass}')" style="padding: 6px 12px; background: #ff5722; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            📥 Download Student List
                        </button>
                        ${scheduleClass ? `
                            <button onclick="syncFromClassAttendance('${selectedClass}')" style="padding: 6px 12px; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                🔗 View in Your Classes Today
                            </button>
                            <button onclick="markClassComplete('${selectedClass}', '${today}')" style="padding: 6px 12px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                ✓ Mark Class Complete
                            </button>
                            <button onclick="addClassNote('${selectedClass}', '${today}')" style="padding: 6px 12px; background: #9c27b0; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                📝 Add Class Note
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }
    }

    attendanceView.innerHTML = html;
}

// Helper function to select class from schedule
function selectClassFromSchedule(classCode) {
    const classSelect = document.getElementById('classSelect');
    if (classSelect) {
        classSelect.value = classCode;
        loadClassAttendanceEnhanced();
        showProductivityNotification(`Selected ${classCode} from today's schedule`);
    }
}

// Update the main load function to use enhanced version
function loadClassAttendance() {
    loadClassAttendanceEnhanced();
}

// Advanced Attendance Data Management System
class AttendanceDataManager {
    constructor() {
        this.dbName = 'TeacherPortalDB';
        this.version = 1;
        this.db = null;
        this.initDB();
    }

    // Initialize IndexedDB for advanced storage
    async initDB() {
        try {
            const request = indexedDB.open(this.dbName, this.version);
            
            request.onerror = () => {
                console.warn('IndexedDB not available, falling back to localStorage');
                this.useLocalStorage = true;
            };
            
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                
                // Create attendance records store
                if (!this.db.objectStoreNames.contains('attendanceRecords')) {
                    const attendanceStore = this.db.createObjectStore('attendanceRecords', { keyPath: 'id', autoIncrement: true });
                    attendanceStore.createIndex('studentId', 'studentId', { unique: false });
                    attendanceStore.createIndex('classCode', 'classCode', { unique: false });
                    attendanceStore.createIndex('date', 'date', { unique: false });
                    attendanceStore.createIndex('subject', 'subject', { unique: false });
                }
                
                // Create student profiles store
                if (!this.db.objectStoreNames.contains('studentProfiles')) {
                    const studentStore = this.db.createObjectStore('studentProfiles', { keyPath: 'studentId' });
                    studentStore.createIndex('name', 'name', { unique: false });
                    studentStore.createIndex('section', 'section', { unique: false });
                }
                
                // Create class sessions store
                if (!this.db.objectStoreNames.contains('classSessions')) {
                    const sessionStore = this.db.createObjectStore('classSessions', { keyPath: 'sessionId' });
                    sessionStore.createIndex('classCode', 'classCode', { unique: false });
                    sessionStore.createIndex('date', 'date', { unique: false });
                }
            };
            
            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('Advanced attendance database initialized');
            };
        } catch (error) {
            console.warn('IndexedDB initialization failed, using localStorage');
            this.useLocalStorage = true;
        }
    }

    // Record attendance with detailed information
    async recordAttendance(studentData, classInfo) {
        const attendanceRecord = {
            studentId: studentData.studentId,
            studentName: studentData.name,
            classCode: classInfo.code,
            subject: classInfo.subject,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString(),
            timestamp: Date.now(),
            room: classInfo.room,
            teacherId: currentUser.id,
            teacherName: currentUser.name,
            semester: this.getCurrentSemester(),
            academicYear: this.getCurrentAcademicYear()
        };

        if (this.useLocalStorage) {
            return this.recordAttendanceLocalStorage(attendanceRecord);
        } else {
            return this.recordAttendanceIndexedDB(attendanceRecord);
        }
    }

    async recordAttendanceIndexedDB(record) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['attendanceRecords'], 'readwrite');
            const store = transaction.objectStore('attendanceRecords');
            const request = store.add(record);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    recordAttendanceLocalStorage(record) {
        const records = JSON.parse(localStorage.getItem('advancedAttendanceRecords') || '[]');
        record.id = Date.now() + Math.random();
        records.push(record);
        localStorage.setItem('advancedAttendanceRecords', JSON.stringify(records));
        return record.id;
    }

    // Get attendance records with advanced filtering
    async getAttendanceRecords(filters = {}) {
        if (this.useLocalStorage) {
            return this.getAttendanceRecordsLocalStorage(filters);
        } else {
            return this.getAttendanceRecordsIndexedDB(filters);
        }
    }

    async getAttendanceRecordsIndexedDB(filters) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['attendanceRecords'], 'readonly');
            const store = transaction.objectStore('attendanceRecords');
            const request = store.getAll();
            
            request.onsuccess = () => {
                let records = request.result;
                records = this.applyFilters(records, filters);
                resolve(records);
            };
            request.onerror = () => reject(request.error);
        });
    }

    getAttendanceRecordsLocalStorage(filters) {
        const records = JSON.parse(localStorage.getItem('advancedAttendanceRecords') || '[]');
        return this.applyFilters(records, filters);
    }

    applyFilters(records, filters) {
        return records.filter(record => {
            if (filters.classCode && record.classCode !== filters.classCode) return false;
            if (filters.subject && record.subject !== filters.subject) return false;
            if (filters.date && record.date !== filters.date) return false;
            if (filters.studentId && record.studentId !== filters.studentId) return false;
            if (filters.dateRange) {
                const recordDate = new Date(record.date);
                if (recordDate < new Date(filters.dateRange.start) || recordDate > new Date(filters.dateRange.end)) return false;
            }
            return true;
        });
    }

    // Generate comprehensive reports
    async generateAttendanceReport(filters = {}) {
        const records = await this.getAttendanceRecords(filters);
        
        const report = {
            summary: {
                totalRecords: records.length,
                uniqueStudents: new Set(records.map(r => r.studentId)).size,
                uniqueClasses: new Set(records.map(r => r.classCode)).size,
                dateRange: this.getDateRange(records),
                generatedAt: new Date().toISOString()
            },
            bySubject: this.groupBySubject(records),
            byDate: this.groupByDate(records),
            byStudent: this.groupByStudent(records),
            analytics: this.calculateAnalytics(records)
        };

        return report;
    }

    groupBySubject(records) {
        const grouped = {};
        records.forEach(record => {
            if (!grouped[record.subject]) {
                grouped[record.subject] = {
                    subject: record.subject,
                    totalAttendance: 0,
                    uniqueStudents: new Set(),
                    sessions: new Set(),
                    records: []
                };
            }
            grouped[record.subject].totalAttendance++;
            grouped[record.subject].uniqueStudents.add(record.studentId);
            grouped[record.subject].sessions.add(record.date + '_' + record.classCode);
            grouped[record.subject].records.push(record);
        });

        // Convert Sets to counts
        Object.keys(grouped).forEach(subject => {
            grouped[subject].uniqueStudents = grouped[subject].uniqueStudents.size;
            grouped[subject].sessions = grouped[subject].sessions.size;
        });

        return grouped;
    }

    groupByDate(records) {
        const grouped = {};
        records.forEach(record => {
            if (!grouped[record.date]) {
                grouped[record.date] = [];
            }
            grouped[record.date].push(record);
        });
        return grouped;
    }

    groupByStudent(records) {
        const grouped = {};
        records.forEach(record => {
            if (!grouped[record.studentId]) {
                grouped[record.studentId] = {
                    studentId: record.studentId,
                    studentName: record.studentName,
                    totalAttendance: 0,
                    subjects: new Set(),
                    records: []
                };
            }
            grouped[record.studentId].totalAttendance++;
            grouped[record.studentId].subjects.add(record.subject);
            grouped[record.studentId].records.push(record);
        });

        // Convert Sets to arrays
        Object.keys(grouped).forEach(studentId => {
            grouped[studentId].subjects = Array.from(grouped[studentId].subjects);
        });

        return grouped;
    }

    calculateAnalytics(records) {
        const analytics = {
            averageAttendancePerDay: 0,
            peakAttendanceTime: '',
            mostActiveSubject: '',
            attendanceTrends: {}
        };

        if (records.length === 0) return analytics;

        // Calculate average attendance per day
        const byDate = this.groupByDate(records);
        const totalDays = Object.keys(byDate).length;
        analytics.averageAttendancePerDay = totalDays > 0 ? (records.length / totalDays).toFixed(2) : 0;

        // Find peak attendance time
        const timeSlots = {};
        records.forEach(record => {
            const hour = new Date(`2000-01-01 ${record.time}`).getHours();
            const slot = `${hour}:00-${hour + 1}:00`;
            timeSlots[slot] = (timeSlots[slot] || 0) + 1;
        });
        analytics.peakAttendanceTime = Object.keys(timeSlots).reduce((a, b) => timeSlots[a] > timeSlots[b] ? a : b, '');

        // Find most active subject
        const bySubject = this.groupBySubject(records);
        analytics.mostActiveSubject = Object.keys(bySubject).reduce((a, b) => 
            bySubject[a].totalAttendance > bySubject[b].totalAttendance ? a : b, '');

        return analytics;
    }

    getDateRange(records) {
        if (records.length === 0) return { start: null, end: null };
        const dates = records.map(r => r.date).sort();
        return { start: dates[0], end: dates[dates.length - 1] };
    }

    getCurrentSemester() {
        const month = new Date().getMonth() + 1;
        return month >= 7 ? 'Odd' : 'Even';
    }

    getCurrentAcademicYear() {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        return month >= 7 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
    }

    // Export to Excel format
    async exportToExcel(filters = {}, format = 'detailed') {
        const records = await this.getAttendanceRecords(filters);
        const report = await this.generateAttendanceReport(filters);

        let data = [];
        let filename = '';

        switch (format) {
            case 'detailed':
                data = this.prepareDetailedExport(records);
                filename = `attendance_detailed_${new Date().toISOString().split('T')[0]}.csv`;
                break;
            case 'summary':
                data = this.prepareSummaryExport(report);
                filename = `attendance_summary_${new Date().toISOString().split('T')[0]}.csv`;
                break;
            case 'by_subject':
                data = this.prepareSubjectExport(report.bySubject);
                filename = `attendance_by_subject_${new Date().toISOString().split('T')[0]}.csv`;
                break;
            case 'by_student':
                data = this.prepareStudentExport(report.byStudent);
                filename = `attendance_by_student_${new Date().toISOString().split('T')[0]}.csv`;
                break;
        }

        this.downloadCSV(data, filename);
        return { success: true, filename, recordCount: records.length };
    }

    prepareDetailedExport(records) {
        const headers = [
            'Date', 'Time', 'Student ID', 'Student Name', 'Subject', 'Class Code', 
            'Room', 'Teacher', 'Semester', 'Academic Year'
        ];

        const rows = records.map(record => [
            record.date,
            record.time,
            record.studentId,
            record.studentName,
            record.subject,
            record.classCode,
            record.room,
            record.teacherName,
            record.semester,
            record.academicYear
        ]);

        return [headers, ...rows];
    }

    prepareSummaryExport(report) {
        const headers = ['Metric', 'Value'];
        const rows = [
            ['Total Records', report.summary.totalRecords],
            ['Unique Students', report.summary.uniqueStudents],
            ['Unique Classes', report.summary.uniqueClasses],
            ['Date Range Start', report.summary.dateRange.start],
            ['Date Range End', report.summary.dateRange.end],
            ['Generated At', new Date(report.summary.generatedAt).toLocaleString()],
            ['Average Attendance Per Day', report.analytics.averageAttendancePerDay],
            ['Peak Attendance Time', report.analytics.peakAttendanceTime],
            ['Most Active Subject', report.analytics.mostActiveSubject]
        ];

        return [headers, ...rows];
    }

    prepareSubjectExport(bySubject) {
        const headers = ['Subject', 'Total Attendance', 'Unique Students', 'Sessions'];
        const rows = Object.values(bySubject).map(subject => [
            subject.subject,
            subject.totalAttendance,
            subject.uniqueStudents,
            subject.sessions
        ]);

        return [headers, ...rows];
    }

    prepareStudentExport(byStudent) {
        const headers = ['Student ID', 'Student Name', 'Total Attendance', 'Subjects'];
        const rows = Object.values(byStudent).map(student => [
            student.studentId,
            student.studentName,
            student.totalAttendance,
            student.subjects.join(', ')
        ]);

        return [headers, ...rows];
    }

    downloadCSV(data, filename) {
        const csvContent = data.map(row => 
            row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
        ).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Initialize the advanced attendance manager
const attendanceManager = new AttendanceDataManager();

// Helper functions for class code mapping
function getSubjectFromClassCode(classCode) {
    const classMapping = {
        'CN': 'Computer Networks',
        'RMIPR': 'Research Methodology & IPR',
        'MRMM': 'MR&MM',
        'FM': 'Financial Management',
        'TOC': 'Theory of Computation',
        'LAB': 'Laboratory Session',
        'MP': 'Mini Project',
        'LIB': 'Library Hour',
        'ESWM': 'ESWM',
        'NSS': 'NSS/YOGA/PE',
        'CS101': 'Computer Science',
        'MATH201': 'Mathematics',
        'PHY301': 'Physics',
        'ENG101': 'English'
    };
    return classMapping[classCode] || classCode;
}

function getRoomFromClassCode(classCode) {
    const roomMapping = {
        'CN': 'LH-303',
        'RMIPR': 'LH-303',
        'MRMM': 'LH',
        'FM': 'LH-303',
        'TOC': 'LH-303',
        'LAB': 'Lab',
        'MP': 'Project Lab',
        'LIB': 'Library',
        'ESWM': 'LH',
        'NSS': 'Ground',
        'CS101': 'LH-101',
        'MATH201': 'LH-201',
        'PHY301': 'LH-301',
        'ENG101': 'LH-401'
    };
    return roomMapping[classCode] || 'TBD';
}

// Advanced Data Management UI Functions
function openAdvancedDataManager() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.8); z-index: 10000; display: flex; 
        align-items: center; justify-content: center;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 20px; max-width: 800px; width: 90%; max-height: 90%; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #333;">📊 Advanced Attendance Data Manager</h2>
                <button onclick="this.closest('.modal').remove()" style="background: #f44336; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">×</button>
            </div>
            
            <!-- Filter Section -->
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px; color: #495057;">🔍 Filters & Search</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                    <div>
                        <label style="display: block; font-size: 12px; color: #666; margin-bottom: 4px;">Subject:</label>
                        <select id="filterSubject" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px;">
                            <option value="">All Subjects</option>
                            <option value="Computer Networks">Computer Networks</option>
                            <option value="Research Methodology & IPR">Research Methodology & IPR</option>
                            <option value="Theory of Computation">Theory of Computation</option>
                            <option value="Financial Management">Financial Management</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; font-size: 12px; color: #666; margin-bottom: 4px;">Class Code:</label>
                        <select id="filterClassCode" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px;">
                            <option value="">All Classes</option>
                            <option value="CN">CN</option>
                            <option value="RMIPR">RMIPR</option>
                            <option value="TOC">TOC</option>
                            <option value="FM">FM</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; font-size: 12px; color: #666; margin-bottom: 4px;">Date From:</label>
                        <input type="date" id="filterDateFrom" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div>
                        <label style="display: block; font-size: 12px; color: #666; margin-bottom: 4px;">Date To:</label>
                        <input type="date" id="filterDateTo" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                </div>
                <div style="margin-top: 10px; display: flex; gap: 8px;">
                    <button onclick="applyDataFilters()" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">🔍 Apply Filters</button>
                    <button onclick="clearDataFilters()" style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">🗑️ Clear</button>
                    <button onclick="generateAdvancedReport()" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">📈 Generate Report</button>
                </div>
            </div>
            
            <!-- Export Section -->
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px; color: #1976d2;">📤 Export Options</h3>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button onclick="exportAdvancedData('detailed')" style="padding: 8px 16px; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;">📋 Detailed Report</button>
                    <button onclick="exportAdvancedData('summary')" style="padding: 8px 16px; background: #ff9800; color: white; border: none; border-radius: 4px; cursor: pointer;">📊 Summary Report</button>
                    <button onclick="exportAdvancedData('by_subject')" style="padding: 8px 16px; background: #9c27b0; color: white; border: none; border-radius: 4px; cursor: pointer;">📚 By Subject</button>
                    <button onclick="exportAdvancedData('by_student')" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">👥 By Student</button>
                </div>
            </div>
            
            <!-- Data Display -->
            <div id="advancedDataDisplay" style="border: 1px solid #ddd; border-radius: 8px; min-height: 200px; padding: 15px;">
                <div style="text-align: center; color: #666; padding: 40px;">
                    <div style="font-size: 48px; margin-bottom: 10px;">📊</div>
                    <p>Click "Apply Filters" or "Generate Report" to view attendance data</p>
                </div>
            </div>
        </div>
    `;
    
    modal.className = 'modal';
    document.body.appendChild(modal);
    
    // Set default dates (last 30 days)
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    document.getElementById('filterDateFrom').value = thirtyDaysAgo.toISOString().split('T')[0];
    document.getElementById('filterDateTo').value = today.toISOString().split('T')[0];
}

async function applyDataFilters() {
    const filters = {
        subject: document.getElementById('filterSubject').value,
        classCode: document.getElementById('filterClassCode').value,
        dateRange: {
            start: document.getElementById('filterDateFrom').value,
            end: document.getElementById('filterDateTo').value
        }
    };
    
    // Remove empty filters
    Object.keys(filters).forEach(key => {
        if (!filters[key] || (typeof filters[key] === 'object' && (!filters[key].start || !filters[key].end))) {
            delete filters[key];
        }
    });
    
    try {
        const records = await attendanceManager.getAttendanceRecords(filters);
        displayFilteredData(records, filters);
    } catch (error) {
        console.error('Error applying filters:', error);
        document.getElementById('advancedDataDisplay').innerHTML = `
            <div style="text-align: center; color: #f44336; padding: 20px;">
                <p>Error loading data: ${error.message}</p>
            </div>
        `;
    }
}

function displayFilteredData(records, filters) {
    const display = document.getElementById('advancedDataDisplay');
    
    if (records.length === 0) {
        display.innerHTML = `
            <div style="text-align: center; color: #666; padding: 20px;">
                <div style="font-size: 48px; margin-bottom: 10px;">📭</div>
                <p>No attendance records found matching the selected filters.</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div style="margin-bottom: 15px; padding: 10px; background: #e8f5e9; border-radius: 6px;">
            <strong>📊 Found ${records.length} attendance records</strong>
            <span style="margin-left: 15px; color: #666;">
                ${new Set(records.map(r => r.studentId)).size} unique students • 
                ${new Set(records.map(r => r.subject)).size} subjects • 
                ${new Set(records.map(r => r.date)).size} days
            </span>
        </div>
        
        <div style="max-height: 300px; overflow-y: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                <thead style="background: #f8f9fa; position: sticky; top: 0;">
                    <tr>
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Date</th>
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Time</th>
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Student</th>
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Subject</th>
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Class</th>
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Room</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    records.forEach(record => {
        html += `
            <tr>
                <td style="padding: 6px; border: 1px solid #ddd;">${record.date}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${record.time}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${record.studentName} (${record.studentId})</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${record.subject}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${record.classCode}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${record.room}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    display.innerHTML = html;
}

async function generateAdvancedReport() {
    const filters = {
        subject: document.getElementById('filterSubject').value,
        classCode: document.getElementById('filterClassCode').value,
        dateRange: {
            start: document.getElementById('filterDateFrom').value,
            end: document.getElementById('filterDateTo').value
        }
    };
    
    // Remove empty filters
    Object.keys(filters).forEach(key => {
        if (!filters[key] || (typeof filters[key] === 'object' && (!filters[key].start || !filters[key].end))) {
            delete filters[key];
        }
    });
    
    try {
        const report = await attendanceManager.generateAttendanceReport(filters);
        displayAdvancedReport(report);
    } catch (error) {
        console.error('Error generating report:', error);
    }
}

function displayAdvancedReport(report) {
    const display = document.getElementById('advancedDataDisplay');
    
    let html = `
        <div style="margin-bottom: 20px;">
            <h3 style="margin: 0 0 10px; color: #333;">📈 Attendance Analytics Report</h3>
            <p style="color: #666; font-size: 12px;">Generated: ${new Date(report.summary.generatedAt).toLocaleString()}</p>
        </div>
        
        <!-- Summary Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 20px;">
            <div style="background: #e3f2fd; padding: 12px; border-radius: 6px; text-align: center;">
                <div style="font-size: 20px; font-weight: bold; color: #1976d2;">${report.summary.totalRecords}</div>
                <div style="font-size: 11px; color: #666;">Total Records</div>
            </div>
            <div style="background: #e8f5e9; padding: 12px; border-radius: 6px; text-align: center;">
                <div style="font-size: 20px; font-weight: bold; color: #388e3c;">${report.summary.uniqueStudents}</div>
                <div style="font-size: 11px; color: #666;">Unique Students</div>
            </div>
            <div style="background: #fff3e0; padding: 12px; border-radius: 6px; text-align: center;">
                <div style="font-size: 20px; font-weight: bold; color: #f57c00;">${report.summary.uniqueClasses}</div>
                <div style="font-size: 11px; color: #666;">Unique Classes</div>
            </div>
            <div style="background: #f3e5f5; padding: 12px; border-radius: 6px; text-align: center;">
                <div style="font-size: 20px; font-weight: bold; color: #7b1fa2;">${report.analytics.averageAttendancePerDay}</div>
                <div style="font-size: 11px; color: #666;">Avg/Day</div>
            </div>
        </div>
        
        <!-- Subject Breakdown -->
        <div style="margin-bottom: 20px;">
            <h4 style="margin: 0 0 10px; color: #333;">📚 By Subject</h4>
            <div style="max-height: 150px; overflow-y: auto;">
    `;
    
    Object.values(report.bySubject).forEach(subject => {
        html += `
            <div style="display: flex; justify-content: space-between; padding: 8px; border: 1px solid #eee; margin-bottom: 4px; border-radius: 4px;">
                <span style="font-weight: 500;">${subject.subject}</span>
                <span style="color: #666; font-size: 12px;">${subject.totalAttendance} records • ${subject.uniqueStudents} students</span>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
        
        <!-- Analytics -->
        <div style="background: #f8f9fa; padding: 12px; border-radius: 6px;">
            <h4 style="margin: 0 0 10px; color: #333;">🔍 Key Insights</h4>
            <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #666;">
                <li>Peak attendance time: <strong>${report.analytics.peakAttendanceTime}</strong></li>
                <li>Most active subject: <strong>${report.analytics.mostActiveSubject}</strong></li>
                <li>Date range: <strong>${report.summary.dateRange.start} to ${report.summary.dateRange.end}</strong></li>
            </ul>
        </div>
    `;
    
    display.innerHTML = html;
}

async function exportAdvancedData(format) {
    const filters = {
        subject: document.getElementById('filterSubject').value,
        classCode: document.getElementById('filterClassCode').value,
        dateRange: {
            start: document.getElementById('filterDateFrom').value,
            end: document.getElementById('filterDateTo').value
        }
    };
    
    // Remove empty filters
    Object.keys(filters).forEach(key => {
        if (!filters[key] || (typeof filters[key] === 'object' && (!filters[key].start || !filters[key].end))) {
            delete filters[key];
        }
    });
    
    try {
        const result = await attendanceManager.exportToExcel(filters, format);
        showProductivityNotification(`📄 ${result.filename} exported successfully! (${result.recordCount} records)`);
    } catch (error) {
        console.error('Export error:', error);
        showProductivityNotification('❌ Export failed: ' + error.message);
    }
}

function clearDataFilters() {
    document.getElementById('filterSubject').value = '';
    document.getElementById('filterClassCode').value = '';
    document.getElementById('filterDateFrom').value = '';
    document.getElementById('filterDateTo').value = '';
    
    document.getElementById('advancedDataDisplay').innerHTML = `
        <div style="text-align: center; color: #666; padding: 40px;">
            <div style="font-size: 48px; margin-bottom: 10px;">📊</div>
            <p>Filters cleared. Click "Apply Filters" or "Generate Report" to view data</p>
        </div>
    `;
}

// Quick download function for current class attendance list
function downloadCurrentClassList(classCode) {
    const todayDateStr = new Date().toDateString();
    const today = getTodayDayName();
    
    // Get scanned attendance data
    const scannedStore = JSON.parse(localStorage.getItem('scannedAttendance') || '{}');
    const todayRecords = scannedStore[todayDateStr] || {};
    const classRecords = todayRecords[classCode] || [];
    
    // Get class details from schedule
    const todaySchedule = scheduleData.teacher[today] || [];
    const scheduleClass = todaySchedule.find(item => item.code === classCode);
    
    if (classRecords.length === 0) {
        alert(`No students have scanned attendance for ${classCode} yet.`);
        return;
    }
    
    // Prepare CSV data
    const headers = [
        'Sr. No.',
        'Student Name', 
        'Student ID', 
        'Scan Time', 
        'Scan Date',
        'Subject',
        'Class Code',
        'Room',
        'Teacher',
        'Day',
        'Academic Year',
        'Semester'
    ];
    
    const currentAcademicYear = getCurrentAcademicYear();
    const currentSemester = getCurrentSemester();
    const teacherName = currentUser.name || 'Teacher';
    const subject = scheduleClass ? scheduleClass.subject : getSubjectFromClassCode(classCode);
    const room = scheduleClass ? scheduleClass.room : getRoomFromClassCode(classCode);
    
    const rows = classRecords.map((record, index) => [
        index + 1,
        record.name || record.studentName,
        record.studentId,
        record.time,
        record.date,
        subject,
        classCode,
        room,
        teacherName,
        today,
        currentAcademicYear,
        currentSemester
    ]);
    
    // Add summary row
    const summaryRow = [
        '',
        `TOTAL STUDENTS: ${classRecords.length}`,
        '',
        '',
        `Generated: ${new Date().toLocaleString()}`,
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    ];
    
    const csvData = [headers, ...rows, [], summaryRow];
    
    // Convert to CSV format
    const csvContent = csvData.map(row => 
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const filename = `${classCode}_attendance_${today}_${new Date().toISOString().split('T')[0]}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show success notification
    showProductivityNotification(`📥 ${filename} downloaded successfully! (${classRecords.length} students)`);
}

// Helper functions for academic info
function getCurrentAcademicYear() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    return month >= 7 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
}

function getCurrentSemester() {
    const month = new Date().getMonth() + 1;
    return month >= 7 ? 'Odd' : 'Even';
}

// Enhanced Teacher Class Status Management
function toggleTeacherClassStatus(classCode, date) {
    const statusKey = `${classCode}_${date}_status`;
    const currentStatus = localStorage.getItem(statusKey) || 'pending';
    
    // Cycle through: pending -> taught -> pending
    const newStatus = currentStatus === 'taught' ? 'pending' : 'taught';
    localStorage.setItem(statusKey, newStatus);
    
    // Also update the legacy completed status for compatibility
    const completed = JSON.parse(localStorage.getItem('completedClasses') || '{}');
    const key = `${classCode}_${date}`;
    completed[key] = newStatus === 'taught';
    localStorage.setItem('completedClasses', JSON.stringify(completed));
    
    // Record teacher action in advanced system
    try {
        const actionRecord = {
            teacherId: currentUser.id,
            teacherName: currentUser.name,
            classCode: classCode,
            date: date,
            action: newStatus === 'taught' ? 'marked_taught' : 'unmarked_taught',
            timestamp: new Date().toISOString(),
            academicYear: getCurrentAcademicYear(),
            semester: getCurrentSemester()
        };
        
        const actions = JSON.parse(localStorage.getItem('teacherActions') || '[]');
        actions.push(actionRecord);
        localStorage.setItem('teacherActions', JSON.stringify(actions));
    } catch (e) {
        console.warn('Failed to record teacher action', e);
    }
    
    displayTeacherSchedule(); // Refresh display
    showProductivityNotification(newStatus === 'taught' ? 
        `✅ ${classCode} marked as taught!` : 
        `📚 ${classCode} unmarked - ready to teach`);
}

function markClassCancelled(classCode, date) {
    if (confirm(`Mark ${classCode} as cancelled? This will record the cancellation.`)) {
        const statusKey = `${classCode}_${date}_status`;
        localStorage.setItem(statusKey, 'cancelled');
        
        // Record cancellation reason
        const reason = prompt('Reason for cancellation (optional):') || 'No reason provided';
        
        const cancellationRecord = {
            teacherId: currentUser.id,
            teacherName: currentUser.name,
            classCode: classCode,
            date: date,
            reason: reason,
            timestamp: new Date().toISOString(),
            academicYear: getCurrentAcademicYear(),
            semester: getCurrentSemester()
        };
        
        const cancellations = JSON.parse(localStorage.getItem('classCancellations') || '[]');
        cancellations.push(cancellationRecord);
        localStorage.setItem('classCancellations', JSON.stringify(cancellations));
        
        displayTeacherSchedule(); // Refresh display
        showProductivityNotification(`❌ ${classCode} marked as cancelled`);
    }
}

function getClassStatus(classCode, date) {
    const statusKey = `${classCode}_${date}_status`;
    return localStorage.getItem(statusKey) || 'pending';
}

function getClassCancellationInfo(classCode, date) {
    const cancellations = JSON.parse(localStorage.getItem('classCancellations') || '[]');
    return cancellations.find(c => c.classCode === classCode && c.date === date);
}

// Enhanced class information display
function showClassDetails(classCode, date) {
    const today = getTodayDayName();
    const items = scheduleData.teacher[today] || [];
    const classItem = items.find(item => item.code === classCode);
    
    if (!classItem) {
        alert('Class not found');
        return;
    }
    
    const status = getClassStatus(classCode, date);
    const attendanceCount = getClassAttendanceCount(classCode);
    const notes = getClassNotes(classCode, date);
    const cancellationInfo = getClassCancellationInfo(classCode, date);
    
    let details = `📚 Class Details: ${classItem.subject}\n\n`;
    details += `🕐 Time: ${classItem.time}\n`;
    details += `🏫 Room: ${classItem.room}\n`;
    details += `🔢 Code: ${classCode}\n`;
    details += `📅 Date: ${date}\n\n`;
    
    details += `📊 Status: ${status.toUpperCase()}\n`;
    if (status === 'cancelled' && cancellationInfo) {
        details += `❌ Cancellation Reason: ${cancellationInfo.reason}\n`;
        details += `🕐 Cancelled At: ${new Date(cancellationInfo.timestamp).toLocaleString()}\n`;
    }
    
    details += `👥 Attendance: ${attendanceCount} students\n`;
    
    if (notes) {
        details += `📝 Notes: ${notes}\n`;
    }
    
    details += `\n🏫 Academic Info:\n`;
    details += `📚 Semester: ${getCurrentSemester()}\n`;
    details += `📅 Academic Year: ${getCurrentAcademicYear()}\n`;
    details += `👨‍🏫 Teacher: ${currentUser.name}`;
    
    alert(details);
}

// Enhanced attendance tracking
function startClassSession(classCode, date) {
    if (confirm(`Start teaching session for ${classCode}?`)) {
        const sessionRecord = {
            teacherId: currentUser.id,
            teacherName: currentUser.name,
            classCode: classCode,
            date: date,
            startTime: new Date().toISOString(),
            status: 'in_progress',
            academicYear: getCurrentAcademicYear(),
            semester: getCurrentSemester()
        };
        
        const sessions = JSON.parse(localStorage.getItem('teachingSessions') || '[]');
        sessions.push(sessionRecord);
        localStorage.setItem('teachingSessions', JSON.stringify(sessions));
        
        // Auto-generate QR for the class
        generateQuickQR(classCode);
        
        displayTeacherSchedule(); // Refresh display
        showProductivityNotification(`🎯 Teaching session started for ${classCode}!`);
    }
}

function endClassSession(classCode, date) {
    if (confirm(`End teaching session for ${classCode}?`)) {
        const sessions = JSON.parse(localStorage.getItem('teachingSessions') || '[]');
        const currentSession = sessions.find(s => 
            s.classCode === classCode && 
            s.date === date && 
            s.status === 'in_progress'
        );
        
        if (currentSession) {
            currentSession.endTime = new Date().toISOString();
            currentSession.status = 'completed';
            currentSession.duration = Math.round((new Date() - new Date(currentSession.startTime)) / 60000); // minutes
            localStorage.setItem('teachingSessions', JSON.stringify(sessions));
            
            // Auto-mark as taught
            toggleTeacherClassStatus(classCode, date);
        }
        
        displayTeacherSchedule(); // Refresh display
        showProductivityNotification(`✅ Teaching session ended for ${classCode}!`);
    }
}

// Check if class session is active
function isClassSessionActive(classCode, date) {
    const sessions = JSON.parse(localStorage.getItem('teachingSessions') || '[]');
    return sessions.some(s => 
        s.classCode === classCode && 
        s.date === date && 
        s.status === 'in_progress'
    );
}

// Enhanced Recommended Schedule Functions
function toggleRecTeacherStatus(classCode, selectedDay) {
    const statusKey = `${classCode}_${selectedDay}_rec_status`;
    const currentStatus = localStorage.getItem(statusKey) || 'pending';
    
    // Cycle through: pending -> taught -> pending
    const newStatus = currentStatus === 'taught' ? 'pending' : 'taught';
    localStorage.setItem(statusKey, newStatus);
    
    // Also update the legacy completed status for compatibility
    const completed = JSON.parse(localStorage.getItem('completedClasses') || '{}');
    const key = `${classCode}_${selectedDay}`;
    completed[key] = newStatus === 'taught';
    localStorage.setItem('completedClasses', JSON.stringify(completed));
    
    // Record teacher action
    try {
        const actionRecord = {
            teacherId: currentUser.id,
            teacherName: currentUser.name,
            classCode: classCode,
            date: selectedDay,
            action: newStatus === 'taught' ? 'marked_taught_recommended' : 'unmarked_taught_recommended',
            timestamp: new Date().toISOString(),
            academicYear: getCurrentAcademicYear(),
            semester: getCurrentSemester()
        };
        
        const actions = JSON.parse(localStorage.getItem('teacherActions') || '[]');
        actions.push(actionRecord);
        localStorage.setItem('teacherActions', JSON.stringify(actions));
    } catch (e) {
        console.warn('Failed to record teacher action', e);
    }
    
    displayTeacherRecommendedSchedule(); // Refresh display
    showProductivityNotification(newStatus === 'taught' ? 
        `✅ ${classCode} marked as taught in recommended schedule!` : 
        `📚 ${classCode} unmarked in recommended schedule`);
}

function setRecClassPriority(classCode, selectedDay) {
    const priorities = ['Low', 'Medium', 'High', 'Critical'];
    const currentPriority = getRecClassPriority(classCode, selectedDay);
    const currentIndex = priorities.indexOf(currentPriority);
    
    let priorityOptions = '';
    priorities.forEach((priority, index) => {
        const selected = index === currentIndex ? 'selected' : '';
        priorityOptions += `<option value="${priority}" ${selected}>${priority}</option>`;
    });
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.8); z-index: 10000; display: flex; 
        align-items: center; justify-content: center;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 20px; max-width: 400px; width: 90%;">
            <h3 style="margin: 0 0 15px; color: #333;">🔥 Set Class Priority</h3>
            <p style="color: #666; margin-bottom: 15px;">Class: <strong>${classCode}</strong> on <strong>${selectedDay}</strong></p>
            
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Priority Level:</label>
            <select id="prioritySelect" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 15px;">
                ${priorityOptions}
            </select>
            
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Reason (optional):</label>
            <textarea id="priorityReason" placeholder="Why is this priority level needed?" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 15px; height: 60px; resize: vertical;"></textarea>
            
            <div style="display: flex; gap: 10px; justify-content: end;">
                <button onclick="this.closest('div').parentElement.remove()" style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
                <button onclick="saveRecClassPriority('${classCode}', '${selectedDay}', this)" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Save Priority</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function saveRecClassPriority(classCode, selectedDay, button) {
    const modal = button.closest('div').parentElement;
    const priority = document.getElementById('prioritySelect').value;
    const reason = document.getElementById('priorityReason').value.trim();
    
    const priorityData = {
        priority: priority,
        reason: reason,
        setBy: currentUser.name,
        timestamp: new Date().toISOString()
    };
    
    const priorities = JSON.parse(localStorage.getItem('classPriorities') || '{}');
    priorities[`${classCode}_${selectedDay}`] = priorityData;
    localStorage.setItem('classPriorities', JSON.stringify(priorities));
    
    modal.remove();
    displayTeacherRecommendedSchedule(); // Refresh display
    showProductivityNotification(`🔥 ${classCode} priority set to ${priority}!`);
}

function getRecClassPriority(classCode, selectedDay) {
    const priorities = JSON.parse(localStorage.getItem('classPriorities') || '{}');
    const priorityData = priorities[`${classCode}_${selectedDay}`];
    return priorityData ? priorityData.priority : 'Medium';
}

function showRecClassDetails(classCode, selectedDay) {
    const items = scheduleData.teacher[selectedDay] || [];
    const classItem = items.find(item => item.code === classCode);
    
    if (!classItem) {
        alert('Class not found');
        return;
    }
    
    const status = getClassStatus(classCode, selectedDay);
    const priority = getRecClassPriority(classCode, selectedDay);
    const isBookmarked = isClassBookmarked(classCode, selectedDay);
    const notes = getRecScheduleNotes(classCode, selectedDay);
    const attendanceCount = selectedDay === getTodayDayName() ? getClassAttendanceCount(classCode) : 0;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.8); z-index: 10000; display: flex; 
        align-items: center; justify-content: center;
    `;
    
    const priorityColor = {
        'Low': '#28a745',
        'Medium': '#ffc107', 
        'High': '#fd7e14',
        'Critical': '#dc3545'
    }[priority] || '#6c757d';
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 20px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #333;">📚 Class Details</h2>
                <button onclick="this.closest('div').parentElement.remove()" style="background: #f44336; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">×</button>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h3 style="margin: 0 0 10px; color: #495057;">${classItem.subject}</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 14px;">
                    <div><strong>Time:</strong> ${classItem.time}</div>
                    <div><strong>Room:</strong> ${classItem.room || 'TBD'}</div>
                    <div><strong>Code:</strong> ${classCode}</div>
                    <div><strong>Day:</strong> ${selectedDay}</div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-bottom: 15px;">
                <div style="background: #e3f2fd; padding: 10px; border-radius: 6px; text-align: center;">
                    <div style="font-size: 16px; font-weight: bold; color: #1976d2;">${status.toUpperCase()}</div>
                    <div style="font-size: 11px; color: #666;">Status</div>
                </div>
                <div style="background: ${priorityColor}20; padding: 10px; border-radius: 6px; text-align: center;">
                    <div style="font-size: 16px; font-weight: bold; color: ${priorityColor};">${priority}</div>
                    <div style="font-size: 11px; color: #666;">Priority</div>
                </div>
                <div style="background: #fff3e0; padding: 10px; border-radius: 6px; text-align: center;">
                    <div style="font-size: 16px; font-weight: bold; color: #f57c00;">${isBookmarked ? '⭐' : '☆'}</div>
                    <div style="font-size: 11px; color: #666;">Starred</div>
                </div>
                ${selectedDay === getTodayDayName() ? `
                    <div style="background: #e8f5e9; padding: 10px; border-radius: 6px; text-align: center;">
                        <div style="font-size: 16px; font-weight: bold; color: #388e3c;">${attendanceCount}</div>
                        <div style="font-size: 11px; color: #666;">Attendance</div>
                    </div>
                ` : ''}
            </div>
            
            ${notes ? `
                <div style="background: #f3e5f5; padding: 12px; border-radius: 6px; margin-bottom: 15px;">
                    <h4 style="margin: 0 0 8px; color: #7b1fa2;">📝 Notes</h4>
                    <p style="margin: 0; color: #333; font-size: 14px;">${notes}</p>
                </div>
            ` : ''}
            
            <div style="background: #f8f9fa; padding: 12px; border-radius: 6px;">
                <h4 style="margin: 0 0 8px; color: #495057;">🏫 Academic Info</h4>
                <div style="font-size: 12px; color: #666;">
                    <div>📚 Semester: ${getCurrentSemester()}</div>
                    <div>📅 Academic Year: ${getCurrentAcademicYear()}</div>
                    <div>👨‍🏫 Teacher: ${currentUser.name}</div>
                    <div>🕐 Last Updated: ${new Date().toLocaleString()}</div>
                </div>
            </div>
            
            <div style="display: flex; gap: 8px; justify-content: center; margin-top: 15px; flex-wrap: wrap;">
                <button onclick="addRecScheduleNote('${classCode}', '${selectedDay}'); this.closest('div').parentElement.remove();" style="padding: 6px 12px; background: #6f42c1; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                    📝 ${notes ? 'Edit Note' : 'Add Note'}
                </button>
                <button onclick="setRecClassPriority('${classCode}', '${selectedDay}'); this.closest('div').parentElement.remove();" style="padding: 6px 12px; background: #9c27b0; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                    🔥 Set Priority
                </button>
                <button onclick="toggleRecBookmark('${classCode}', '${selectedDay}'); this.closest('div').parentElement.remove();" style="padding: 6px 12px; background: ${isBookmarked ? '#ff9800' : '#607d8b'}; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                    ${isBookmarked ? '⭐ Starred' : '⭐ Star'}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function scheduleRecClassReminder(classCode, selectedDay) {
    const items = scheduleData.teacher[selectedDay] || [];
    const classItem = items.find(item => item.code === classCode);
    
    if (!classItem) {
        alert('Class not found');
        return;
    }
    
    const reminderTypes = [
        { value: '15', label: '15 minutes before' },
        { value: '30', label: '30 minutes before' },
        { value: '60', label: '1 hour before' },
        { value: '1440', label: '1 day before' }
    ];
    
    let reminderOptions = '';
    reminderTypes.forEach(type => {
        reminderOptions += `<option value="${type.value}">${type.label}</option>`;
    });
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.8); z-index: 10000; display: flex; 
        align-items: center; justify-content: center;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 20px; max-width: 400px; width: 90%;">
            <h3 style="margin: 0 0 15px; color: #333;">⏰ Schedule Reminder</h3>
            <p style="color: #666; margin-bottom: 15px;">
                <strong>${classItem.subject}</strong><br>
                ${selectedDay} at ${classItem.time}
            </p>
            
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Remind me:</label>
            <select id="reminderTime" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 15px;">
                ${reminderOptions}
            </select>
            
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Custom message (optional):</label>
            <textarea id="reminderMessage" placeholder="e.g., Prepare slides for Chapter 5" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 15px; height: 60px; resize: vertical;"></textarea>
            
            <div style="display: flex; gap: 10px; justify-content: end;">
                <button onclick="this.closest('div').parentElement.remove()" style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
                <button onclick="saveRecClassReminder('${classCode}', '${selectedDay}', this)" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Set Reminder</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function saveRecClassReminder(classCode, selectedDay, button) {
    const modal = button.closest('div').parentElement;
    const reminderTime = document.getElementById('reminderTime').value;
    const customMessage = document.getElementById('reminderMessage').value.trim();
    
    const reminderData = {
        classCode: classCode,
        day: selectedDay,
        minutesBefore: parseInt(reminderTime),
        customMessage: customMessage,
        setBy: currentUser.name,
        timestamp: new Date().toISOString()
    };
    
    const reminders = JSON.parse(localStorage.getItem('classReminders') || '[]');
    reminders.push(reminderData);
    localStorage.setItem('classReminders', JSON.stringify(reminders));
    
    modal.remove();
    showProductivityNotification(`⏰ Reminder set for ${classCode} - ${reminderTime} minutes before class!`);
    
    // In a real app, this would integrate with browser notifications or calendar
    console.log('Reminder set:', reminderData);
}

// View day statistics
function viewDayStats() {
    const today = getTodayDayName();
    const items = scheduleData.teacher[today] || [];
    const totalClasses = items.filter(item => item.subject && item.code !== 'BREAK' && item.code !== 'LUNCH').length;
    const completedClasses = items.filter(item => isClassMarkedComplete(item.code, today)).length;
    const totalAttendance = items.reduce((sum, item) => sum + getClassAttendanceCount(item.code), 0);
    const classesWithNotes = items.filter(item => getClassNotes(item.code, today)).length;
    
    const stats = `
📊 Day Statistics for ${today}

📚 Classes: ${completedClasses}/${totalClasses} completed
👥 Total Attendance: ${totalAttendance} students
📝 Classes with Notes: ${classesWithNotes}/${totalClasses}
⏰ Current Time: ${new Date().toLocaleTimeString()}

${totalClasses > 0 ? `📈 Completion Rate: ${Math.round((completedClasses/totalClasses)*100)}%` : ''}
    `;
    
    alert(stats);
}

// Populate teacher subject picker with available subjects
function populateTeacherSubjectPicker() {
    const picker = document.getElementById('teacherSubjectPicker');
    if (!picker) return;
    
    // Get all unique subjects from all days
    const allSubjects = new Set();
    Object.values(scheduleData.teacher).forEach(daySchedule => {
        daySchedule.forEach(item => {
            if (item.subject && item.subject.trim() && 
                item.code !== 'BREAK' && item.code !== 'LUNCH') {
                allSubjects.add(item.subject.trim());
            }
        });
    });
    
    // Clear existing options except the first one
    picker.innerHTML = '<option value="">All Subjects</option>';
    
    // Add subjects alphabetically
    Array.from(allSubjects).sort().forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        picker.appendChild(option);
    });
    
    // Set up the change event
    picker.onchange = () => {
        displayTeacherRecommendedSchedule(picker.value);
    };
}

// Load Teacher Dashboard
function loadTeacherDashboard() {
    loadCustomScheduleChanges(); // Load any custom changes first
    displayTeacherSchedule();
    loadClassAttendance();

    // Populate subject picker and recommended schedule
    populateTeacherSubjectPicker();
    setupScheduleAutoRefresh();

    // Wire up additional controls
    const typeFilter = document.getElementById('teacherTypeFilter');
    const upcomingOnly = document.getElementById('teacherUpcomingOnly');
    const copyBtn = document.getElementById('teacherRecCopyBtn');
    const printBtn = document.getElementById('teacherRecPrintBtn');
    const dayLabel = document.getElementById('teacherRecDayLabel');
    const dayPicker = document.getElementById('teacherDayPicker');
    const updateDayLabel = () => {
        if (!dayLabel) return;
        const val = dayPicker && dayPicker.value;
        const labelDay = !val || val === 'TODAY' ? getTodayDayName() : val;
        dayLabel.textContent = `Day: ${labelDay}`;
    };
    updateDayLabel();

    const refreshRec = () => {
        const picker = document.getElementById('teacherSubjectPicker');
        displayTeacherRecommendedSchedule(picker ? picker.value : '');
    };
    
    // Set up all filter change events
    if (typeFilter) typeFilter.onchange = refreshRec;
    if (upcomingOnly) upcomingOnly.onchange = refreshRec;
    
    // Set up day picker change event (already declared above)
    if (dayPicker) {
        dayPicker.onchange = () => {
            updateDayLabel();
            refreshRec();
        };
    }
    if (copyBtn) copyBtn.onclick = copyTeacherRecToClipboard;
    const csvBtn = document.getElementById('teacherRecCsvBtn');
    if (csvBtn) csvBtn.onclick = exportTeacherRecCsv;
    if (printBtn) printBtn.onclick = printTeacherRecSchedule;
    refreshRec(); // Call refreshRec once to initialize the recommended schedule

    // Refresh Class Attendance list when teacher changes class selection
    const classSelect = document.getElementById('classSelect');
    if (classSelect) classSelect.onchange = () => loadClassAttendance();

    // Auto-refresh Class Attendance every hour (3600000 ms)
    setInterval(() => {
        loadClassAttendance();
    }, 3600000);
}

// Enhanced Teacher Recommended Schedule with Interactive Features
function displayTeacherRecommendedSchedule(subjectFilter) {
    const recDiv = document.getElementById('teacherRecommendedSchedule');
    if (!recDiv) return;
    
    // Determine day from picker
    const dayPicker = document.getElementById('teacherDayPicker');
    const selectedDay = (dayPicker && dayPicker.value && dayPicker.value !== 'TODAY') ? dayPicker.value : getTodayDayName();
    let items = (scheduleData.teacher[selectedDay] || []).slice();
    
    // Apply custom changes for the selected day
    loadCustomScheduleChanges();
    items = (scheduleData.teacher[selectedDay] || []).slice();

    // Type filter
    const typeValue = (document.getElementById('teacherTypeFilter') || {}).value || '';
    if (typeValue === 'LAB') items = items.filter(it => /LAB/i.test(it.subject) || it.code === 'LAB');
    else if (typeValue === 'BREAK') items = items.filter(it => it.code === 'BREAK' || it.code === 'LUNCH');
    else if (typeValue === 'LECTURE') items = items.filter(it => !(it.code === 'BREAK' || it.code === 'LUNCH' || /LAB/i.test(it.subject) || it.code === 'LAB'));

    // Subject filter
    if (subjectFilter) items = items.filter(it => (it.subject || '').trim() === subjectFilter);

    // Upcoming filter
    const upcomingOnly = (document.getElementById('teacherUpcomingOnly') || {}).checked;
    if (upcomingOnly && selectedDay === getTodayDayName()) {
        const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
        items = items.filter(it => {
            const [start] = it.time.split('-').map(s => s.trim());
            const [sh, sm] = start.split(':').map(Number);
            return (sh * 60 + sm) >= nowMin;
        });
    }

    if (items.length === 0) {
        recDiv.innerHTML = `
            <div style="text-align: center; padding: 30px; background: #f8f9fa; border-radius: 8px; border: 2px dashed #dee2e6;">
                <div style="font-size: 48px; margin-bottom: 10px;">📅</div>
                <h4 style="color: #6c757d; margin: 0;">No Matching Classes</h4>
                <p style="color: #6c757d; margin: 5px 0 0;">
                    ${subjectFilter ? `No classes found for ${subjectFilter} on ${selectedDay}` : `No classes scheduled for ${selectedDay}`}
                </p>
                <button onclick="addRecommendedClass('${selectedDay}')" style="margin-top: 10px; padding: 6px 12px; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    ➕ Add Class
                </button>
            </div>
        `;
        updateRecommendedSummary([], selectedDay);
        return;
    }

    // Build enhanced list with interactive features
    let html = '';
    items.forEach((item, index) => {
        const isCurrent = isNowWithin(item.time) && selectedDay === getTodayDayName();
        const isPast = isPastTime(item.time) && selectedDay === getTodayDayName();
        const isBreak = item.code === 'BREAK' || item.code === 'LUNCH';
        const isLab = /LAB/i.test(item.subject || '') || item.code === 'LAB';
        const type = isBreak ? 'BREAK' : (isLab ? 'LAB' : 'LECTURE');
        
        // Get additional data
        const classNotes = getRecScheduleNotes(item.code, selectedDay);
        const attendanceCount = getClassAttendanceCount(item.code);
        const isMarkedComplete = isClassMarkedComplete(item.code, selectedDay);
        const isBookmarked = isClassBookmarked(item.code, selectedDay);
        const classPriority = getRecClassPriority(item.code, selectedDay);
        
        // Color coding
        let bg = '#e3f2fd', border = '#90caf9', icon = '📖';
        if (type === 'LAB') { bg = '#e8f5e9'; border = '#81c784'; icon = '🧪'; }
        if (type === 'BREAK') { bg = '#fff3e0'; border = '#ffb74d'; icon = '☕'; }
        
        // Status styling
        if (isCurrent) {
            bg = '#e8f5e9';
            border = '#4caf50';
        } else if (isPast) {
            bg = '#f5f5f5';
            border = '#ccc';
        }
        
        html += `
            <div style="border: 1px solid ${border}; border-radius: 8px; background: ${bg}; margin-bottom: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Main class info -->
                <div style="padding: 12px 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                            <div style="width: 40px; height: 40px; background: ${type === 'LAB' ? '#4caf50' : (type === 'BREAK' ? '#ff9800' : '#2196f3')}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                                ${icon}
                            </div>
                            <div style="flex: 1;">
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                                    <span style="font-weight: 600; color: #333; font-size: 16px;">${item.subject || 'Free Period'}</span>
                                    ${isMarkedComplete ? '<span style="color: #4caf50; font-size: 14px;">✅</span>' : ''}
                                    ${isBookmarked ? '<span style="color: #ff9800; font-size: 14px;">⭐</span>' : ''}
                                    ${classPriority !== 'Medium' ? `<span style="color: ${classPriority === 'Critical' ? '#dc3545' : classPriority === 'High' ? '#fd7e14' : '#28a745'}; font-size: 12px; background: ${classPriority === 'Critical' ? '#dc354520' : classPriority === 'High' ? '#fd7e1420' : '#28a74520'}; padding: 2px 6px; border-radius: 10px;">🔥 ${classPriority}</span>` : ''}
                                </div>
                                <div style="font-size: 12px; color: #666; margin-bottom: 2px;">
                                    <strong>${item.time}</strong> • Room: ${item.room || 'TBD'} • Code: ${item.code || 'N/A'}
                                    ${attendanceCount > 0 ? ` • ${attendanceCount} attended` : ''}
                                </div>
                                ${classNotes ? `<div style="font-size: 11px; color: #888; background: #f8f9fa; padding: 4px 8px; border-radius: 4px; margin-top: 4px;">📝 ${classNotes}</div>` : ''}
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: end; gap: 4px;">
                            ${isCurrent ? '<span style="background: #4caf50; color: white; padding: 2px 6px; border-radius: 12px; font-size: 10px; font-weight: bold;">🟢 LIVE</span>' : ''}
                            ${isPast ? '<span style="background: #666; color: white; padding: 2px 6px; border-radius: 12px; font-size: 10px; font-weight: bold;">✅ DONE</span>' : ''}
                            ${!isCurrent && !isPast && selectedDay === getTodayDayName() ? '<span style="background: #2196f3; color: white; padding: 2px 6px; border-radius: 12px; font-size: 10px; font-weight: bold;">⏰ UPCOMING</span>' : ''}
                            ${selectedDay !== getTodayDayName() ? '<span style="background: #9c27b0; color: white; padding: 2px 6px; border-radius: 12px; font-size: 10px; font-weight: bold;">📅 PLANNED</span>' : ''}
                        </div>
                    </div>
                </div>
                
                <!-- Action buttons for classes (not breaks) -->
                ${!isBreak && item.subject ? `
                    <div style="border-top: 1px solid #eee; padding: 8px 15px; background: #f8f9fa; display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
                        <button onclick="toggleRecTeacherStatus('${item.code}', '${selectedDay}')" style="padding: 4px 8px; background: ${isMarkedComplete ? '#4caf50' : '#2196f3'}; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            ${isMarkedComplete ? '✅ Taught' : '📚 Mark Taught'}
                        </button>
                        <button onclick="toggleRecBookmark('${item.code}', '${selectedDay}')" style="padding: 4px 8px; background: ${isBookmarked ? '#ff9800' : '#607d8b'}; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            ${isBookmarked ? '⭐ Starred' : '⭐ Star'}
                        </button>
                        <button onclick="setRecClassPriority('${item.code}', '${selectedDay}')" style="padding: 4px 8px; background: #9c27b0; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            🔥 Priority
                        </button>
                        <button onclick="addRecScheduleNote('${item.code}', '${selectedDay}')" style="padding: 4px 8px; background: #6f42c1; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            📝 ${classNotes ? 'Edit Note' : 'Add Note'}
                        </button>
                        <button onclick="showRecClassDetails('${item.code}', '${selectedDay}')" style="padding: 4px 8px; background: #17a2b8; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            ℹ️ Details
                        </button>
                        <button onclick="editRecClassDetails('${item.code}', '${selectedDay}')" style="padding: 4px 8px; background: #607d8b; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            ⚙️ Edit
                        </button>
                        ${selectedDay === getTodayDayName() && (isCurrent || isPast) ? `
                            <button onclick="viewRecClassAttendance('${item.code}')" style="padding: 4px 8px; background: #ff9800; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                👥 Attendance (${attendanceCount})
                            </button>
                            <button onclick="syncToClassAttendance('${item.code}')" style="padding: 4px 8px; background: #673ab7; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                🔗 View in Attendance
                            </button>
                        ` : ''}
                        ${selectedDay === getTodayDayName() && isCurrent ? `
                            <button onclick="generateQuickQR('${item.code}')" style="padding: 4px 8px; background: #e91e63; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                📱 Quick QR
                            </button>
                        ` : ''}
                        <button onclick="scheduleRecClassReminder('${item.code}', '${selectedDay}')" style="padding: 4px 8px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            ⏰ Reminder
                        </button>
                        <button onclick="duplicateRecClass('${item.code}', '${selectedDay}')" style="padding: 4px 8px; background: #795548; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            📋 Duplicate
                        </button>
                        <button onclick="deleteRecClass('${item.code}', '${selectedDay}', ${index})" style="padding: 4px 8px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            🗑️ Delete
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    });
    
    recDiv.innerHTML = html;
    updateRecommendedSummary(items, selectedDay);
}

// Update summary with enhanced stats
function updateRecommendedSummary(items, selectedDay) {
    const summary = document.getElementById('teacherRecSummary');
    if (!summary) return;
    
    const counts = {
        total: items.length,
        labs: items.filter(it => /LAB/i.test(it.subject) || it.code === 'LAB').length,
        breaks: items.filter(it => it.code === 'BREAK' || it.code === 'LUNCH').length,
        completed: items.filter(it => isClassMarkedComplete(it.code, selectedDay)).length,
        bookmarked: items.filter(it => isClassBookmarked(it.code, selectedDay)).length,
        withNotes: items.filter(it => getRecScheduleNotes(it.code, selectedDay)).length,
        highPriority: items.filter(it => ['High', 'Critical'].includes(getRecClassPriority(it.code, selectedDay))).length
    };
    
    const completionRate = counts.total > 0 ? Math.round((counts.completed / counts.total) * 100) : 0;
    
    summary.innerHTML = `
        <div style="display: flex; gap: 15px; flex-wrap: wrap; align-items: center;">
            <span><strong>Total:</strong> ${counts.total}</span>
            <span><strong>Labs:</strong> ${counts.labs}</span>
            <span><strong>Breaks:</strong> ${counts.breaks}</span>
            <span><strong>Completed:</strong> ${counts.completed}/${counts.total} (${completionRate}%)</span>
            <span><strong>⭐ Starred:</strong> ${counts.bookmarked}</span>
            <span><strong>📝 With Notes:</strong> ${counts.withNotes}</span>
            <span><strong>🔥 High Priority:</strong> ${counts.highPriority}</span>
        </div>
    `;
}

// Display quiz activities only in learning activities section
function displayQuizActivities() {
    console.log('displayQuizActivities() called');
    const activityDiv = document.getElementById('directActivitiesContent');
    
    if (!activityDiv) {
        console.error('Direct activities div not found');
        return;
    }
    
    console.log('Loading quiz activities...');
    activityDiv.innerHTML = '';

    // Get only quiz files from quiz folder
    const quizActivities = [
        {
            title: "🌐 Computer Networks Quiz",
            description: "Test your networking knowledge with comprehensive questions",
            link: "quiz/computerNetworksQuiz.html",
            category: "Quiz",
            subject: "CN",
            duration: "15 min",
            difficulty: "Medium"
        },
        {
            title: "📊 Fundamental Management Quiz", 
            description: "Assess your understanding of management principles",
            link: "quiz/fundamentalManagementQuiz.html",
            category: "Quiz",
            subject: "FM", 
            duration: "12 min",
            difficulty: "Easy"
        },
        {
            title: "📈 Marketing Management Quiz",
            description: "Evaluate your marketing strategy knowledge",
            link: "quiz/marketingManagementQuiz.html", 
            category: "Quiz",
            subject: "MM",
            duration: "18 min",
            difficulty: "Medium"
        },
        {
            title: "🔬 Research Methodology Quiz",
            description: "Challenge your research and IPR understanding",
            link: "quiz/researchMethodologyAndIPRQuiz.html",
            category: "Quiz", 
            subject: "RMIPR",
            duration: "20 min",
            difficulty: "Hard"
        },
        {
            title: "🤖 AI/ML Research Papers",
            description: "Explore cutting-edge AI and ML research",
            link: "quiz/aiMlResearchPapers.html",
            category: "Research",
            subject: "AI",
            duration: "25 min", 
            difficulty: "Advanced"
        }
    ];

    console.log('Total quiz activities:', quizActivities.length);

    quizActivities.forEach((activity, index) => {
        console.log(`Creating quiz activity ${index + 1}:`, activity.title);
        const div = document.createElement('div');
        div.style.cssText = 'margin-bottom: 12px;';

        // Purple gradient for all quiz activities
        div.innerHTML = `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 8px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div style="flex: 1;">
                        <div style="font-weight: bold; font-size: 16px;">${activity.title}</div>
                        <div style="font-size: 12px; opacity: 0.9;">${activity.category} • ${activity.difficulty} • ${activity.duration}</div>
                    </div>
                </div>
                <div style="font-size: 14px; margin-bottom: 12px; opacity: 0.9;">${activity.description}</div>
                <button onclick="openActivityLink('${activity.link}', '${activity.title}')" 
                        style="width: 100%; padding: 10px; background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500;">
                    📝 Start Quiz
                </button>
            </div>
        `;
        
        activityDiv.appendChild(div);
        console.log(`Quiz activity ${index + 1} added to DOM`);
    });
    
    console.log('✅ displayQuizActivities() completed successfully');
}

// Display activity suggestions (original function for recommended activities)
function displayActivities() {
    console.log('displayActivities() called');
    const activityDiv = document.getElementById('activitySuggestions');
    
    if (!activityDiv) {
        console.error('Activity suggestions div not found');
        alert('Error: Activity suggestions div not found');
        return;
    }
    
    console.log('Activity div found, clearing content...');
    activityDiv.innerHTML = '';

    // Add header message
    const headerDiv = document.createElement('div');
    headerDiv.innerHTML = '<p style="color: #666; margin-bottom: 15px;">📚 Recommended activities for productive learning:</p>';
    activityDiv.appendChild(headerDiv);

    // Get all quiz files from quiz folder
    const quizFiles = [
        {
            title: "🌐 Computer Networks Quiz",
            description: "Test your networking knowledge with comprehensive questions",
            link: "quiz/computerNetworksQuiz.html",
            category: "Quiz",
            subject: "CN",
            duration: "15 min",
            difficulty: "Medium"
        },
        {
            title: "📊 Fundamental Management Quiz", 
            description: "Assess your understanding of management principles",
            link: "quiz/fundamentalManagementQuiz.html",
            category: "Quiz",
            subject: "FM", 
            duration: "12 min",
            difficulty: "Easy"
        },
        {
            title: "📈 Marketing Management Quiz",
            description: "Evaluate your marketing strategy knowledge",
            link: "quiz/marketingManagementQuiz.html", 
            category: "Quiz",
            subject: "MM",
            duration: "18 min",
            difficulty: "Medium"
        },
        {
            title: "🔬 Research Methodology Quiz",
            description: "Challenge your research and IPR understanding",
            link: "quiz/researchMethodologyAndIPRQuiz.html",
            category: "Quiz", 
            subject: "RMIPR",
            duration: "20 min",
            difficulty: "Hard"
        },
        {
            title: "🤖 AI/ML Research Papers",
            description: "Explore cutting-edge AI and ML research",
            link: "quiz/aiMlResearchPapers.html",
            category: "Research",
            subject: "AI",
            duration: "25 min", 
            difficulty: "Advanced"
        }
    ];

    // Get all explore_more files
    const exploreMoreFiles = [
        {
            title: "🐍 Python Programming Practice",
            description: "Complete coding challenges and improve your Python skills",
            link: "explore_more/pythonProgramming.html",
            category: "Programming",
            duration: "30-45 min",
            difficulty: "Intermediate"
        },
        {
            title: "🎯 Career Planning Workshop", 
            description: "Plan your career path and build professional skills",
            link: "explore_more/careerPlanning.html",
            category: "Career",
            duration: "30 min",
            difficulty: "Easy"
        },
        {
            title: "🧮 Math Problem Solving",
            description: "Practice mathematical concepts and problem-solving",
            link: "explore_more/mathProblemSolving.html", 
            category: "Academic",
            duration: "45 min",
            difficulty: "Medium"
        },
        {
            title: "💡 Project Brainstorming",
            description: "Generate innovative project ideas and concepts",
            link: "explore_more/projectBrainstorming.html",
            category: "Creative", 
            duration: "30-60 min",
            difficulty: "Easy"
        },
        {
            title: "🏃 Physical Activity Guide",
            description: "Maintain wellness with guided physical exercises",
            link: "explore_more/physicalActivity.html",
            category: "Wellness",
            duration: "15-20 min", 
            difficulty: "Easy"
        }
    ];

    // Combine all activities
    const allAvailableActivities = [...quizFiles, ...exploreMoreFiles];
    console.log('Total available activities:', allAvailableActivities.length);
    
    // Randomly select 4 activities (mix of quizzes and explore_more)
    const selectedActivities = allAvailableActivities.sort(() => 0.5 - Math.random()).slice(0, 4);
    console.log('Selected activities:', selectedActivities.length);

    selectedActivities.forEach((activity, index) => {
        console.log(`Creating activity ${index + 1}:`, activity.title);
        const div = document.createElement('div');
        div.className = 'activity-item';
        let activityContent = `
            <div class="activity-title">${activity.title}</div>
            <div class="activity-desc">${activity.description}</div>
            <div class="activity-time">⏱️ ${activity.duration}</div>
        `;

        // Enhanced styling based on category
        if (activity.category === 'Quiz' || activity.category === 'Research') {
            // Quiz and Research activities - Purple gradient
            div.innerHTML = `
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <div style="flex: 1;">
                            <div style="font-weight: bold; font-size: 16px;">${activity.title}</div>
                            <div style="font-size: 12px; opacity: 0.9;">${activity.category} • ${activity.difficulty} • ${activity.duration}</div>
                        </div>
                    </div>
                    <div style="font-size: 14px; margin-bottom: 12px; opacity: 0.9;">${activity.description}</div>
                    <button onclick="openActivityLink('${activity.link}', '${activity.title}')" 
                            style="width: 100%; padding: 10px; background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500;">
                        📝 Start ${activity.category}
                    </button>
                </div>
            `;
        } else if (activity.category === 'Programming') {
            // Programming activities - Green gradient
            div.innerHTML = `
                <div style="background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%); color: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);">
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <div style="flex: 1;">
                            <div style="font-weight: bold; font-size: 16px;">${activity.title}</div>
                            <div style="font-size: 12px; opacity: 0.9;">${activity.category} • ${activity.difficulty} • ${activity.duration}</div>
                        </div>
                    </div>
                    <div style="font-size: 14px; margin-bottom: 12px; opacity: 0.9;">${activity.description}</div>
                    <button onclick="openActivityLink('${activity.link}', '${activity.title}')" 
                            style="width: 100%; padding: 10px; background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500;">
                        🐍 Start Coding
                    </button>
                </div>
            `;
        } else if (activity.category === 'Career') {
            // Career activities - Orange gradient
            div.innerHTML = `
                <div style="background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); color: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);">
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <div style="flex: 1;">
                            <div style="font-weight: bold; font-size: 16px;">${activity.title}</div>
                            <div style="font-size: 12px; opacity: 0.9;">${activity.category} • ${activity.difficulty} • ${activity.duration}</div>
                        </div>
                    </div>
                    <div style="font-size: 14px; margin-bottom: 12px; opacity: 0.9;">${activity.description}</div>
                    <button onclick="openActivityLink('${activity.link}', '${activity.title}')" 
                            style="width: 100%; padding: 10px; background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500;">
                        🎯 Plan Career
                    </button>
                </div>
            `;
        } else {
            // Other activities - Blue gradient
            div.innerHTML = `
                <div style="background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%); color: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);">
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <div style="flex: 1;">
                            <div style="font-weight: bold; font-size: 16px;">${activity.title}</div>
                            <div style="font-size: 12px; opacity: 0.9;">${activity.category} • ${activity.difficulty} • ${activity.duration}</div>
                        </div>
                    </div>
                    <div style="font-size: 14px; margin-bottom: 12px; opacity: 0.9;">${activity.description}</div>
                    <button onclick="openActivityLink('${activity.link}', '${activity.title}')" 
                            style="width: 100%; padding: 10px; background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500;">
                        🚀 Start Activity
                    </button>
                </div>
            `;
        }
        
        activityDiv.appendChild(div);
        console.log(`Activity ${index + 1} added to DOM`);
    });
    
    console.log('✅ displayActivities() completed successfully');
    
    // Show success message
    setTimeout(() => {
        showAttendanceStatus('✅ Activities loaded successfully!', 'success');
    }, 500);
}

// Function to open activity links (quiz folder and explore_more folder files)
function openActivityLink(link, title) {
    // Track activity access
    const activityAccess = {
        link: link,
        title: title,
        timestamp: new Date().toISOString(),
        user: currentUser?.id || 'guest'
    };
    
    // Store activity access
    const activityHistory = JSON.parse(localStorage.getItem('activityHistory') || '[]');
    activityHistory.push(activityAccess);
    localStorage.setItem('activityHistory', JSON.stringify(activityHistory));
    
    // Show loading message
    showAttendanceStatus(`🚀 Opening ${title}...`, 'info');
    
    // Open activity in new tab
    window.open(link, '_blank');
    
    // Update productivity tracker and show success
    setTimeout(() => {
        displayProductivityTracker();
        showAttendanceStatus(`✅ ${title} opened successfully!`, 'success');
    }, 1000);
    
    // Log activity completion for productivity tracking
    const activityLog = JSON.parse(localStorage.getItem('activityLog') || '[]');
    activityLog.push({
        activity: title,
        timestamp: new Date().toISOString(),
        user: currentUser?.id || 'guest',
        type: 'started'
    });
    localStorage.setItem('activityLog', JSON.stringify(activityLog));
}

// Function to start a quiz
function startQuiz(quizId, quizLink) {
    // Track quiz attempt
    const quizAttempt = {
        quizId: quizId,
        timestamp: new Date().toISOString(),
        user: currentUser?.id || 'guest'
    };
    
    // Store quiz attempt
    const quizAttempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
    quizAttempts.push(quizAttempt);
    localStorage.setItem('quizAttempts', JSON.stringify(quizAttempts));
    
    // Show loading message
    showAttendanceStatus('📝 Opening quiz...', 'info');
    
    // Open quiz in new tab
    window.open(quizLink, '_blank');
    
    // Update productivity tracker
    setTimeout(() => {
        displayProductivityTracker();
        showAttendanceStatus('✅ Quiz opened! Good luck!', 'success');
    }, 1000);
}

// Function to explore more content related to quiz subject
function exploreQuizContent(subject, quizTitle) {
    // Create explore more content based on subject
    const exploreContent = getExploreContentForSubject(subject);
    
    // Show modal with explore content
    showExploreModal(subject, quizTitle, exploreContent);
}

// Get explore content for specific subject
function getExploreContentForSubject(subject) {
    const contentMap = {
        'CN': {
            title: 'Computer Networks Resources',
            icon: '🌐',
            resources: [
                { title: 'OSI Model Interactive Guide', link: 'https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/', type: 'Article' },
                { title: 'TCP/IP Protocol Suite', link: 'https://www.geeksforgeeks.org/tcp-ip-model/', type: 'Tutorial' },
                { title: 'Network Security Fundamentals', link: 'https://www.cisco.com/c/en/us/products/security/what-is-network-security.html', type: 'Guide' },
                { title: 'Subnetting Practice', link: 'https://subnettingpractice.com/', type: 'Practice' }
            ]
        },
        'FM': {
            title: 'Financial Management Resources',
            icon: '📊',
            resources: [
                { title: 'Financial Statement Analysis', link: 'https://www.investopedia.com/terms/f/financial-statement-analysis.asp', type: 'Article' },
                { title: 'Capital Budgeting Techniques', link: 'https://www.wallstreetmojo.com/capital-budgeting/', type: 'Tutorial' },
                { title: 'Working Capital Management', link: 'https://www.investopedia.com/terms/w/workingcapital.asp', type: 'Guide' },
                { title: 'Financial Calculator', link: 'https://www.calculator.net/finance-calculator.html', type: 'Tool' }
            ]
        },
        'RMIPR': {
            title: 'Research Methodology Resources',
            icon: '🔬',
            resources: [
                { title: 'Research Design Methods', link: 'https://www.scribbr.com/methodology/research-design/', type: 'Article' },
                { title: 'Data Collection Techniques', link: 'https://www.questionpro.com/blog/data-collection-methods/', type: 'Tutorial' },
                { title: 'Statistical Analysis Guide', link: 'https://www.statisticshowto.com/', type: 'Guide' },
                { title: 'Citation Generator', link: 'https://www.citationmachine.net/', type: 'Tool' }
            ]
        },
        'TOC': {
            title: 'Theory of Computation Resources',
            icon: '🧮',
            resources: [
                { title: 'Finite Automata Tutorial', link: 'https://www.geeksforgeeks.org/introduction-of-finite-automata/', type: 'Tutorial' },
                { title: 'Regular Expressions Guide', link: 'https://regexr.com/', type: 'Interactive' },
                { title: 'Turing Machine Simulator', link: 'https://turingmachinesimulator.com/', type: 'Simulator' },
                { title: 'Complexity Theory Basics', link: 'https://www.khanacademy.org/computing/computer-science/algorithms', type: 'Course' }
            ]
        }
    };
    
    return contentMap[subject] || {
        title: 'General Learning Resources',
        icon: '📚',
        resources: [
            { title: 'Khan Academy', link: 'https://www.khanacademy.org/', type: 'Course' },
            { title: 'Coursera', link: 'https://www.coursera.org/', type: 'Platform' },
            { title: 'edX', link: 'https://www.edx.org/', type: 'Platform' }
        ]
    };
}

// Show explore modal with related content
function showExploreModal(subject, quizTitle, content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.8); z-index: 10000; display: flex; 
        align-items: center; justify-content: center;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 25px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <span style="font-size: 32px; margin-right: 15px;">${content.icon}</span>
                <div>
                    <h2 style="margin: 0; color: #333;">${content.title}</h2>
                    <p style="margin: 5px 0 0; color: #666;">Related to: ${quizTitle}</p>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                ${content.resources.map(resource => `
                    <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin-bottom: 8px; border-left: 4px solid #2196f3;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-weight: bold; margin-bottom: 2px;">${resource.title}</div>
                                <div style="font-size: 12px; color: #666;">Type: ${resource.type}</div>
                            </div>
                            <button onclick="window.open('${resource.link}', '_blank')" 
                                    style="padding: 6px 12px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                                🔗 Open
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <div style="font-weight: bold; color: #1976d2; margin-bottom: 5px;">💡 Study Tip</div>
                <div style="color: #666; font-size: 14px;">
                    Review these resources before taking the quiz to improve your understanding and performance!
                </div>
            </div>
            
            <div style="text-align: center;">
                <button onclick="this.closest('div').parentElement.remove()" 
                        style="padding: 10px 20px; background: #4caf50; color: white; border: none; border-radius: 6px; cursor: pointer; margin-right: 10px;">
                    📚 Continue Learning
                </button>
                <button onclick="this.closest('div').parentElement.remove()" 
                        style="padding: 10px 20px; background: #f44336; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    ✕ Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Track explore action
    const exploreAction = {
        subject: subject,
        quizTitle: quizTitle,
        timestamp: new Date().toISOString(),
        user: currentUser?.id || 'guest'
    };
    
    const exploreHistory = JSON.parse(localStorage.getItem('exploreHistory') || '[]');
    exploreHistory.push(exploreAction);
    localStorage.setItem('exploreHistory', JSON.stringify(exploreHistory));
}

// Manual quiz loading function as fallback
function loadQuizzesManually() {
    const quizList = document.getElementById("quizList");
    if (!quizList) return;
    
    quizList.innerHTML = ""; // Clear old content

    const quizzes = [
        { id: 1, title: "📊 Fundamental Management Quiz", link: "quiz/fundamentalManagementQuiz.html" },
        { id: 2, title: "🌐 Computer Networks Quiz", link: "quiz/computerNetworksQuiz.html" },
        { id: 3, title: "📈 Marketing Management Quiz", link: "quiz/marketingManagementQuiz.html" },
        { id: 4, title: "🔬 Research Methodology and IPR Quiz", link: "quiz/researchMethodologyAndIPRQuiz.html" },
        { id: 5, title: "🤖 AI/ML Research Papers", link: "quiz/aiMlResearchPapers.html" }
    ];

    quizzes.forEach(quiz => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${quiz.link}" target="_blank" style="text-decoration: none; color: #2196f3; font-weight: 500;">${quiz.title}</a>`;
        li.style.cssText = "margin-bottom: 8px; padding: 8px; background: #f8f9fa; border-radius: 4px; border-left: 3px solid #2196f3;";
        quizList.appendChild(li);
    });
}

// Display explore_more folder files in their dedicated section
function displayLinkedActivities() {
    const linkedActivitiesList = document.getElementById("linkedActivitiesList");
    if (!linkedActivitiesList) return; // Ensure the element exists

    linkedActivitiesList.innerHTML = ""; // Clear old content

    // Files from explore_more folder
    const exploreMoreFiles = [
        { title: "🐍 Python Programming Practice", link: "explore_more/pythonProgramming.html" },
        { title: "🎯 Career Planning Workshop", link: "explore_more/careerPlanning.html" },
        { title: "🧮 Math Problem Solving", link: "explore_more/mathProblemSolving.html" },
        { title: "💡 Project Brainstorming", link: "explore_more/projectBrainstorming.html" },
        { title: "🏃 Physical Activity Guide", link: "explore_more/physicalActivity.html" }
    ];

    exploreMoreFiles.forEach(activity => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${activity.link}" target="_blank" style="text-decoration: none; color: #4caf50; font-weight: 500;">${activity.title}</a>`;
        li.style.cssText = "margin-bottom: 8px; padding: 8px; background: #f8f9fa; border-radius: 4px; border-left: 3px solid #4caf50;";
        linkedActivitiesList.appendChild(li);
    });
}

// Start an activity
function startActivity(activity) {
    if (confirm(`Start activity: ${activity.title}?`)) {
        alert(`Great! You've started: ${activity.title}\n\nRemember to:\n- Focus for ${activity.duration}\n- Take notes if needed\n- Track your progress`);
        
        // Log activity
        const activityLog = JSON.parse(localStorage.getItem('activityLog') || '[]');
        activityLog.push({
            activity: activity.title,
            timestamp: new Date().toISOString(),
            user: currentUser.id,
            category: activity.category,
            duration: activity.duration
        });
        localStorage.setItem('activityLog', JSON.stringify(activityLog));
        
        // Refresh productivity tracker
        displayProductivityTracker();
        
        // Show success notification
        showProductivityNotification('+10 Productivity Points! Keep going!');
    }
}

// Show productivity notification
function showProductivityNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-size: 14px;
        font-weight: bold;
    `;
    notification.textContent = '🎆 ' + message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Mark attendance
function markAttendance() {
    const qrCode = document.getElementById('qrCodeInput').value;
    
    if (!qrCode) {
        showAttendanceStatus('Please enter class code', 'error');
        return;
    }
    
    // Validate QR code format (should contain class code and timestamp)
    const validCodes = ['CS101', 'MATH201', 'PHY301', 'ENG101'];
    const parts = qrCode.split('-');
    const classCode = parts[0];
    const codeTimestamp = parts[1] ? parseInt(parts[1]) : 0;
    
    if (!validCodes.includes(classCode)) {
        showAttendanceStatus('Invalid class code', 'error');
        return;
    }
    
    // Check if code has expired (2 minutes = 120000 milliseconds)
    const now = Date.now();
    const codeAge = now - codeTimestamp;
    
    if (codeTimestamp && codeAge > 120000) {
        showAttendanceStatus('⚠️ Code has expired! Ask teacher for a new QR code', 'error');
        return;
    }
    
    // Save attendance
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData'));
    const today = new Date().toDateString();
    
    if (!attendanceData[currentUser.id]) {
        attendanceData[currentUser.id] = {};
    }
    
    if (!attendanceData[currentUser.id][today]) {
        attendanceData[currentUser.id][today] = [];
    }
    
    // Check if already marked
    if (attendanceData[currentUser.id][today].includes(classCode)) {
        showAttendanceStatus('Attendance already marked for this class', 'error');
        return;
    }
    
    attendanceData[currentUser.id][today].push(classCode);
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));

    // Record scanned attendance per class for teacher view (legacy)
    try {
        const scannedStore = JSON.parse(localStorage.getItem('scannedAttendance') || '{}');
        if (!scannedStore[today]) scannedStore[today] = {};
        if (!scannedStore[today][classCode]) scannedStore[today][classCode] = [];

        // Avoid duplicate entry for the same student & class on the same day
        const already = scannedStore[today][classCode].some(r => r.studentId === currentUser.id);
        if (!already) {
            scannedStore[today][classCode].push({
                studentId: currentUser.id,
                name: currentUser.name || (getStudentDetails(currentUser.id)?.name) || currentUser.id,
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString()
            });
            localStorage.setItem('scannedAttendance', JSON.stringify(scannedStore));
        }
    } catch (e) {
        console.warn('Failed to record scanned attendance', e);
    }

    // Record in advanced attendance system
    try {
        const studentData = {
            studentId: currentUser.id,
            name: currentUser.name || (getStudentDetails(currentUser.id)?.name) || currentUser.id
        };
        
        const classInfo = {
            code: classCode,
            subject: getSubjectFromClassCode(classCode),
            room: getRoomFromClassCode(classCode)
        };
        
        attendanceManager.recordAttendance(studentData, classInfo);
    } catch (e) {
        console.warn('Failed to record in advanced system', e);
    }
    
    showAttendanceStatus(`✅ Attendance marked for ${classCode}`, 'success');
    document.getElementById('qrCodeInput').value = '';
    
    // Refresh attendance history
    displayAttendanceHistory();
}

// Show attendance status
function showAttendanceStatus(message, type) {
    const statusDiv = document.getElementById('attendanceStatus');
    statusDiv.className = type;
    statusDiv.textContent = message;
    statusDiv.style.display = 'block';
    
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

// Display attendance history
function displayAttendanceHistory() {
    const historyDiv = document.getElementById('attendanceHistory');
    
    if (!historyDiv) {
        console.error('Attendance history div not found');
        return;
    }
    
    // Subject-wise attendance data (sample data - in real app, calculate from actual records)
    const subjects = [
        { 
            name: 'Computer Science',
            code: 'CS101',
            totalClasses: 30,
            attended: 27,
            lastClass: 'Present',
            professor: 'Dr. Sharma'
        },
        { 
            name: 'Mathematics',
            code: 'MATH201',
            totalClasses: 28,
            attended: 25,
            lastClass: 'Present',
            professor: 'Prof. Gupta'
        },
        { 
            name: 'Physics',
            code: 'PHY301',
            totalClasses: 25,
            attended: 18,
            lastClass: 'Absent',
            professor: 'Dr. Kumar'
        },
        { 
            name: 'English',
            code: 'ENG101',
            totalClasses: 20,
            attended: 19,
            lastClass: 'Present',
            professor: 'Ms. Singh'
        },
        { 
            name: 'Data Structures',
            code: 'DS202',
            totalClasses: 32,
            attended: 30,
            lastClass: 'Present',
            professor: 'Dr. Patel'
        }
    ];
    
    // Calculate overall statistics
    const totalClasses = subjects.reduce((sum, s) => sum + s.totalClasses, 0);
    const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
    const overallPercentage = Math.round((totalAttended / totalClasses) * 100);
    
    historyDiv.innerHTML = `
        <!-- Overall Stats -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-around; align-items: center;">
                <div style="text-align: center;">
                    <div style="font-size: 28px; font-weight: bold;">${overallPercentage}%</div>
                    <div style="font-size: 11px; opacity: 0.9;">Overall Attendance</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 24px; font-weight: bold;">${totalAttended}</div>
                    <div style="font-size: 11px; opacity: 0.9;">Classes Attended</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 24px; font-weight: bold;">${totalClasses}</div>
                    <div style="font-size: 11px; opacity: 0.9;">Total Classes</div>
                </div>
            </div>
            <div style="margin-top: 12px;">
                <div style="background: rgba(255,255,255,0.2); border-radius: 5px; height: 8px; overflow: hidden;">
                    <div style="background: white; height: 100%; width: ${overallPercentage}%; transition: width 1s ease;"></div>
                </div>
            </div>
        </div>
        
        <!-- Subject-wise Attendance -->
        <div style="margin-bottom: 10px;">
            <h4 style="font-size: 14px; color: #333; margin-bottom: 10px;">📚 Subject-wise Attendance</h4>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 12px;">
    `;
    
    // Add each subject card
    subjects.forEach(subject => {
        const percentage = Math.round((subject.attended / subject.totalClasses) * 100);
        const barColor = percentage >= 75 ? '#4caf50' : percentage >= 60 ? '#ffc107' : '#f44336';
        const statusColor = percentage >= 75 ? '#d4edda' : percentage >= 60 ? '#fff3cd' : '#f8d7da';
        const textColor = percentage >= 75 ? '#155724' : percentage >= 60 ? '#856404' : '#721c24';
        
        historyDiv.innerHTML += `
            <div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; 
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: transform 0.2s;"
                 onmouseover="this.style.transform='translateY(-2px)'"
                 onmouseout="this.style.transform='translateY(0)'">
                
                <!-- Subject Header -->
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                    <div>
                        <div style="font-weight: bold; color: #333; font-size: 14px;">${subject.name}</div>
                        <div style="color: #666; font-size: 11px; margin-top: 2px;">
                            ${subject.code} • ${subject.professor}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <span style="display: inline-block; padding: 3px 8px; border-radius: 4px; 
                                     font-size: 11px; font-weight: bold;
                                     background: ${subject.lastClass === 'Present' ? '#d4edda' : '#f8d7da'};
                                     color: ${subject.lastClass === 'Present' ? '#155724' : '#721c24'};">
                            ${subject.lastClass === 'Present' ? '✓' : '✗'} Last Class
                        </span>
                    </div>
                </div>
                
                <!-- Attendance Bar -->
                <div style="margin: 8px 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                        <span style="font-size: 11px; color: #666;">Attendance Progress</span>
                        <span style="font-size: 12px; font-weight: bold; color: ${barColor};">${percentage}%</span>
                    </div>
                    <div style="background: #e0e0e0; border-radius: 8px; height: 20px; overflow: hidden; position: relative;">
                        <div style="background: ${barColor}; height: 100%; width: ${percentage}%; 
                                    border-radius: 8px; transition: width 0.8s ease;
                                    display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-size: 11px; font-weight: bold; position: absolute; 
                                         left: 50%; transform: translateX(-50%);">
                                ${subject.attended}/${subject.totalClasses}
                            </span>
                        </div>
                    </div>
                </div>
                
                <!-- Stats Row -->
                <div style="display: flex; justify-content: space-between; margin-top: 8px; padding-top: 8px; 
                            border-top: 1px solid #f0f0f0; font-size: 11px;">
                    <div style="display: flex; gap: 15px;">
                        <span style="color: #4caf50;">✓ Present: <strong>${subject.attended}</strong></span>
                        <span style="color: #f44336;">✗ Absent: <strong>${subject.totalClasses - subject.attended}</strong></span>
                    </div>
                    <div>
                        <span style="padding: 2px 8px; background: ${statusColor}; color: ${textColor}; 
                                     border-radius: 10px; font-size: 10px; font-weight: bold;">
                            ${percentage >= 75 ? 'Safe' : percentage >= 60 ? 'Warning' : 'Critical'}
                        </span>
                    </div>
                </div>
            </div>
        `;
    });
    
    historyDiv.innerHTML += `
        </div>
        
        <!-- Attendance Insights -->
        <div style="margin-top: 15px; padding: 12px; background: #f8f9fa; border-radius: 8px;">
            <h4 style="font-size: 13px; color: #333; margin-bottom: 8px;">💡 Insights</h4>
            <div style="font-size: 11px; color: #666; line-height: 1.6;">
                ${overallPercentage >= 75 ? 
                    '✅ Great job! Your attendance is above the required 75% threshold.' :
                    '⚠️ Your attendance is below 75%. You need to attend more classes to meet the requirement.'}
                <br>
                ${subjects.filter(s => Math.round((s.attended/s.totalClasses)*100) < 75).length > 0 ?
                    `📍 Focus on: ${subjects.filter(s => Math.round((s.attended/s.totalClasses)*100) < 75)
                        .map(s => s.name).join(', ')}` :
                    '🌟 All subjects have good attendance. Keep it up!'}
            </div>
        </div>
    `;
}

// Generate QR Code for teachers
function generateQR() {
    const classCode = document.getElementById('classSelect').value;
    
    if (!classCode) {
        alert('Please select a class');
        return;
    }
    
    const qrDisplay = document.getElementById('qrDisplay');
    qrDisplay.innerHTML = '<div style="text-align: center; padding: 20px;">Generating QR Code...</div>';
    
    // Generate unique code with timestamp
    const timestamp = Date.now();
    const qrData = `${classCode}-${timestamp}`;
    
    // Always use the reliable online QR generator
    const qrContainer = document.createElement('div');
    qrContainer.style.cssText = 'text-align: center; padding: 20px; border: 2px solid #007bff; border-radius: 10px; background: #f8f9fa;';
    
    // Use the most reliable QR service
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(qrData)}`;
    
    qrContainer.innerHTML = `
        <div style="margin-bottom: 15px;">
            <img src="${qrImageUrl}" alt="QR Code" style="max-width: 256px; height: auto; border: 2px solid #333; display: block; margin: 0 auto;" 
                 onload="console.log('QR image loaded successfully');"
                 onerror="this.onerror=null; this.src='https://chart.googleapis.com/chart?chs=256x256&cht=qr&chl=${encodeURIComponent(qrData)}&choe=UTF-8';">
        </div>
        <div style="margin-top: 15px;">
            <p style="font-weight: bold; color: #333; margin: 5px 0;">📱 Class Code: <span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 4px; font-family: monospace;">${qrData}</span></p>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">Students can scan this QR or enter the code manually</p>
            <p style="color: #dc3545; font-size: 12px; margin: 10px 0 0 0;">⏰ This code expires in 2 minutes</p>
            <div id="countdown-timer" style="margin-top: 10px; font-size: 18px; font-weight: bold; color: #007bff;">Time remaining: 2:00</div>
        </div>
        <div style="margin-top: 15px;">
            <button onclick="copyToClipboard('${qrData}')" style="background: #28a745; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">📋 Copy Code</button>
            <button onclick="generateQR()" style="background: #6c757d; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; margin-left: 10px;">🔄 New Code</button>
        </div>
    `;
    
    qrDisplay.innerHTML = '';
    qrDisplay.appendChild(qrContainer);
    
    // Save to session
    sessionStorage.setItem('activeQR', JSON.stringify({
        code: qrData,
        class: classCode,
        timestamp: timestamp
    }));
    
    // Start countdown timer
    let timeLeft = 120; // 2 minutes in seconds
    const countdownInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timerElement = document.getElementById('countdown-timer');
        
        if (timerElement) {
            timerElement.textContent = `Time remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            // Change color as time runs out
            if (timeLeft <= 30) {
                timerElement.style.color = '#dc3545'; // Red when less than 30 seconds
            } else if (timeLeft <= 60) {
                timerElement.style.color = '#ffc107'; // Yellow when less than 1 minute
            }
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            if (timerElement) {
                timerElement.textContent = 'EXPIRED!';
                timerElement.style.color = '#dc3545';
            }
        }
    }, 1000);
    
    // Auto expire after 2 minutes (120000 milliseconds)
    setTimeout(() => {
        sessionStorage.removeItem('activeQR');
        if (qrDisplay.innerHTML.includes(qrData)) {
            const expiredMessage = document.createElement('div');
            expiredMessage.style.cssText = 'color: white; background: #dc3545; text-align: center; padding: 15px; margin-top: 10px; border-radius: 5px; font-weight: bold;';
            expiredMessage.innerHTML = '⚠️ This QR code has EXPIRED! Generate a new one.';
            qrDisplay.appendChild(expiredMessage);
            
            // Fade out the QR image
            const qrImage = qrDisplay.querySelector('img');
            if (qrImage) {
                qrImage.style.opacity = '0.3';
                qrImage.style.filter = 'grayscale(100%)';
            }
        }
    }, 120000);  // 2 minutes = 120000 milliseconds
}

// Fallback QR code display function
function showFallbackQR(qrData, qrDisplay) {
    const fallbackDiv = document.createElement('div');
    fallbackDiv.style.cssText = 'border: 2px solid #333; padding: 20px; text-align: center; background: #f9f9f9; border-radius: 8px;';
    
    // Create QR code using online API as fallback
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(qrData)}`;
    
    fallbackDiv.innerHTML = `
        <img src="${qrImageUrl}" alt="QR Code" style="max-width: 256px; height: auto; border: 1px solid #ddd;" 
             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div style="display: none; padding: 40px; background: #333; color: white; font-family: monospace; word-break: break-all;">
            QR Image Failed to Load<br><br>
            <strong>Manual Code:</strong><br>
            ${qrData}
        </div>
        <p style="margin-top: 15px; font-weight: bold; color: #333;">Class Code: ${qrData}</p>
        <p style="color: #666; font-size: 14px;">Students can scan this QR or enter the code manually</p>
        <p style="color: #f44336; font-size: 12px; margin-top: 10px;">⚠️ This code expires in 10 minutes</p>
    `;
    
    qrDisplay.appendChild(fallbackDiv);
}

// Copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert('✅ Code copied to clipboard!');
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

// Fallback copy function
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        alert('✅ Code copied to clipboard!');
    } catch (err) {
        alert('❌ Could not copy code. Please copy manually: ' + text);
    }
    
    document.body.removeChild(textArea);
}

// Test QR Library function for debugging
function testQRLibrary() {
    const qrDisplay = document.getElementById('qrDisplay');
    qrDisplay.innerHTML = '<h4>QR Library Debug Info:</h4>';
    
    // Check if QRCode is available
    if (typeof QRCode !== 'undefined') {
        qrDisplay.innerHTML += '<p style="color: green;">✅ QRCode library is loaded</p>';
        
        // Try to create a simple test QR code
        try {
            const testDiv = document.createElement('div');
            testDiv.id = 'testQR';
            qrDisplay.appendChild(testDiv);
            
            new QRCode(testDiv, {
                text: 'TEST-QR-' + Date.now(),
                width: 128,
                height: 128
            });
            
            qrDisplay.innerHTML += '<p style="color: green;">✅ Test QR code generated successfully!</p>';
        } catch (error) {
            qrDisplay.innerHTML += `<p style="color: red;">❌ QR generation failed: ${error.message}</p>`;
        }
    } else {
        qrDisplay.innerHTML += '<p style="color: red;">❌ QRCode library not found</p>';
    }
    
    // Show fallback option
    qrDisplay.innerHTML += '<p style="color: blue;">ℹ️ Fallback QR service will be used if library fails</p>';
}

// Load class attendance for teachers (scanned list for selected class)
function loadClassAttendance() {
    const attendanceView = document.getElementById('classAttendanceView');
    if (!attendanceView) return;
    const classSelect = document.getElementById('classSelect');
    const selectedClass = classSelect ? classSelect.value : '';
    const todayDateStr = new Date().toDateString();

    const scannedStore = JSON.parse(localStorage.getItem('scannedAttendance') || '{}');
    const todayRecords = scannedStore[todayDateStr] || {};
    const classRecords = selectedClass ? (todayRecords[selectedClass] || []) : [];

    // Calculate stats
    const totalScanned = classRecords.length;
    const expectedTotal = 30; // Typical class size
    const attendancePercentage = totalScanned > 0 ? Math.round((totalScanned / expectedTotal) * 100) : 0;
    const currentTime = new Date().toLocaleTimeString();

    // Build enhanced UI
    let html = '';
    
    // Header with stats
    html += `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="margin: 0; font-size: 18px;">📋 Class Attendance</h4>
                    <p style="margin: 5px 0 0; opacity: 0.9;">${new Date().toLocaleDateString()} • ${currentTime}</p>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 24px; font-weight: bold;">${totalScanned}</div>
                    <div style="font-size: 12px; opacity: 0.9;">Present</div>
                </div>
            </div>
        </div>
    `;

    // Class selector and stats
    if (!selectedClass) {
        html += `
            <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 2px dashed #dee2e6;">
                <div style="font-size: 48px; margin-bottom: 10px;">📚</div>
                <h4 style="color: #6c757d; margin: 0;">Select a Class</h4>
                <p style="color: #6c757d; margin: 5px 0 0;">Choose a class from the "Generate Attendance QR" section above to view scanned students.</p>
            </div>
        `;
    } else {
        // Class info bar
        html += `
            <div style="background: #e3f2fd; border: 1px solid #90caf9; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="color: #1976d2;">Class: ${selectedClass}</strong>
                        <span style="margin-left: 15px; color: #666;">Expected: ${expectedTotal} students</span>
                    </div>
                    <div style="display: flex; gap: 15px; align-items: center;">
                        <div style="text-align: center;">
                            <div style="font-size: 18px; font-weight: bold; color: #4caf50;">${totalScanned}</div>
                            <div style="font-size: 11px; color: #666;">Scanned</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 18px; font-weight: bold; color: ${attendancePercentage >= 75 ? '#4caf50' : attendancePercentage >= 50 ? '#ff9800' : '#f44336'};">${attendancePercentage}%</div>
                            <div style="font-size: 11px; color: #666;">Rate</div>
                        </div>
                    </div>
                </div>
                <!-- Progress bar -->
                <div style="background: #e0e0e0; border-radius: 10px; height: 8px; margin-top: 10px; overflow: hidden;">
                    <div style="background: ${attendancePercentage >= 75 ? '#4caf50' : attendancePercentage >= 50 ? '#ff9800' : '#f44336'}; height: 100%; width: ${attendancePercentage}%; border-radius: 10px; transition: width 0.5s ease;"></div>
                </div>
            </div>
        `;

        if (classRecords.length === 0) {
            html += `
                <div style="text-align: center; padding: 30px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px;">
                    <div style="font-size: 48px; margin-bottom: 10px;">⏳</div>
                    <h4 style="color: #856404; margin: 0;">Waiting for Students</h4>
                    <p style="color: #856404; margin: 5px 0 0;">No students have scanned the QR code for this class yet.</p>
                    <p style="color: #856404; margin: 5px 0 0; font-size: 12px;">Make sure to generate and display the QR code for students to scan.</p>
                </div>
            `;
        } else {
            // Students list
            html += `<div style="margin-bottom: 10px;">`;
            classRecords.forEach((r, index) => {
                const timeAgo = getTimeAgo(r.time);
                const isRecent = isRecentScan(r.time);
                html += `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; border: 1px solid #eee; border-radius: 8px; background: ${isRecent ? '#e8f5e9' : '#fff'}; margin-bottom: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">
                                ${(index + 1).toString().padStart(2, '0')}
                            </div>
                            <div>
                                <div style="font-weight: 600; color: #333; font-size: 16px;">${r.name}</div>
                                <div style="font-size: 12px; color: #666;">Student ID: ${r.studentId}</div>
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                                <span style="display: inline-block; padding: 2px 6px; border-radius: 12px; font-size: 10px; font-weight: bold; color: ${isRecent ? '#155724' : '#666'}; background: ${isRecent ? '#d4edda' : '#f8f9fa'};">
                                    ${isRecent ? '🟢 RECENT' : '✅ PRESENT'}
                                </span>
                            </div>
                            <div style="font-size: 12px; color: #555; font-weight: 500;">${r.time}</div>
                            <div style="font-size: 11px; color: #888;">${timeAgo}</div>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;

            // Summary footer
            html += `
                <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 12px; text-align: center;">
                    <div style="font-size: 14px; color: #495057;">
                        <strong>${totalScanned}</strong> students scanned • Last update: ${currentTime}
                    </div>
                    <div style="font-size: 12px; color: #6c757d; margin-top: 4px;">
                        Auto-refreshes every hour • Next refresh: ${getNextRefreshTime()}
                    </div>
                </div>
            `;
        }
    }

    attendanceView.innerHTML = html;
}

// Helper function to calculate time ago
function getTimeAgo(timeString) {
    try {
        const scanTime = new Date();
        const [time, period] = timeString.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        let hour24 = hours;
        if (period === 'PM' && hours !== 12) hour24 += 12;
        if (period === 'AM' && hours === 12) hour24 = 0;
        
        scanTime.setHours(hour24, minutes, 0, 0);
        const now = new Date();
        const diffMs = now - scanTime;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        return 'Earlier today';
    } catch (e) {
        return 'Recently';
    }
}

// Helper function to check if scan is recent (within 10 minutes)
function isRecentScan(timeString) {
    try {
        const scanTime = new Date();
        const [time, period] = timeString.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        let hour24 = hours;
        if (period === 'PM' && hours !== 12) hour24 += 12;
        if (period === 'AM' && hours === 12) hour24 = 0;
        
        scanTime.setHours(hour24, minutes, 0, 0);
        const now = new Date();
        const diffMs = now - scanTime;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        
        return diffMins <= 10;
    } catch (e) {
        return false;
    }
}

// Helper function to get next refresh time
function getNextRefreshTime() {
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1, 0, 0, 0);
    return nextHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Filter attendance by section
function filterSection() {
    const selectedSection = document.getElementById('sectionSelect').value;
    const sections = document.querySelectorAll('.section-container');
    let totalStudents = 0;
    
    sections.forEach(section => {
        if (selectedSection === 'all' || section.dataset.section === selectedSection) {
            section.style.display = 'block';
            totalStudents += section.querySelectorAll('.student-card').length;
        } else {
            section.style.display = 'none';
        }
    });
    
    document.getElementById('totalStudents').textContent = totalStudents;
}

// Start QR Scanner (Real Camera using html5-qrcode)
let qrScannerInstance = null; // html5-qrcode instance (fallback)
let lastScanText = '';
let lastScanTime = 0;
let qrVideoEl = null;        // native video element for BarcodeDetector path
let qrVideoStream = null;    // MediaStream for native path
let qrDetectInterval = null; // setInterval id for native detection loop
let currentCameraFacing = 'environment'; // Track current camera
let availableCameras = []; // Store available cameras
async function startQRScanner() {
    const scannerContainer = document.getElementById('scanner-container');
    const qrCodeInput = document.getElementById('qrCodeInput');

    if (!scannerContainer) {
        showAttendanceStatus('❌ Scanner container not found', 'error');
        return;
    }

    // Show loading status
    showAttendanceStatus('🔄 Starting QR scanner...', 'info');

    // Ensure container is visible
    scannerContainer.style.display = 'block';

    // Stop any existing scanner first
    stopQRScanner();

    // If already running, do nothing
    if ((qrScannerInstance && qrScannerInstance._isScanning) || qrDetectInterval) {
        showAttendanceStatus('⚠️ Scanner already running', 'warning');
        return;
    }

    // Try to start the best available QR scanner
    try {
        if ('BarcodeDetector' in window) {
            await startOptimizedQRScanner(scannerContainer);
            showAttendanceStatus('📷 QR Scanner ready - Position QR code in frame', 'success');
        } else {
            await startBasicCameraScanner(scannerContainer);
            showAttendanceStatus('📷 Camera ready - Position QR code and enter manually', 'success');
        }
    } catch (err) {
        console.error('QR Scanner failed:', err);
        showAttendanceStatus('❌ Camera access failed. Please allow camera permission.', 'error');
        scannerContainer.style.display = 'none';
    }
}

// Optimized QR scanner with best camera selection
async function startOptimizedQRScanner(scannerContainer) {
    const detector = new BarcodeDetector({ formats: ['qr_code'] });

    // Clear container and create clean interface
    scannerContainer.innerHTML = '';
    
    // Create video element
    qrVideoEl = document.createElement('video');
    qrVideoEl.id = 'qr-video';
    qrVideoEl.setAttribute('playsinline', '');
    qrVideoEl.setAttribute('autoplay', '');
    qrVideoEl.setAttribute('muted', '');
    qrVideoEl.style.cssText = `
        width: 100%; max-width: 300px; height: auto; 
        border-radius: 8px; display: block; margin: 0 auto;
        background: #000; border: 2px solid #4caf50;
    `;

    // Create container for video with overlay
    const videoContainer = document.createElement('div');
    videoContainer.style.cssText = 'position: relative; display: inline-block;';
    
    // Add scanning overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
        width: 200px; height: 200px; border: 2px solid #4caf50; border-radius: 8px;
        pointer-events: none; z-index: 10;
    `;
    overlay.innerHTML = `
        <div style="position: absolute; top: -2px; left: -2px; width: 15px; height: 15px; border-top: 3px solid #4caf50; border-left: 3px solid #4caf50;"></div>
        <div style="position: absolute; top: -2px; right: -2px; width: 15px; height: 15px; border-top: 3px solid #4caf50; border-right: 3px solid #4caf50;"></div>
        <div style="position: absolute; bottom: -2px; left: -2px; width: 15px; height: 15px; border-bottom: 3px solid #4caf50; border-left: 3px solid #4caf50;"></div>
        <div style="position: absolute; bottom: -2px; right: -2px; width: 15px; height: 15px; border-bottom: 3px solid #4caf50; border-right: 3px solid #4caf50;"></div>
        <div style="position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #4caf50, transparent); animation: scan-line 2s linear infinite;"></div>
    `;
    
    videoContainer.appendChild(qrVideoEl);
    videoContainer.appendChild(overlay);
    scannerContainer.appendChild(videoContainer);
    
    // Add status message
    const status = document.createElement('div');
    status.style.cssText = `
        margin-top: 10px; padding: 8px; background: #e8f5e9; border-radius: 4px;
        color: #2e7d32; font-size: 14px; text-align: center;
    `;
    status.innerHTML = `
        <span style="display: inline-block; width: 8px; height: 8px; background: #4caf50; border-radius: 50%; margin-right: 8px; animation: pulse 2s infinite;"></span>
        📱 Position QR code within the frame
    `;
    scannerContainer.appendChild(status);
    
    // Add stop button
    const stopBtn = document.createElement('button');
    stopBtn.style.cssText = `
        margin-top: 10px; padding: 8px 16px; background: #f44336; color: white; 
        border: none; border-radius: 6px; cursor: pointer; display: block; margin: 10px auto 0;
    `;
    stopBtn.innerHTML = '🛑 Stop Scanner';
    stopBtn.onclick = stopQRScanner;
    scannerContainer.appendChild(stopBtn);

    // Get the best camera for QR scanning (back camera preferred)
    try {
        qrVideoStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: 'environment' }, // Back camera preferred for QR scanning
                width: { ideal: 640 },
                height: { ideal: 480 }
            },
            audio: false
        });
    } catch (err) {
        // Fallback to any available camera
        qrVideoStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });
    }

    qrVideoEl.srcObject = qrVideoStream;
    await qrVideoEl.play();

    // Start QR detection loop
    qrDetectInterval = setInterval(async () => {
        try {
            const barcodes = await detector.detect(qrVideoEl);
            if (barcodes && barcodes.length) {
                const qrCode = barcodes[0].rawValue || barcodes[0].displayValue;
                const now = Date.now();
                
                // Debounce duplicate scans
                if (qrCode === lastScanText && now - lastScanTime < 2000) return;
                lastScanText = qrCode;
                lastScanTime = now;
                
                // Fill input and process attendance
                const qrCodeInput = document.getElementById('qrCodeInput');
                if (qrCodeInput) qrCodeInput.value = qrCode;
                
                // Stop scanner and show success
                stopQRScanner();
                showAttendanceSuccessAndProcess(qrCode);
            }
        } catch (e) {
            // Ignore detection errors
        }
    }, 300);
}

// Basic camera scanner for browsers without BarcodeDetector
async function startBasicCameraScanner(scannerContainer) {
    // Clear container
    scannerContainer.innerHTML = '';
    
    // Create video element
    qrVideoEl = document.createElement('video');
    qrVideoEl.id = 'qr-video-basic';
    qrVideoEl.setAttribute('playsinline', '');
    qrVideoEl.setAttribute('autoplay', '');
    qrVideoEl.setAttribute('muted', '');
    qrVideoEl.style.cssText = `
        width: 100%; max-width: 300px; height: auto; 
        border-radius: 8px; display: block; margin: 0 auto;
        background: #000; border: 2px solid #2196f3;
    `;
    
    scannerContainer.appendChild(qrVideoEl);
    
    // Add instructions
    const instructions = document.createElement('div');
    instructions.style.cssText = `
        margin-top: 10px; padding: 8px; background: #e3f2fd; border-radius: 4px;
        color: #1976d2; font-size: 14px; text-align: center;
    `;
    instructions.innerHTML = `📱 Position QR code in view and enter the code manually below`;
    scannerContainer.appendChild(instructions);
    
    // Add stop button
    const stopBtn = document.createElement('button');
    stopBtn.style.cssText = `
        margin-top: 10px; padding: 8px 16px; background: #f44336; color: white; 
        border: none; border-radius: 6px; cursor: pointer; display: block; margin: 10px auto 0;
    `;
    stopBtn.innerHTML = '🛑 Stop Camera';
    stopBtn.onclick = stopQRScanner;
    scannerContainer.appendChild(stopBtn);

    // Get camera
    qrVideoStream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 640 },
            height: { ideal: 480 }
        },
        audio: false
    });

    qrVideoEl.srcObject = qrVideoStream;
    await qrVideoEl.play();
}

// Show attendance success and process the data
function showAttendanceSuccessAndProcess(qrCode) {
    // Show immediate success message
    showAttendanceStatus(`✅ QR Code detected: ${qrCode}`, 'success');
    
    // Process attendance after a brief delay
    setTimeout(() => {
        markAttendanceWithTeacherSync(qrCode);
    }, 500);
}

// Native BarcodeDetector implementation (legacy - keeping for compatibility)
async function startNativeBarcodeScanner(scannerContainer) {
    const detector = new BarcodeDetector({ formats: ['qr_code'] });

    // Create video element
    qrVideoEl = document.createElement('video');
    qrVideoEl.id = 'qr-video';
    qrVideoEl.setAttribute('playsinline', '');
    qrVideoEl.setAttribute('autoplay', '');
    qrVideoEl.setAttribute('muted', '');
    qrVideoEl.style.cssText = `
        width: 100%; max-width: 350px; height: auto; 
        border-radius: 8px; margin: 10px auto; display: block;
        background: #000;
    `;
    
    // Clear container and add video with controls
    scannerContainer.innerHTML = '';
    
    // Add camera video
    scannerContainer.appendChild(qrVideoEl);
    
    // Add scanning overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
        width: 250px; height: 250px; border: 2px solid #4caf50; border-radius: 8px;
        pointer-events: none; z-index: 10;
    `;
    overlay.innerHTML = `
        <div style="position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border-top: 4px solid #4caf50; border-left: 4px solid #4caf50;"></div>
        <div style="position: absolute; top: -2px; right: -2px; width: 20px; height: 20px; border-top: 4px solid #4caf50; border-right: 4px solid #4caf50;"></div>
        <div style="position: absolute; bottom: -2px; left: -2px; width: 20px; height: 20px; border-bottom: 4px solid #4caf50; border-left: 4px solid #4caf50;"></div>
        <div style="position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-bottom: 4px solid #4caf50; border-right: 4px solid #4caf50;"></div>
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #4caf50, transparent); animation: scan-line 2s linear infinite;"></div>
    `;
    
    const videoContainer = document.createElement('div');
    videoContainer.style.cssText = 'position: relative; display: inline-block;';
    videoContainer.appendChild(qrVideoEl);
    videoContainer.appendChild(overlay);
    scannerContainer.appendChild(videoContainer);
    
    // Add camera status
    const status = document.createElement('div');
    status.style.cssText = `
        margin-top: 10px; padding: 8px; background: #e8f5e9; border-radius: 4px;
        color: #2e7d32; font-size: 14px; text-align: center;
    `;
    status.innerHTML = `
        <span style="display: inline-block; width: 8px; height: 8px; background: #4caf50; border-radius: 50%; margin-right: 8px; animation: pulse 2s infinite;"></span>
        📷 Camera Active - Position QR code within the frame
    `;
    scannerContainer.appendChild(status);
    
    // Add control buttons
    const controls = document.createElement('div');
    controls.style.cssText = 'margin-top: 15px;';
    controls.innerHTML = `
        <button onclick="stopQRScanner()" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 6px; cursor: pointer; margin-right: 10px;">
            🛑 Stop Scanning
        </button>
        <button onclick="switchCamera()" style="padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 6px; cursor: pointer;">
            🔄 Switch Camera
        </button>
    `;
    scannerContainer.appendChild(controls);

    // Request camera with better constraints
    const constraints = {
        video: {
            facingMode: { ideal: currentCameraFacing },
            width: { ideal: 640 },
            height: { ideal: 480 }
        },
        audio: false
    };

    try {
        qrVideoStream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
        // Try with basic constraints if ideal fails
        qrVideoStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });
    }

    qrVideoEl.srcObject = qrVideoStream;
    await qrVideoEl.play();

    // Detection loop
    qrDetectInterval = setInterval(async () => {
        try {
            const barcodes = await detector.detect(qrVideoEl);
            if (barcodes && barcodes.length) {
                const text = barcodes[0].rawValue || barcodes[0].displayValue;
                const now = Date.now();
                if (text === lastScanText && now - lastScanTime < 1500) return;
                lastScanText = text;
                        lastScanTime = now;
                const qrCodeInput = document.getElementById('qrCodeInput');
                if (qrCodeInput) qrCodeInput.value = text;
                showAttendanceStatus('✅ QR Code detected: ' + text, 'success');
                // Auto-mark attendance and sync with teacher system
                setTimeout(() => {
                    markAttendanceWithTeacherSync(text);
                }, 1000);
            }
        } catch (e) {
            // ignore transient detection errors
        }
    }, 250);
}

// Manual scanner with camera preview (no QR detection library needed)
async function startManualScannerWithPreview(scannerContainer) {
    // Create video element for preview
    qrVideoEl = document.createElement('video');
    qrVideoEl.id = 'qr-video-preview';
    qrVideoEl.setAttribute('playsinline', '');
    qrVideoEl.setAttribute('autoplay', '');
    qrVideoEl.setAttribute('muted', '');
    qrVideoEl.style.cssText = `
        width: 100%; max-width: 350px; height: auto; 
        border-radius: 8px; margin: 10px auto; display: block;
        background: #000; border: 2px solid #4caf50;
    `;
    
    // Clear container and add video with instructions
    scannerContainer.innerHTML = '';
    
    // Add instructions first
    const instructions = document.createElement('div');
    instructions.style.cssText = `
        text-align: center; padding: 10px; background: #e3f2fd; 
        border-radius: 6px; margin-bottom: 10px; color: #1976d2;
    `;
    instructions.innerHTML = `
        📱 <strong>Camera Preview Mode</strong><br>
        <small>Position QR code in view and enter the code manually below</small>
    `;
    scannerContainer.appendChild(instructions);
    
    // Add video
    scannerContainer.appendChild(qrVideoEl);
    
    // Add stop button
    const controls = document.createElement('div');
    controls.style.cssText = 'margin-top: 10px; text-align: center;';
    controls.innerHTML = `
        <button onclick="stopQRScanner()" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 6px; cursor: pointer;">
            🛑 Stop Preview
        </button>
    `;
    scannerContainer.appendChild(controls);

    // Request camera
    const constraints = {
        video: {
            facingMode: { ideal: currentCameraFacing },
            width: { ideal: 640 },
            height: { ideal: 480 }
        },
        audio: false
    };

    try {
        qrVideoStream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
        // Try with basic constraints
        qrVideoStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });
    }

    qrVideoEl.srcObject = qrVideoStream;
    await qrVideoEl.play();
}

// Simple QR scanner using only native browser APIs
async function startSimpleQRScanner(scannerContainer) {
    // Create a simple camera preview with manual input
    const previewContainer = document.createElement('div');
    previewContainer.style.cssText = `
        text-align: center; padding: 15px; background: #f8f9fa; 
        border-radius: 8px; border: 2px dashed #4caf50;
    `;
    
    previewContainer.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 10px;">📱</div>
        <h4 style="color: #4caf50; margin: 0 0 10px;">QR Scanner Ready</h4>
        <p style="color: #666; margin: 0; font-size: 14px;">
            Use the camera preview above or enter class code manually below
        </p>
        <div style="margin-top: 10px;">
            <small style="color: #888;">
                💡 Tip: Click the quick select buttons for common class codes
            </small>
        </div>
    `;
    
    scannerContainer.appendChild(previewContainer);
}

// Stop QR Scanner
function stopQRScanner() {
    const scannerContainer = document.getElementById('scanner-container');
    // Stop native path
    if (qrDetectInterval) {
        clearInterval(qrDetectInterval);
        qrDetectInterval = null;
    }
    if (qrVideoEl) {
        try { qrVideoEl.pause(); } catch {}
        if (qrVideoEl.parentNode) qrVideoEl.parentNode.removeChild(qrVideoEl);
        qrVideoEl = null;
    }
    if (qrVideoStream) {
        try { qrVideoStream.getTracks().forEach(t => t.stop()); } catch {}
        qrVideoStream = null;
    }

    // Stop fallback path
    if (qrScannerInstance) {
        try {
            qrScannerInstance.stop().then(() => {
                qrScannerInstance.clear();
                qrScannerInstance = null;
                scannerContainer.style.display = 'none';
            }).catch(() => {
                scannerContainer.style.display = 'none';
            });
        } catch (e) {
            scannerContainer.style.display = 'none';
        }
    } else {
        scannerContainer.style.display = 'none';
    }
}

// Switch between front and back camera
async function switchCamera() {
    if (!qrVideoEl && !qrScannerInstance) {
        showAttendanceStatus('❌ No active camera to switch', 'error');
        return;
    }
    
    // Stop current scanner
    stopQRScanner();
    
    // Switch camera facing
    currentCameraFacing = currentCameraFacing === 'environment' ? 'user' : 'environment';
    
    showAttendanceStatus('🔄 Switching camera...', 'info');
    
    // Wait a moment then restart with new camera
    setTimeout(() => {
        startQRScanner();
    }, 500);
}

// Enhanced status display function
function showAttendanceStatus(message, type = 'info') {
    const statusDiv = document.getElementById('attendance-status');
    if (!statusDiv) return;
    
    let bgColor, textColor, icon;
    
    switch (type) {
        case 'success':
            bgColor = '#d4edda';
            textColor = '#155724';
            icon = '✅';
            break;
        case 'error':
            bgColor = '#f8d7da';
            textColor = '#721c24';
            icon = '❌';
            break;
        case 'warning':
            bgColor = '#fff3cd';
            textColor = '#856404';
            icon = '⚠️';
            break;
        default:
            bgColor = '#d1ecf1';
            textColor = '#0c5460';
            icon = 'ℹ️';
    }
    
    statusDiv.style.display = 'block';
    statusDiv.style.background = bgColor;
    statusDiv.style.color = textColor;
    statusDiv.style.border = `1px solid ${textColor}40`;
    statusDiv.innerHTML = `${icon} ${message}`;
    
    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 3000);
    }
}

// Enhanced attendance marking with teacher system sync
function markAttendanceWithTeacherSync(classCode) {
    if (!classCode) {
        classCode = document.getElementById('qrCodeInput').value.trim();
    }
    
    if (!classCode) {
        showAttendanceStatus('❌ Please enter a class code or scan QR', 'error');
        return;
    }
    
    const today = getTodayDayName();
    const currentTime = new Date();
    const timeString = currentTime.toLocaleTimeString();
    const dateString = currentTime.toDateString();
    
    // Student data for attendance record
    const studentData = {
        studentId: currentUser.id,
        name: currentUser.name || `Student ${currentUser.id}`,
        time: timeString,
        date: dateString,
        timestamp: currentTime.toISOString(),
        classCode: classCode,
        scanMethod: 'QR_SCAN'
    };
    
    // 1. Store in student's personal attendance record
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData') || '{}');
    if (!attendanceData[currentUser.id]) attendanceData[currentUser.id] = {};
    if (!attendanceData[currentUser.id][today]) attendanceData[currentUser.id][today] = [];
    
    // Check if already marked for this class today
    const alreadyMarked = attendanceData[currentUser.id][today].includes(classCode);
    if (alreadyMarked) {
        showAttendanceStatus('⚠️ Attendance already marked for ' + classCode + ' today', 'warning');
        return;
    }
    
    attendanceData[currentUser.id][today].push(classCode);
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
    
    // 2. Store in teacher's class attendance system (scannedAttendance)
    const scannedStore = JSON.parse(localStorage.getItem('scannedAttendance') || '{}');
    if (!scannedStore[dateString]) scannedStore[dateString] = {};
    if (!scannedStore[dateString][classCode]) scannedStore[dateString][classCode] = [];
    
    // Check if student already scanned for this class today
    const existingRecord = scannedStore[dateString][classCode].find(record => 
        record.studentId === currentUser.id
    );
    
    if (existingRecord) {
        showAttendanceStatus('⚠️ You have already scanned for ' + classCode + ' today', 'warning');
        return;
    }
    
    // Add to teacher's attendance system
    scannedStore[dateString][classCode].push(studentData);
    localStorage.setItem('scannedAttendance', JSON.stringify(scannedStore));
    
    // 3. Store in advanced attendance manager
    try {
        const classInfo = {
            code: classCode,
            subject: getSubjectFromClassCode(classCode),
            room: getRoomFromClassCode(classCode),
            day: today
        };
        
        attendanceManager.recordAttendance(studentData, classInfo);
    } catch (e) {
        console.warn('Failed to record in advanced system', e);
    }
    
    // 4. Update student's schedule display
    displayStudentSchedule();
    
    // 5. Send notification to teacher system (if teacher is logged in)
    notifyTeacherOfNewAttendance(classCode, studentData);
    
    // 6. Show success message
    showAttendanceStatus(`✅ Attendance marked successfully for ${classCode}!`, 'success');
    
    // 7. Show prominent success notification
    showAttendanceSuccessModal(classCode, studentData);
    
    // 8. Auto-stop scanner if running
    setTimeout(() => {
        stopQRScanner();
    }, 1000);
}

// Notify teacher system of new attendance
function notifyTeacherOfNewAttendance(classCode, studentData) {
    // Create a real-time notification for teachers
    const notification = {
        type: 'NEW_ATTENDANCE',
        classCode: classCode,
        student: studentData,
        timestamp: new Date().toISOString()
    };
    
    // Store notification for teacher dashboard
    const notifications = JSON.parse(localStorage.getItem('teacherNotifications') || '[]');
    notifications.unshift(notification); // Add to beginning
    
    // Keep only last 50 notifications
    if (notifications.length > 50) {
        notifications.splice(50);
    }
    
    localStorage.setItem('teacherNotifications', JSON.stringify(notifications));
    
    // Trigger teacher dashboard refresh if teacher is logged in
    try {
        if (typeof loadClassAttendance === 'function') {
            loadClassAttendance();
        }
        if (typeof displayTeacherSchedule === 'function') {
            displayTeacherSchedule();
        }
        // Show real-time notification to teacher
        showTeacherNotification(classCode, studentData);
    } catch (e) {
        // Teacher dashboard not active
    }
}

// Show prominent attendance success modal
function showAttendanceSuccessModal(classCode, studentData) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.8); z-index: 10000; display: flex; 
        align-items: center; justify-content: center;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 30px; max-width: 400px; width: 90%; text-align: center; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
            <div style="font-size: 64px; margin-bottom: 15px; animation: bounce 0.6s ease-out;">✅</div>
            <h2 style="margin: 0 0 10px; color: #2e7d32; font-size: 24px;">Attendance Successful!</h2>
            <p style="margin: 0 0 20px; color: #666; font-size: 16px;">Your attendance has been recorded</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; text-align: left;">
                    <div><strong>Student:</strong></div>
                    <div>${studentData.name}</div>
                    
                    <div><strong>Subject:</strong></div>
                    <div>${getSubjectFromClassCode(classCode)}</div>
                    
                    <div><strong>Class Code:</strong></div>
                    <div style="font-family: monospace; background: #e3f2fd; padding: 2px 6px; border-radius: 4px;">${classCode}</div>
                    
                    <div><strong>Time:</strong></div>
                    <div>${studentData.time}</div>
                </div>
            </div>
            
            <div style="background: #e8f5e9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <div style="color: #2e7d32; font-weight: 600; margin-bottom: 5px;">📊 Data Synced Successfully</div>
                <div style="color: #666; font-size: 14px;">✓ Student record updated<br>✓ Teacher portal notified<br>✓ Attendance database updated</div>
            </div>
            
            <button onclick="this.closest('div').parentElement.remove()" 
                    style="padding: 12px 24px; background: #4caf50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: 600;">
                Continue
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-close after 8 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.style.animation = 'fadeOut 0.3s ease-in';
            setTimeout(() => modal.remove(), 300);
        }
    }, 8000);
}

// Show detailed attendance information (legacy function)
function showAttendanceDetails(classCode, studentData) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.8); z-index: 10000; display: flex; 
        align-items: center; justify-content: center;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 20px; max-width: 400px; width: 90%;">
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
                <h2 style="margin: 0; color: #2e7d32;">Attendance Confirmed!</h2>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 14px;">
                    <div><strong>Student:</strong></div>
                    <div>${studentData.name}</div>
                    
                    <div><strong>Class:</strong></div>
                    <div>${classCode}</div>
                    
                    <div><strong>Subject:</strong></div>
                    <div>${getSubjectFromClassCode(classCode) || 'Unknown'}</div>
                    
                    <div><strong>Time:</strong></div>
                    <div>${studentData.time}</div>
                    
                    <div><strong>Date:</strong></div>
                    <div>${studentData.date}</div>
                    
                    <div><strong>Method:</strong></div>
                    <div>QR Code Scan</div>
                </div>
            </div>
            
            <div style="background: #e8f5e9; padding: 12px; border-radius: 6px; margin-bottom: 15px; text-align: center;">
                <strong style="color: #2e7d32;">Your attendance has been recorded and sent to your teacher!</strong>
            </div>
            
            <div style="text-align: center;">
                <button onclick="this.closest('div').parentElement.remove()" 
                        style="padding: 10px 20px; background: #2196f3; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 5000);
}

// Get student details for attendance record
function getStudentDetails(studentId) {
    // This could be enhanced to fetch from a student database
    return {
        id: studentId,
        name: currentUser.name || `Student ${studentId}`,
        email: `${studentId}@student.edu`,
        class: 'Computer Science',
        year: '2024'
    };
}

// Show real-time notification to teacher
function showTeacherNotification(classCode, studentData) {
    // Only show if we're in teacher dashboard
    if (currentUser.role !== 'teacher') return;
    
    // Create floating notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10001;
        background: #4caf50; color: white; padding: 15px 20px;
        border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        max-width: 300px; animation: slideIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <div style="font-size: 24px;">👨‍🎓</div>
            <div>
                <div style="font-weight: bold; margin-bottom: 2px;">New Attendance!</div>
                <div style="font-size: 12px; opacity: 0.9;">${studentData.name} joined ${classCode}</div>
                <div style="font-size: 11px; opacity: 0.8;">${studentData.time}</div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: white; font-size: 16px; cursor: pointer; margin-left: auto;">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Test QR scanner functionality
function testQRScanner() {
    console.log('Testing QR Scanner...');
    console.log('BarcodeDetector available:', 'BarcodeDetector' in window);
    console.log('getUserMedia available:', !!navigator.mediaDevices?.getUserMedia);
    console.log('Current camera facing:', currentCameraFacing);
    console.log('HTTPS/Secure context:', location.protocol === 'https:' || location.hostname === 'localhost');
    
    showAttendanceStatus('🔄 Testing camera access...', 'info');
    
    // Test camera permissions
    if (!navigator.mediaDevices?.getUserMedia) {
        showAttendanceStatus('❌ Camera API not available - Use manual input', 'error');
        return;
    }
    
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            console.log('Camera access granted');
            stream.getTracks().forEach(track => track.stop());
            
            if ('BarcodeDetector' in window) {
                showAttendanceStatus('✅ Camera & QR detection available - Full functionality', 'success');
            } else {
                showAttendanceStatus('✅ Camera available - Use preview mode or manual input', 'success');
            }
        })
        .catch(err => {
            console.error('Camera access failed:', err);
            let message = '❌ Camera access failed: ';
            
            if (err.name === 'NotAllowedError') {
                message += 'Permission denied. Please allow camera access.';
            } else if (err.name === 'NotFoundError') {
                message += 'No camera found on device.';
            } else if (err.name === 'NotSupportedError') {
                message += 'Camera not supported. Use manual input.';
            } else {
                message += err.message;
            }
            
            showAttendanceStatus(message, 'error');
        });
}

// Select class code from quick buttons
function selectClassCode(code, subjectName) {
    const qrCodeInput = document.getElementById('qrCodeInput');
    if (qrCodeInput) {
        qrCodeInput.value = code;
        // Add visual feedback
        showAttendanceStatus(`📚 Selected: ${subjectName} (${code})`, 'success');
        
        // Highlight selected button temporarily
        event.target.style.background = '#4caf50';
        event.target.style.color = 'white';
        event.target.style.borderColor = '#4caf50';
        
        setTimeout(() => {
            if (code === 'LAB') {
                event.target.style.background = '#e8f5e9';
                event.target.style.color = '#333';
                event.target.style.borderColor = '#4caf50';
            } else {
                event.target.style.background = '#e3f2fd';
                event.target.style.color = '#333';
                event.target.style.borderColor = '#2196f3';
            }
        }, 1000);
    }
}

// Legacy attendance function (for backward compatibility)
function markAttendance() {
    const classCode = document.getElementById('qrCodeInput').value.trim();
    markAttendanceWithTeacherSync(classCode);
}

// Helper function to get subject name from class code
function getSubjectFromClassCode(classCode) {
    const codeMap = {
        'CN': 'Computer Networks',
        'TOC': 'Theory of Computation', 
        'FM': 'Financial Management',
        'RMIPR': 'Research Methodology & IPR',
        'MRMM': 'MR&MM',
        'LAB': 'Laboratory Session',
        'BREAK': 'Break',
        'LUNCH': 'Lunch Break'
    };
    return codeMap[classCode] || classCode;
}

// Helper function to get room from class code (if available)
function getRoomFromClassCode(classCode) {
    const roomMap = {
        'CN': 'LH-303',
        'TOC': 'LH-303', 
        'FM': 'LH-302',
        'RMIPR': 'LH-301',
        'LAB': 'Computer Lab',
        'BREAK': 'Cafeteria',
        'LUNCH': 'Cafeteria'
    };
    return roomMap[classCode] || 'TBD';
}

// Function to update date and time
function updateDateTime() {
    const dateTimeElement = document.getElementById('dateTime');
    const profileDateTimeElement = document.getElementById('profileDateTime');
    const profileTimeZoneElement = document.getElementById('profileTimeZone');

    const now = new Date();

    // Update the main navbar clock
    if (dateTimeElement) {
        dateTimeElement.textContent = now.toLocaleString();
    }

    // Update the profile card clock
    if (profileDateTimeElement) {
        profileDateTimeElement.textContent = now.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    if (profileTimeZoneElement) {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        profileTimeZoneElement.textContent = `Timezone: ${timeZone}`;
    }
}

// Function to start automatic dashboard updates
function startDashboardUpdates() {
    // Update time every second
    updateDateTime(); // Initial call
    let timeInterval = setInterval(updateDateTime, 1000);

    // Refresh dashboard data every 60 seconds
    let dataInterval = setInterval(loadStudentDashboard, 60000);

    // Store intervals to clear them on logout
    dashboardInterval = [timeInterval, dataInterval];
}

// Overload the clear interval to handle the array
const originalClearInterval = clearInterval;
clearInterval = function(id) {
    if (Array.isArray(id)) {
        id.forEach(intervalId => originalClearInterval(intervalId));
    } else {
        originalClearInterval(id);
    }
};

// Test function to manually refresh all dashboard sections
function refreshDashboard() {
    console.log('Refreshing dashboard sections...');
    
    try {
        displayProductivityTracker();
        console.log('✓ Productivity tracker refreshed');
    } catch (e) {
        console.error('✗ Productivity tracker error:', e);
    }
    
    try {
        displayActivities();
        console.log('✓ Activities refreshed');
    } catch (e) {
        console.error('✗ Activities error:', e);
    }
    
    try {
        displayAttendanceHistory();
        console.log('✓ Attendance history refreshed');
    } catch (e) {
        console.error('✗ Attendance history error:', e);
    }
    
    try {
        displayStudentSchedule();
        console.log('✓ Student schedule refreshed');
    } catch (e) {
        console.error('✗ Student schedule error:', e);
    }
}

// Dynamically load html5-qrcode from multiple CDNs
function ensureHtml5QrcodeLoaded() {
    return new Promise((resolve, reject) => {
        if (window.Html5Qrcode) return resolve();
        const urls = [
            './libs/html5-qrcode.min.js', // local offline copy (place the file here)
            'https://unpkg.com/html5-qrcode/minified/html5-qrcode.min.js',
            'https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/minified/html5-qrcode.min.js'
        ];
        let i = 0;
        const tryNext = () => {
            if (i >= urls.length) return reject(new Error('All CDNs failed'));
            const s = document.createElement('script');
            s.src = urls[i++];
            s.async = true;
            s.onload = () => window.Html5Qrcode ? resolve() : tryNext();
            s.onerror = tryNext;
            document.head.appendChild(s);
        };
        tryNext();
    });
}

// Logout function
function stopDashboardUpdates() {
    if (dashboardInterval) {
        clearInterval(dashboardInterval);
        dashboardInterval = null;
    }
}

function logout() {
    stopDashboardUpdates(); // Stop automatic updates on logout
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        currentUser = null;
        
        // Hide all dashboards
        document.getElementById('studentDashboard').classList.remove('active');
        document.getElementById('teacherDashboard').classList.remove('active');
        
        // Show login screen
        document.getElementById('loginScreen').classList.add('active');
        
        // Clear form
        document.getElementById('userId').value = '';
        document.getElementById('password').value = '';
    }
}

// Utility function to get current period
function getCurrentPeriod() {
    const now = new Date();
    const currentHour = now.getHours();
    const schedule = currentUser.role === 'student' ? scheduleData.student : scheduleData.teacher;
    
    for (let item of schedule) {
        const startHour = parseInt(item.time.split(':')[0]);
        const isPM = item.time.includes('PM');
        const adjustedHour = isPM && startHour !== 12 ? startHour + 12 : startHour;
        
        if (currentHour >= adjustedHour && currentHour < adjustedHour + 1) {
            return item;
        }
    }
    
    return null;
}

// Auto-refresh handled by setupScheduleAutoRefresh()
