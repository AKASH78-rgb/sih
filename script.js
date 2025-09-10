// Track attendance
let attendance = [];

function onScanSuccess(decodedText, decodedResult) {
    // Check if QR corresponding to student is not already marked
    if (!attendance.includes(decodedText)) {
        attendance.push(decodedText);
        document.getElementById("result").innerText = "Scanned: " + decodedText;
        updateAttendanceList();
        // Here, you could implement storing attendance in backend/database.
    } else {
        document.getElementById("result").innerText = "Already marked: " + decodedText;
    }
}

// QR scanner setup
let html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader", { fps: 10, qrbox: 200 }
);
html5QrcodeScanner.render(onScanSuccess);

function updateAttendanceList() {
    const list = document.getElementById("attendance-list");
    list.innerHTML = "";
    attendance.forEach(studentId => {
        const li = document.createElement("li");
        li.textContent = studentId + " (Present)";
        list.appendChild(li);
    });
}

function resetAttendance() {
    attendance = [];
    document.getElementById("attendance-list").innerHTML = "";
    document.getElementById("result").innerText = "";
}
