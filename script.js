let performanceChart; // Store the current chart instance

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' && password === '') {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
    } else {
        alert('Invalid credentials');
    }
}

function logout() {
    // Log the user out and return to the login page
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('login-page').classList.remove('hidden');
}

function showTeamData(teamId) {
    const teamData = {
        team1: { assigned: 10, completed: 6, ongoing: 4 },
        team2: { assigned: 8, completed: 7, ongoing: 1 },
        team3: { assigned: 12, completed: 8, ongoing: 4 },
        team4: { assigned: 15, completed: 10, ongoing: 5 }
    };

    const data = teamData[teamId];
    updatePerformanceChart(data);

    // Show chart and calendar
    document.getElementById('team-performance').classList.remove('hidden');
    document.getElementById('calendar').classList.remove('hidden');
    loadCalendar();
}

function updatePerformanceChart(data) {
    const ctx = document.getElementById('performanceChart').getContext('2d');

    // Destroy the previous chart instance if it exists
    if (performanceChart) {
        performanceChart.destroy();
    }

    // Create a new chart instance
    performanceChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Assigned', 'Completed', 'Ongoing'],
            datasets: [{
                label: 'Tasks',
                data: [data.assigned, data.completed, data.ongoing],
                backgroundColor: ['#3498db', '#2ecc71', '#e74c3c']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

function loadCalendar() {
    const calendarElement = document.getElementById('calendarTable').querySelector('tbody');
    calendarElement.innerHTML = ''; // Clear previous data

    const daysInMonth = 31;
    const firstDay = new Date(2024, 9, 1).getDay(); // October 2024 starts on a Tuesday (day 2)

    const sickLeaveDays = [5, 18]; // Sick leaves on 5th and 18th
    const paidLeaveDays = [11, 20]; // Paid leaves on 11th and 20th
    const attendedDays = [1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    let day = 1;
    for (let i = 0; i < 6; i++) { // 6 rows to cover all days of the month
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                // Empty cells before the start of the month
                cell.classList.add('empty');
            } else if (day > daysInMonth) {
                // Empty cells after the end of the month
                cell.classList.add('empty');
            } else {
                cell.textContent = day;

                if (sickLeaveDays.includes(day)) {
                    cell.classList.add('sick-leave');
                } else if (paidLeaveDays.includes(day)) {
                    cell.classList.add('paid-leave');
                } else if (attendedDays.includes(day)) {
                    cell.classList.add('attended');
                }

                // Mark weekends (Sundays and Saturdays)
                if (j === 0 || j === 6) {
                    cell.classList.add('weekend');
                }

                day++;
            }

            row.appendChild(cell);
        }

        calendarElement.appendChild(row);
    }
}
