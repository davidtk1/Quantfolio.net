// chart.js
function drawPieChart(allocations) {
    
    labels = [];
    percents = [];
    Object.entries(allocations).forEach(([etf, data]) => {
        labels.push(data.etf_name);
        percents.push( data.percent);
    });

    console.log(labels);

    const ctx = document.getElementById('pie-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: Object.values(percents),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E7E9ED', '#C9CBCF', '#F7464A', '#949FB1', '#4D5360', '#AC64AD', '#00A8FF', '#FDB45C'] // Expanded colors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'top' } }
        }
    });
}