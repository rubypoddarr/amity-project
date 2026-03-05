// Global Chart Configuration
Chart.defaults.color = '#C8C8C8';
Chart.defaults.borderColor = '#404040';
Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

const chartColors = {
    primary: '#0078D4',
    secondary: '#50E6FF',
    accent: '#FFB900',
    success: '#107C10',
    warning: '#FF8C00',
    danger: '#E81123',
    purple: '#8764B8',
    teal: '#00B7C3',
    green: '#13A10E'
};

let charts = {};

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    event.target.classList.add('active');

    // Initialize charts for the page
    initializePageCharts(pageId);
}

// Initialize Charts for Specific Pages
function initializePageCharts(pageId) {
    switch(pageId) {
        case 'home':
            if (!charts.adoptionTimeline) {
                createAdoptionTimeline();
            }
            break;
        case 'survey':
            if (!charts.ageDistribution) {
                createAgeDistribution();
                createAIUsagePie();
                createSatisfactionChart();
            }
            break;
        case 'dashboard':
            if (!charts.responseTimeTrend) {
                createResponseTimeTrend();
                createChannelDistribution();
                createTicketVolume();
                createSatisfactionByType();
            }
            break;
        case 'impact':
            if (!charts.costComparison) {
                createCostComparisonChart();
                createSatisfactionComparisonChart();
            }
            break;
        case 'case-studies':
            if (!charts.ecommerce) {
                createCaseStudyCharts();
            }
            break;
        case 'experience':
            if (!charts.responseTimeComparison) {
                createExperienceCharts();
            }
            break;
        case 'predictions':
            if (!charts.futureProjection) {
                createFutureProjectionChart();
            }
            break;
        case 'visualization':
            if (!charts.sentimentDistribution) {
                createVisualizationLabCharts();
            }
            break;
    }
}

// Home Page - AI Adoption Timeline
function createAdoptionTimeline() {
    const ctx = document.getElementById('adoptionTimeline');
    if (!ctx) return;

    charts.adoptionTimeline = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
            datasets: [{
                label: 'AI Adoption Rate (%)',
                data: [8, 12, 18, 25, 32, 41, 52, 61, 68, 73, 78, 84],
                borderColor: chartColors.secondary,
                backgroundColor: 'rgba(80, 230, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: chartColors.secondary,
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#C8C8C8',
                        font: { size: 14 }
                    }
                },
                tooltip: {
                    backgroundColor: '#1B1B1B',
                    borderColor: chartColors.primary,
                    borderWidth: 1,
                    titleColor: '#FFFFFF',
                    bodyColor: '#C8C8C8',
                    padding: 12,
                    displayColors: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: '#404040'
                    }
                },
                x: {
                    grid: {
                        color: '#404040'
                    }
                }
            }
        }
    });
}

// Survey Page - Age Distribution
function createAgeDistribution() {
    const ctx = document.getElementById('ageDistribution');
    if (!ctx) return;

    charts.ageDistribution = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            datasets: [{
                label: 'Number of Participants',
                data: [1247, 1652, 1289, 834, 225],
                backgroundColor: [
                    chartColors.primary,
                    chartColors.secondary,
                    chartColors.accent,
                    chartColors.purple,
                    chartColors.teal
                ],
                borderColor: '#FFFFFF',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1B1B1B',
                    borderColor: chartColors.primary,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return 'Participants: ' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#404040'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Survey Page - AI Usage Pie Chart
function createAIUsagePie() {
    const ctx = document.getElementById('aiUsage');
    if (!ctx) return;

    charts.aiUsage = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Used AI Support', 'Never Used AI Support'],
            datasets: [{
                data: [68.5, 31.5],
                backgroundColor: [chartColors.secondary, chartColors.danger],
                borderColor: '#333333',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#C8C8C8',
                        padding: 20,
                        font: { size: 13 }
                    }
                },
                tooltip: {
                    backgroundColor: '#1B1B1B',
                    borderColor: chartColors.primary,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Survey Page - Satisfaction Stacked Bar
function createSatisfactionChart() {
    const ctx = document.getElementById('satisfactionChart');
    if (!ctx) return;

    charts.satisfaction = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Simple Queries', 'Moderate Queries', 'Complex Queries', 'Technical Issues', 'Account Management'],
            datasets: [
                {
                    label: 'Very Satisfied',
                    data: [45, 32, 18, 28, 38],
                    backgroundColor: chartColors.success,
                },
                {
                    label: 'Satisfied',
                    data: [46, 43, 44, 41, 42],
                    backgroundColor: chartColors.secondary,
                },
                {
                    label: 'Neutral',
                    data: [7, 18, 26, 22, 15],
                    backgroundColor: chartColors.accent,
                },
                {
                    label: 'Dissatisfied',
                    data: [2, 5, 9, 7, 4],
                    backgroundColor: chartColors.warning,
                },
                {
                    label: 'Very Dissatisfied',
                    data: [0, 2, 3, 2, 1],
                    backgroundColor: chartColors.danger,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    }
                },
                y: {
                    stacked: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: '#404040'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#C8C8C8',
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    backgroundColor: '#1B1B1B',
                    borderColor: chartColors.primary,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            }
        }
    });
}

// Dashboard - Response Time Trend
function createResponseTimeTrend() {
    const ctx = document.getElementById('responseTimeTrend');
    if (!ctx) return;

    charts.responseTimeTrend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'AI Support (minutes)',
                    data: [3.2, 2.9, 2.7, 2.5, 2.4, 2.3, 2.2, 2.1, 2.1, 2.0, 2.0, 2.3],
                    borderColor: chartColors.secondary,
                    backgroundColor: 'rgba(80, 230, 255, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Human Support (minutes)',
                    data: [8.9, 8.7, 8.6, 8.5, 8.5, 8.4, 8.3, 8.4, 8.5, 8.6, 8.5, 8.5],
                    borderColor: chartColors.accent,
                    backgroundColor: 'rgba(255, 185, 0, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: { color: '#C8C8C8' }
                },
                tooltip: {
                    backgroundColor: '#1B1B1B',
                    borderColor: chartColors.primary,
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + ' min';
                        }
                    },
                    grid: { color: '#404040' }
                },
                x: {
                    grid: { color: '#404040' }
                }
            }
        }
    });
}

// Dashboard - Channel Distribution
function createChannelDistribution() {
    const ctx = document.getElementById('channelDistribution');
    if (!ctx) return;

    charts.channelDistribution = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['AI Chatbot', 'Email', 'Phone', 'Self-Service Portal', 'Social Media'],
            datasets: [{
                data: [45, 18, 15, 17, 5],
                backgroundColor: [
                    chartColors.secondary,
                    chartColors.primary,
                    chartColors.accent,
                    chartColors.purple,
                    chartColors.teal
                ],
                borderColor: '#333333',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#C8C8C8',
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    backgroundColor: '#1B1B1B',
                    borderColor: chartColors.primary,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Dashboard - Ticket Volume
function createTicketVolume() {
    const ctx = document.getElementById('ticketVolume');
    if (!ctx) return;

    charts.ticketVolume = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Support Tickets (thousands)',
                data: [128, 132, 135, 138, 140, 142, 145, 148, 144, 146, 150, 142],
                backgroundColor: chartColors.primary,
                borderColor: chartColors.secondary,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1B1B1B',
                    borderColor: chartColors.primary,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return 'Volume: ' + context.parsed.y + 'K';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + 'K';
                        }
                    },
                    grid: { color: '#404040' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

// Dashboard - Satisfaction by Type
function createSatisfactionByType() {
    const ctx = document.getElementById('satisfactionByType');
    if (!ctx) return;

    charts.satisfactionByType = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Speed', 'Accuracy', 'Empathy', 'Problem Solving', 'Availability', 'Personalization'],
            datasets: [
                {
                    label: 'AI Support',
                    data: [95, 87, 62, 76, 98, 71],
                    borderColor: chartColors.secondary,
                    backgroundColor: 'rgba(80, 230, 255, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'Human Support',
                    data: [45, 94, 91, 89, 48, 88],
                    borderColor: chartColors.accent,
                    backgroundColor: 'rgba(255, 185, 0, 0.2)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        color: '#8A8A8A'
                    },
                    grid: {
                        color: '#404040'
                    },
                    pointLabels: {
                        color: '#C8C8C8',
                        font: { size: 12 }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#C8C8C8' }
                },
                tooltip: {
                    backgroundColor: '#1B1B1B',
                    borderColor: chartColors.primary,
                    borderWidth: 1
                }
            }
        }
    });
}

// Impact Page - Cost Comparison
function createCostComparisonChart() {
    const ctx = document.getElementById('costComparisonChart');
    if (!ctx) return;

    charts.costComparison = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Implementation Cost', 'Monthly Operations', 'Per Interaction', 'Annual Total'],
            datasets: [
                {
                    label: 'Before AI (Human Only)',
                    data: [0, 420, 5.50, 5040],
                    backgroundColor: chartColors.danger,
                },
                {
                    label: 'After AI Implementation',
                    data: [380, 238, 1.20, 2856],
                    backgroundColor: chartColors.success,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#C8C8C8' }
                },
                tooltip: {
                    backgroundColor: '#1B1B1B',
                    borderColor: chartColors.primary,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': $';
                            }
                            label += context.parsed.y + (context.dataIndex === 3 ? 'K' : context.dataIndex === 2 ? '' : 'K');
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'K';
                        }
                    },
                    grid: { color: '#404040' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

// Impact Page - Satisfaction Comparison
function createSatisfactionComparisonChart() {
    const ctx = document.getElementById('satisfactionComparisonChart');
    if (!ctx) return;

    charts.satisfactionComparison = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
            datasets: [
                {
                    label: 'Before AI',
                    data: [3.4, 3.4, 3.5, 3.4, null, null, null, null, null],
                    borderColor: chartColors.danger,
                    backgroundColor: 'rgba(232, 17, 35, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true,
                    spanGaps: false
                },
                {
                    label: 'After AI Implementation',
                    data: [null, null, null, null, 3.8, 4.0, 4.1, 4.2, 4.2],
                    borderColor: chartColors.success,
                    backgroundColor: 'rgba(16, 124, 16, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true,
                    spanGaps: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#C8C8C8' }
                },
                tooltip: {
                    backgroundColor: '#1B1B1B',
                    borderColor: chartColors.primary,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '/5';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 3,
                    max: 5,
                    ticks: {
                        callback: function(value) {
                            return value + '/5';
                        }
                    },
                    grid: { color: '#404040' }
                },
                x: {
                    grid: { color: '#404040' }
                }
            }
        }
    });
}

// Case Studies - Individual Charts
function createCaseStudyCharts() {
    // E-commerce
    const ecomCtx = document.getElementById('ecommerceChart');
    if (ecomCtx) {
        charts.ecommerce = new Chart(ecomCtx, {
            type: 'bar',
            data: {
                labels: ['Order Tracking', 'Product Info', 'Returns', 'Payment Issues'],
                datasets: [{
                    label: 'Query Reduction %',
                    data: [78, 65, 58, 42],
                    backgroundColor: chartColors.secondary,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1B1B1B',
                        borderColor: chartColors.primary,
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { callback: value => value + '%' },
                        grid: { color: '#404040' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // Telecom
    const telecomCtx = document.getElementById('telecomChart');
    if (telecomCtx) {
        charts.telecom = new Chart(telecomCtx, {
            type: 'line',
            data: {
                labels: ['Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12'],
                datasets: [{
                    label: 'First-Call Resolution %',
                    data: [45, 52, 60, 65, 68],
                    borderColor: chartColors.secondary,
                    backgroundColor: 'rgba(80, 230, 255, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#C8C8C8' } },
                    tooltip: {
                        backgroundColor: '#1B1B1B',
                        borderColor: chartColors.primary,
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { callback: value => value + '%' },
                        grid: { color: '#404040' }
                    },
                    x: { grid: { color: '#404040' } }
                }
            }
        });
    }

    // Airline
    const airlineCtx = document.getElementById('airlineChart');
    if (airlineCtx) {
        charts.airline = new Chart(airlineCtx, {
            type: 'doughnut',
            data: {
                labels: ['Automated', 'Human Escalation', 'Failed'],
                datasets: [{
                    data: [89, 9, 2],
                    backgroundColor: [chartColors.success, chartColors.accent, chartColors.danger],
                    borderColor: '#333333',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#C8C8C8', padding: 10 }
                    },
                    tooltip: {
                        backgroundColor: '#1B1B1B',
                        borderColor: chartColors.primary,
                        borderWidth: 1
                    }
                }
            }
        });
    }

    // Banking
    const bankingCtx = document.getElementById('bankingChart');
    if (bankingCtx) {
        charts.banking = new Chart(bankingCtx, {
            type: 'bar',
            data: {
                labels: ['Balance Inquiry', 'Card Services', 'Loan Info', 'Fraud Alerts'],
                datasets: [{
                    label: 'Automation Rate %',
                    data: [98, 87, 76, 95],
                    backgroundColor: [chartColors.secondary, chartColors.primary, chartColors.accent, chartColors.success],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1B1B1B',
                        borderColor: chartColors.primary,
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { callback: value => value + '%' },
                        grid: { color: '#404040' }
                    },
                    y: { grid: { display: false } }
                }
            }
        });
    }

    // Streaming
    const streamingCtx = document.getElementById('streamingChart');
    if (streamingCtx) {
        charts.streaming = new Chart(streamingCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'User Engagement Increase %',
                    data: [5, 12, 18, 23],
                    borderColor: chartColors.accent,
                    backgroundColor: 'rgba(255, 185, 0, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#C8C8C8' } },
                    tooltip: {
                        backgroundColor: '#1B1B1B',
                        borderColor: chartColors.primary,
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: value => '+' + value + '%' },
                        grid: { color: '#404040' }
                    },
                    x: { grid: { color: '#404040' } }
                }
            }
        });
    }
}

// Experience Page Charts
function createExperienceCharts() {
    // Response Time Comparison
    const rtCtx = document.getElementById('responseTimeComparison');
    if (rtCtx) {
        charts.responseTimeComparison = new Chart(rtCtx, {
            type: 'bar',
            data: {
                labels: ['Initial Response', 'Issue Diagnosis', 'Solution Delivery', 'Total Time'],
                datasets: [
                    {
                        label: 'AI Support (minutes)',
                        data: [0.08, 0.5, 1.2, 2.3],
                        backgroundColor: chartColors.secondary
                    },
                    {
                        label: 'Human Support (minutes)',
                        data: [5.0, 2.5, 3.0, 8.5],
                        backgroundColor: chartColors.accent
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: '#C8C8C8' }
                    },
                    tooltip: {
                        backgroundColor: '#1B1B1B',
                        borderColor: chartColors.primary,
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: value => value + ' min' },
                        grid: { color: '#404040' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // Resolution Rate Comparison
    const rrCtx = document.getElementById('resolutionRateComparison');
    if (rrCtx) {
        charts.resolutionRateComparison = new Chart(rrCtx, {
            type: 'doughnut',
            data: {
                labels: ['AI First-Contact Resolution', 'AI Escalation Required', 'Human First-Contact Resolution', 'Human Follow-up Required'],
                datasets: [{
                    data: [76, 24, 68, 32],
                    backgroundColor: [chartColors.secondary, chartColors.primary, chartColors.accent, chartColors.warning],
                    borderColor: '#333333',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#C8C8C8', padding: 10, font: { size: 11 } }
                    },
                    tooltip: {
                        backgroundColor: '#1B1B1B',
                        borderColor: chartColors.primary,
                        borderWidth: 1
                    }
                }
            }
        });
    }

    // CSAT Comparison
    const csatCtx = document.getElementById('csatComparison');
    if (csatCtx) {
        charts.csatComparison = new Chart(csatCtx, {
            type: 'radar',
            data: {
                labels: ['Simple Queries', 'Moderate', 'Complex', 'Technical', 'Overall'],
                datasets: [
                    {
                        label: 'AI Support',
                        data: [4.6, 4.2, 3.1, 3.8, 4.2],
                        borderColor: chartColors.secondary,
                        backgroundColor: 'rgba(80, 230, 255, 0.2)',
                        borderWidth: 2
                    },
                    {
                        label: 'Human Support',
                        data: [4.3, 4.5, 4.8, 4.6, 4.5],
                        borderColor: chartColors.accent,
                        backgroundColor: 'rgba(255, 185, 0, 0.2)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1,
                            color: '#8A8A8A',
                            callback: value => value + '/5'
                        },
                        grid: { color: '#404040' },
                        pointLabels: {
                            color: '#C8C8C8',
                            font: { size: 11 }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#C8C8C8' }
                    },
                    tooltip: {
                        backgroundColor: '#1B1B1B',
                        borderColor: chartColors.primary,
                        borderWidth: 1
                    }
                }
            }
        });
    }
}

// Predictions Page - Future Projection
function createFutureProjectionChart() {
    const ctx = document.getElementById('futureProjectionChart');
    if (!ctx) return;

    charts.futureProjection = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
            datasets: [
                {
                    label: 'AI Adoption Rate %',
                    data: [68, 73, 78, 84, 88, 91, 94, 96],
                    borderColor: chartColors.secondary,
                    backgroundColor: 'rgba(80, 230, 255, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y'
                },
                {
                    label: 'AI Capability Score',
                    data: [65, 72, 78, 83, 88, 92, 95, 97],
                    borderColor: chartColors.accent,
                    backgroundColor: 'rgba(255, 185, 0, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y'
                },
                {
                    label: 'Customer Satisfaction',
                    data: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9],
                    borderColor: chartColors.success,
                    backgroundColor: 'rgba(16, 124, 16, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#C8C8C8', padding: 15 }
                },
                tooltip: {
                    backgroundColor: '#1B1B1B',
                    borderColor: chartColors.primary,
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: value => value + '%',
                        color: '#C8C8C8'
                    },
                    grid: { color: '#404040' }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    min: 3,
                    max: 5,
                    ticks: {
                        callback: value => value + '/5',
                        color: '#C8C8C8'
                    },
                    grid: { display: false }
                },
                x: {
                    grid: { color: '#404040' }
                }
            }
        }
    });
}

// Visualization Lab Charts
function createVisualizationLabCharts() {
    // Sentiment Distribution
    const sentCtx = document.getElementById('sentimentDistribution');
    if (sentCtx) {
        charts.sentimentDistribution = new Chart(sentCtx, {
            type: 'polarArea',
            data: {
                labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
                datasets: [{
                    data: [38, 34, 20, 6, 2],
                    backgroundColor: [
                        'rgba(16, 124, 16, 0.7)',
                        'rgba(80, 230, 255, 0.7)',
                        'rgba(255, 185, 0, 0.7)',
                        'rgba(255, 140, 0, 0.7)',
                        'rgba(232, 17, 35, 0.7)'
                    ],
                    borderColor: '#FFFFFF',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: '#C8C8C8', padding: 15 }
                    },
                    tooltip: {
                        backgroundColor: '#1B1B1B',
                        borderColor: chartColors.primary,
                        borderWidth: 1,
                        callbacks: {
                            label: context => context.label + ': ' + context.parsed.r + '%'
                        }
                    }
                },
                scales: {
                    r: {
                        ticks: { color: '#8A8A8A', backdropColor: 'transparent' },
                        grid: { color: '#404040' }
                    }
                }
            }
        });
    }

    // Channel Usage
    const channelCtx = document.getElementById('channelUsage');
    if (channelCtx) {
        charts.channelUsage = new Chart(channelCtx, {
            type: 'bar',
            data: {
                labels: ['AI Chatbot', 'Email', 'Phone', 'Portal', 'Social Media', 'In-App'],
                datasets: [{
                    label: 'Usage %',
                    data: [45, 18, 15, 17, 5, 8],
                    backgroundColor: [
                        chartColors.secondary,
                        chartColors.primary,
                        chartColors.accent,
                        chartColors.purple,
                        chartColors.teal,
                        chartColors.success
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1B1B1B',
                        borderColor: chartColors.primary,
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 50,
                        ticks: { callback: value => value + '%' },
                        grid: { color: '#404040' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // Resolution Time Analysis
    const resCtx = document.getElementById('resolutionTimeAnalysis');
    if (resCtx) {
        charts.resolutionTimeAnalysis = new Chart(resCtx, {
            type: 'line',
            data: {
                labels: ['0-1 min', '1-2 min', '2-5 min', '5-10 min', '10-20 min', '20+ min'],
                datasets: [
                    {
                        label: 'AI Support',
                        data: [45, 32, 18, 4, 1, 0],
                        borderColor: chartColors.secondary,
                        backgroundColor: 'rgba(80, 230, 255, 0.2)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Human Support',
                        data: [2, 8, 25, 35, 22, 8],
                        borderColor: chartColors.accent,
                        backgroundColor: 'rgba(255, 185, 0, 0.2)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: '#C8C8C8' }
                    },
                    tooltip: {
                        backgroundColor: '#1B1B1B',
                        borderColor: chartColors.primary,
                        borderWidth: 1,
                        callbacks: {
                            label: context => context.dataset.label + ': ' + context.parsed.y + '% of cases'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 50,
                        ticks: { callback: value => value + '%' },
                        grid: { color: '#404040' }
                    },
                    x: { grid: { color: '#404040' } }
                }
            }
        });
    }
}

// Dashboard Filters
function applyDashboardFilters() {
    const age = document.getElementById('ageFilter').value;
    const region = document.getElementById('regionFilter').value;
    const supportType = document.getElementById('supportTypeFilter').value;

    // Update KPI values based on filters
    // This is a simulation - in real app, would fetch filtered data
    console.log('Filters applied:', { age, region, supportType });
}

// Visualization Lab Filters
function updateSentimentChart() {
    const industry = document.getElementById('sentimentIndustryFilter').value;
    // Update chart based on industry filter
    console.log('Sentiment filter:', industry);
}

function updateChannelChart() {
    const period = document.getElementById('channelPeriodFilter').value;
    // Update chart based on period filter
    console.log('Channel period:', period);
}

function updateResolutionChart() {
    const complexity = document.getElementById('complexityFilter').value;
    // Update chart based on complexity filter
    console.log('Complexity filter:', complexity);
}

// Accordion Functionality
function toggleAccordion(header) {
    const item = header.parentElement;
    const wasActive = item.classList.contains('active');

    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(accItem => {
        accItem.classList.remove('active');
    });

    // Open clicked item if it wasn't active
    if (!wasActive) {
        item.classList.add('active');
    }
}

// PDF Download Functions
function downloadFullReport() {
    alert('Full report PDF download functionality would be implemented here.\n\nThis would generate a comprehensive PDF containing all research sections, charts, and findings.');
}

function downloadSection(section) {
    alert(`Downloading ${section} section as PDF...\n\nThis would generate a PDF of the ${section} section with all content and visualizations.`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize home page charts
    createAdoptionTimeline();

    // Set up event listeners for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            showPage(pageId);
        });
    });
});

// Responsive sidebar toggle for mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Add mobile menu button if needed
if (window.innerWidth <= 768) {
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    menuBtn.onclick = toggleSidebar;
    document.body.appendChild(menuBtn);
}