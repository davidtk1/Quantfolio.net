// main.js
const resultsModal = document.getElementById('results-modal');
const errorModal = document.getElementById('error-modal');
const closeModalBtn = document.getElementById('close-modal');
const closeErrorBtn = document.getElementById('close-error');
const errorOkBtn = document.getElementById('error-ok');
const errorMessage = document.getElementById('error-message');



function showError(msg) {
    errorMessage.textContent = msg;
    errorModal.showModal();
}

document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const salary = parseFloat(document.getElementById('salary').value);
    const loan = parseFloat(document.getElementById('loan').value);
    const expenses = parseFloat(document.getElementById('expenses').value);
    

    app.init (age,salary,loan,expenses);
    const  allocations = app.caluculate();  

    // Display
    document.getElementById('disposable-income').textContent = `Discretionary Income: $${app.InvestingAmount().toFixed(2)}`;
    document.getElementById('equity-bond-split').textContent = `Equity: ${app.equityPct()}%, Bonds: ${app.bond()}%`;

    // Table
    const table = document.createElement('table');
    table.classList.add('w-full', 'border-collapse', 'text-sm');
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    ['ETF', 'Allocation (%)', 'Dollar Amount ($)'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        th.classList.add('border', 'p-2', 'bg-gray-200', 'text-left');
        headerRow.appendChild(th);
    });
    const tbody = table.createTBody();
    Object.entries(allocations).forEach(([etf, data]) => {
        const fullName = data.etf_name || 'Unknown ETF';
        const displayEtf = `${etf} - ${fullName}`;
        const dollarAmount = (app.InvestingAmount() * (data.percent / 100)).toFixed(2);
        const row = tbody.insertRow();
        [displayEtf, data.percent.toFixed(2), dollarAmount].forEach((text, index) => {
            const td = row.insertCell();
            td.textContent = text;
            td.classList.add('border', 'p-2');
            if (index > 0) td.classList.add('text-right');
        });
    });
    document.getElementById('allocation-table').innerHTML = '';
    document.getElementById('allocation-table').appendChild(table);

    // Show results
    resultsModal.showModal();

    // Chart
    const canvas = document.getElementById('pie-chart');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    drawPieChart(allocations);
  
   
});

// Close modals
closeModalBtn.addEventListener('click', () => resultsModal.close());
closeErrorBtn.addEventListener('click', () => errorModal.close());
errorOkBtn.addEventListener('click', () => errorModal.close());