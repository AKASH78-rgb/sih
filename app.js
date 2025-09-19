// Global variables
let currentUser = null;
let qrScanner = null;

// Sample Data
const scheduleData = {
    student: [
        { time: "9:00 AM - 10:00 AM", subject: "Computer Science", room: "Room 301", code: "CS101" },
        { time: "10:00 AM - 11:00 AM", subject: "Mathematics", room: "Room 205", code: "MATH201" },
        { time: "11:00 AM - 12:00 PM", subject: "Free Period", room: "Library", code: "FREE" },
        { time: "12:00 PM - 1:00 PM", subject: "Lunch Break", room: "Cafeteria", code: "LUNCH" },
        { time: "1:00 PM - 2:00 PM", subject: "Physics", room: "Lab 102", code: "PHY301" },
        { time: "2:00 PM - 3:00 PM", subject: "English", room: "Room 108", code: "ENG101" },
        { time: "3:00 PM - 4:00 PM", subject: "Free Period", room: "Study Hall", code: "FREE" }
    ],
    teacher: [
        { time: "9:00 AM - 10:00 AM", subject: "Computer Science - Section A", room: "Room 301", code: "CS101" },
        { time: "10:00 AM - 11:00 AM", subject: "Computer Science - Section B", room: "Room 301", code: "CS101" },
        { time: "11:00 AM - 12:00 PM", subject: "Free Period", room: "Staff Room", code: "FREE" },
        { time: "12:00 PM - 1:00 PM", subject: "Lunch Break", room: "Cafeteria", code: "LUNCH" },
        { time: "2:00 PM - 3:00 PM", subject: "Computer Science - Section C", room: "Room 301", code: "CS101" }
    ]
};

const activities = [
    { 
        title: "📖 Practice Python Programming",
        description: "Complete coding challenges on HackerRank",
        duration: "30-45 minutes",
        category: "skill"
    },
    {
        title: "📚 Read Research Papers",
        description: "Review latest CS research papers from IEEE",
        duration: "45-60 minutes",
        category: "academic"
    },
    {
        title: "🎯 Career Planning",
        description: "Update your resume and LinkedIn profile",
        duration: "30 minutes",
        category: "career"
    },
    {
        title: "🧮 Math Problem Solving",
        description: "Solve practice problems for upcoming exam",
        duration: "45 minutes",
        category: "academic"
    },
    {
        title: "💡 Project Brainstorming",
        description: "Work on your semester project ideas",
        duration: "30-60 minutes",
        category: "project"
    },
    {
        title: "🏃 Physical Activity",
        description: "Take a walk or do stretching exercises",
        duration: "15-20 minutes",
        category: "wellness"
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
    } else {
        document.getElementById('teacherDashboard').classList.add('active');
        document.getElementById('teacherName').textContent = currentUser.name;
        loadTeacherDashboard();
    }
}

// Load Student Dashboard
function loadStudentDashboard() {
    displayStudentProfile();
    displaySchedule();
    displayProductivityTracker();
    displayActivities();
    displayAttendanceHistory();
}

// Display Productivity Tracker
function displayProductivityTracker() {
    const trackerDiv = document.getElementById('productivityTracker');
    
    // Calculate productivity scores
    const productivityData = calculateProductivityScore();
    
    trackerDiv.innerHTML = `
        <!-- Productivity Score -->
        <div style="text-align: center; padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    border-radius: 10px; margin-bottom: 15px; color: white;">
            <div style="font-size: 36px; font-weight: bold;">${productivityData.score}</div>
            <div style="font-size: 12px; opacity: 0.9;">Today's Productivity Score</div>
            <div style="margin-top: 10px;">
                <div style="background: rgba(255,255,255,0.3); border-radius: 10px; height: 8px; overflow: hidden;">
                    <div style="background: white; height: 100%; width: ${productivityData.score}%; transition: width 1s ease;"></div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-around; margin-top: 15px; font-size: 11px;">
                <div>
                    <div style="font-size: 16px; font-weight: bold;">🔥 ${productivityData.streak}</div>
                    <div style="opacity: 0.8;">Day Streak</div>
                </div>
                <div>
                    <div style="font-size: 16px; font-weight: bold;">⭐ ${productivityData.level}</div>
                    <div style="opacity: 0.8;">Level</div>
                </div>
                <div>
                    <div style="font-size: 16px; font-weight: bold;">🏆 ${productivityData.rank}</div>
                    <div style="opacity: 0.8;">Rank</div>
                </div>
            </div>
        </div>
        
        <!-- Time Utilization Chart -->
        <div style="margin-bottom: 15px;">
            <h4 style="font-size: 14px; color: #333; margin-bottom: 10px;">⏰ Today's Time Utilization</h4>
            <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                <div style="flex: 1;">
                    <canvas id="timeChart" width="120" height="120"></canvas>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; font-size: 12px;">
                    <div style="display: flex; align-items: center; margin: 3px 0;">
                        <span style="width: 12px; height: 12px; background: #4caf50; border-radius: 2px; margin-right: 6px;"></span>
                        <span>Classes: ${productivityData.timeBreakdown.classes}%</span>
                    </div>
                    <div style="display: flex; align-items: center; margin: 3px 0;">
                        <span style="width: 12px; height: 12px; background: #2196f3; border-radius: 2px; margin-right: 6px;"></span>
                        <span>Study: ${productivityData.timeBreakdown.study}%</span>
                    </div>
                    <div style="display: flex; align-items: center; margin: 3px 0;">
                        <span style="width: 12px; height: 12px; background: #ff9800; border-radius: 2px; margin-right: 6px;"></span>
                        <span>Activities: ${productivityData.timeBreakdown.activities}%</span>
                    </div>
                    <div style="display: flex; align-items: center; margin: 3px 0;">
                        <span style="width: 12px; height: 12px; background: #9c27b0; border-radius: 2px; margin-right: 6px;"></span>
                        <span>Break: ${productivityData.timeBreakdown.break}%</span>
                    </div>
                    <div style="display: flex; align-items: center; margin: 3px 0;">
                        <span style="width: 12px; height: 12px; background: #e0e0e0; border-radius: 2px; margin-right: 6px;"></span>
                        <span>Idle: ${productivityData.timeBreakdown.idle}%</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Activity Stats -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 15px;">
            <div style="background: #e8f5e9; padding: 10px; border-radius: 8px; text-align: center;">
                <div style="font-size: 20px; font-weight: bold; color: #2e7d32;">${productivityData.activitiesCompleted}</div>
                <div style="font-size: 11px; color: #666;">Activities Today</div>
            </div>
            <div style="background: #fff3e0; padding: 10px; border-radius: 8px; text-align: center;">
                <div style="font-size: 20px; font-weight: bold; color: #f57c00;">${productivityData.hoursProductive}</div>
                <div style="font-size: 11px; color: #666;">Productive Hours</div>
            </div>
        </div>
        
        <!-- Achievement Badges -->
        <div style="margin-bottom: 10px;">
            <h4 style="font-size: 14px; color: #333; margin-bottom: 8px;">🏆 Recent Achievements</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${productivityData.badges.map(badge => `
                    <span style="background: linear-gradient(135deg, #ffd700, #ffed4e); color: #333; 
                                 padding: 4px 10px; border-radius: 15px; font-size: 11px; font-weight: bold;">
                        ${badge}
                    </span>
                `).join('')}
            </div>
        </div>
        
        <!-- Weekly Goals Progress -->
        <div>
            <h4 style="font-size: 14px; color: #333; margin-bottom: 8px;">🎯 Weekly Goals</h4>
            ${productivityData.weeklyGoals.map(goal => `
                <div style="margin-bottom: 8px;">
                    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 3px;">
                        <span>${goal.name}</span>
                        <span style="color: #666;">${goal.current}/${goal.target}</span>
                    </div>
                    <div style="background: #e0e0e0; border-radius: 4px; height: 6px; overflow: hidden;">
                        <div style="background: ${goal.color}; height: 100%; width: ${(goal.current/goal.target)*100}%; 
                                    transition: width 0.5s ease;"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Draw the time utilization chart
    setTimeout(() => drawTimeChart(productivityData.timeBreakdown), 100);
}

// Calculate productivity score and metrics
function calculateProductivityScore() {
    // Get stored activity data or use defaults
    const activityLog = JSON.parse(localStorage.getItem('activityLog') || '[]');
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData') || '{}');
    const today = new Date().toDateString();
    const userAttendance = attendanceData[currentUser?.id]?.[today] || [];
    
    // Calculate scores
    const classesAttended = userAttendance.length;
    const activitiesCompleted = activityLog.filter(a => 
        new Date(a.timestamp).toDateString() === today && a.user === currentUser?.id
    ).length;
    
    // Calculate productivity score (0-100)
    let score = 0;
    score += Math.min(classesAttended * 15, 60); // Max 60 points from classes
    score += Math.min(activitiesCompleted * 10, 30); // Max 30 points from activities
    score += 10; // Base participation points
    
    // Time breakdown (sample data - in real app, track actual time)
    const timeBreakdown = {
        classes: 35,
        study: 20,
        activities: 15,
        break: 10,
        idle: 20
    };
    
    // Calculate streak (sample)
    const streak = Math.floor(Math.random() * 7) + 1;
    
    // Determine level based on score
    const level = score >= 80 ? 'Expert' : score >= 60 ? 'Advanced' : score >= 40 ? 'Intermediate' : 'Beginner';
    
    // Sample badges
    const badges = [];
    if (classesAttended >= 4) badges.push('🌟 Perfect Attendance');
    if (activitiesCompleted >= 3) badges.push('🚀 Super Active');
    if (streak >= 5) badges.push('🔥 Hot Streak');
    if (score >= 75) badges.push('⭐ Top Performer');
    
    // Weekly goals
    const weeklyGoals = [
        { name: 'Attend Classes', current: classesAttended, target: 6, color: '#4caf50' },
        { name: 'Complete Activities', current: activitiesCompleted, target: 10, color: '#2196f3' },
        { name: 'Study Hours', current: 4, target: 8, color: '#ff9800' },
        { name: 'Assignment Submissions', current: 2, target: 3, color: '#9c27b0' }
    ];
    
    return {
        score,
        streak,
        level,
        rank: score >= 80 ? 'Top 10%' : score >= 60 ? 'Top 30%' : 'Rising',
        timeBreakdown,
        activitiesCompleted,
        hoursProductive: (classesAttended * 1 + activitiesCompleted * 0.5).toFixed(1) + 'h',
        badges,
        weeklyGoals
    };
}

// Draw time utilization chart
function drawTimeChart(data) {
    const canvas = document.getElementById('timeChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Data and colors
    const values = [data.classes, data.study, data.activities, data.break, data.idle];
    const colors = ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#e0e0e0'];
    
    // Draw pie chart
    let currentAngle = -Math.PI / 2;
    
    values.forEach((value, index) => {
        const sliceAngle = (value / 100) * 2 * Math.PI;
        
        // Draw slice
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = colors[index];
        ctx.fill();
        
        currentAngle += sliceAngle;
    });
    
    // Draw center circle for donut effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    // Add center text
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Today', centerX, centerY);
}

// Display Student Profile
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

// Load Teacher Dashboard
function loadTeacherDashboard() {
    displayTeacherSchedule();
    loadClassAttendance();
}

// Display student schedule
function displaySchedule() {
    const scheduleList = document.getElementById('scheduleList');
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    
    scheduleList.innerHTML = '';
    
    scheduleData.student.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'schedule-item';
        
        // Check if it's current class
        const classHour = parseInt(item.time.split(':')[0]);
        if (classHour <= currentHour && currentHour < classHour + 1) {
            div.className += ' current';
        }
        
        if (item.code === 'FREE') {
            div.className += ' free-period';
        }
        
        div.innerHTML = `
            <span class="time">${item.time}</span>
            <span class="subject">${item.subject}</span>
            <span class="room">${item.room}</span>
        `;
        
        scheduleList.appendChild(div);
    });
}

// Display teacher schedule
function displayTeacherSchedule() {
    const scheduleDiv = document.getElementById('teacherSchedule');
    scheduleDiv.innerHTML = '';
    
    scheduleData.teacher.forEach(item => {
        const div = document.createElement('div');
        div.className = 'schedule-item';
        
        if (item.code === 'FREE') {
            div.className += ' free-period';
        }
        
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <span class="time" style="font-size: 12px; color: #667eea; font-weight: 600;">${item.time}</span>
                    <span class="subject" style="font-size: 14px; color: #333; margin-left: 10px;">${item.subject}</span>
                </div>
                <span class="room" style="font-size: 12px; color: #666;">${item.room}</span>
            </div>
        `;
        
        scheduleDiv.appendChild(div);
    });
}

// Display activity suggestions
function displayActivities() {
    const activityDiv = document.getElementById('activitySuggestions');
    activityDiv.innerHTML = '';
    
    // Check if current time is free period
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    
    let isFreePeriod = false;
    scheduleData.student.forEach(item => {
        const classHour = parseInt(item.time.split(':')[0]);
        if (classHour <= currentHour && currentHour < classHour + 1 && item.code === 'FREE') {
            isFreePeriod = true;
        }
    });
    
    if (isFreePeriod) {
        activityDiv.innerHTML = '<p style="color: green; margin-bottom: 15px;">🟢 You have a free period now! Here are some activities:</p>';
    }
    
    // Randomly select 3 activities
    const selectedActivities = activities.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    selectedActivities.forEach(activity => {
        const div = document.createElement('div');
        div.className = 'activity-item';
        div.innerHTML = `
            <div class="activity-title">${activity.title}</div>
            <div class="activity-desc">${activity.description}</div>
            <div class="activity-time">⏱️ ${activity.duration}</div>
        `;
        div.onclick = () => startActivity(activity);
        activityDiv.appendChild(div);
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

// Load class attendance for teachers
function loadClassAttendance() {
    const attendanceView = document.getElementById('classAttendanceView');
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || {};
    const today = new Date().toDateString();
    
    // Sample sections with students
    const sections = {
        'Section A': [
            { id: 'student1', name: 'Rahul Kumar', rollNo: 'A001', totalClasses: 30, attended: 27 },
            { id: 'student2', name: 'Priya Singh', rollNo: 'A002', totalClasses: 30, attended: 29 },
            { id: 'student3', name: 'Amit Sharma', rollNo: 'A003', totalClasses: 30, attended: 22 },
            { id: 'student4', name: 'Sneha Patel', rollNo: 'A004', totalClasses: 30, attended: 30 },
            { id: 'student5', name: 'Vikram Verma', rollNo: 'A005', totalClasses: 30, attended: 18 }
        ],
        'Section B': [
            { id: 'student6', name: 'Anjali Gupta', rollNo: 'B001', totalClasses: 30, attended: 25 },
            { id: 'student7', name: 'Karan Mehta', rollNo: 'B002', totalClasses: 30, attended: 28 },
            { id: 'student8', name: 'Neha Reddy', rollNo: 'B003', totalClasses: 30, attended: 23 },
            { id: 'student9', name: 'Arjun Nair', rollNo: 'B004', totalClasses: 30, attended: 26 },
            { id: 'student10', name: 'Pooja Joshi', rollNo: 'B005', totalClasses: 30, attended: 30 }
        ],
        'Section C': [
            { id: 'student11', name: 'Ravi Malhotra', rollNo: 'C001', totalClasses: 30, attended: 20 },
            { id: 'student12', name: 'Simran Kaur', rollNo: 'C002', totalClasses: 30, attended: 29 },
            { id: 'student13', name: 'Rohit Yadav', rollNo: 'C003', totalClasses: 30, attended: 24 },
            { id: 'student14', name: 'Deepika Shah', rollNo: 'C004', totalClasses: 30, attended: 27 },
            { id: 'student15', name: 'Manish Kapoor', rollNo: 'C005', totalClasses: 30, attended: 15 }
        ]
    };
    
    // Section selector
    let html = `
        <div style="margin-bottom: 20px;">
            <select id="sectionSelect" onchange="filterSection()" style="padding: 10px; border-radius: 5px; border: 2px solid #007bff; font-size: 16px; width: 200px;">
                <option value="all">All Sections</option>
                <option value="Section A">Section A</option>
                <option value="Section B">Section B</option>
                <option value="Section C">Section C</option>
            </select>
            <span style="margin-left: 20px; font-size: 14px; color: #666;">
                Total Students: <span id="totalStudents" style="font-weight: bold;">15</span>
            </span>
        </div>
    `;
    
    // Display sections
    Object.keys(sections).forEach(sectionName => {
        const students = sections[sectionName];
        const sectionAvg = Math.round(students.reduce((sum, s) => sum + (s.attended/s.totalClasses)*100, 0) / students.length);
        
        html += `
            <div class="section-container" data-section="${sectionName}" style="margin-bottom: 30px; border: 1px solid #e0e0e0; border-radius: 10px; padding: 15px; background: #fafafa;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding: 10px; background: #007bff; color: white; border-radius: 5px;">
                    <h4 style="margin: 0;">🏫 ${sectionName}</h4>
                    <div style="text-align: right;">
                        <span style="font-size: 14px;">Section Average: </span>
                        <span style="font-size: 20px; font-weight: bold;">${sectionAvg}%</span>
                    </div>
                </div>
                
                <div class="students-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px;">
        `;
        
        students.forEach(student => {
            const studentAttendance = attendanceData[student.id]?.[today] || [];
            const todayStatus = studentAttendance.length > 0 ? 'Present' : 'Absent';
            const percentage = Math.round((student.attended / student.totalClasses) * 100);
            const barColor = percentage >= 75 ? '#4caf50' : percentage >= 60 ? '#ffc107' : '#f44336';
            
            html += `
                <div class="student-card" style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                        <div>
                            <div style="font-weight: bold; color: #333; font-size: 16px;">${student.name}</div>
                            <div style="color: #666; font-size: 12px; margin-top: 2px;">Roll: ${student.rollNo}</div>
                        </div>
                        <div style="text-align: right;">
                            <span class="${todayStatus === 'Present' ? 'status-present' : 'status-absent'}" 
                                  style="padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;
                                         background: ${todayStatus === 'Present' ? '#d4edda' : '#f8d7da'};
                                         color: ${todayStatus === 'Present' ? '#155724' : '#721c24'};">
                                ${todayStatus === 'Present' ? '✓' : '✗'} Today
                            </span>
                        </div>
                    </div>
                    
                    <div style="margin: 10px 0;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span style="font-size: 12px; color: #666;">Attendance</span>
                            <span style="font-size: 14px; font-weight: bold; color: ${barColor};">${percentage}%</span>
                        </div>
                        <div style="background: #e0e0e0; border-radius: 10px; height: 20px; overflow: hidden; position: relative;">
                            <div style="background: ${barColor}; height: 100%; width: ${percentage}%; border-radius: 10px; transition: width 0.5s ease;
                                        display: flex; align-items: center; justify-content: center;">
                                <span style="color: white; font-size: 11px; font-weight: bold; position: absolute; left: 50%; transform: translateX(-50%);">
                                    ${student.attended}/${student.totalClasses}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin-top: 10px; padding-top: 10px; border-top: 1px solid #f0f0f0;">
                        <div style="text-align: center;">
                            <div style="font-size: 18px; font-weight: bold; color: #4caf50;">${student.attended}</div>
                            <div style="font-size: 10px; color: #666;">Present</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 18px; font-weight: bold; color: #f44336;">${student.totalClasses - student.attended}</div>
                            <div style="font-size: 10px; color: #666;">Absent</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 18px; font-weight: bold; color: #007bff;">${student.totalClasses}</div>
                            <div style="font-size: 10px; color: #666;">Total</div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    attendanceView.innerHTML = html;
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

// Start QR Scanner (Visual Demo)
function startQRScanner() {
    const scannerContainer = document.getElementById('scanner-container');
    const qrCodeInput = document.getElementById('qrCodeInput');
    
    // Show the scanner interface
    scannerContainer.style.display = 'block';
    
    // Simulate scanning after 3 seconds (for demo purposes)
    setTimeout(() => {
        // You can uncomment this to auto-fill a code for demo
        // qrCodeInput.value = 'CS101-' + Date.now();
        // showAttendanceStatus('QR Code detected! Click "Mark Present" to confirm.', 'success');
    }, 3000);
}

// Stop QR Scanner
function stopQRScanner() {
    const scannerContainer = document.getElementById('scanner-container');
    scannerContainer.style.display = 'none';
    
    // Clear any simulated results
    const attendanceStatus = document.getElementById('attendanceStatus');
    if (attendanceStatus) {
        attendanceStatus.style.display = 'none';
    }
}

// Logout function
function logout() {
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

// Auto-refresh schedule every minute
setInterval(() => {
    if (currentUser && currentUser.role === 'student') {
        displaySchedule();
    }
}, 60000);

