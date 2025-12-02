const ctx = document.getElementById('revenueChart').getContext('2d');

// Gradient for the line fill
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(22, 93, 255, 0.3)'); // Top color
gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');   // Bottom color

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mar', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue',
                data: [4000000, 6000000, 5000000, 10250000, 8000000, 9000000, 10000000],
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Hide legend
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `Rp${tooltipItem.raw.toLocaleString()}`;
                    },
                },
                backgroundColor: '#165DFF',
                titleFont: { size: 14 },
                bodyFont: { size: 14 },
                displayColors: false,
                padding: 10,
                yAlign: 'bottom',
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#080C1A' },
                padding: 20,
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 2000000,
                    callback: function (value) {
                        return `Rp${value.toLocaleString()}`;
                    },
                    color: '#6A7686',
                    padding: 20,
                },
                grid: { color: 'transparent' },
            },
        },
        elements: {
            line: {
                fill: true, // Enable gradient fill
                backgroundColor: gradient,
                borderColor: '#165DFF', // Line color
                tension: 0.3, // Smooth line
            },
            point: {
                pointBackgroundColor: '#fff', // Point color
                pointBorderColor: '#165DFF',
                pointBorderWidth: 2,
                pointRadius: 9,
            }
        },
    },
});