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

function renderBasket() {  
    basketData= basket.init();
    beasketTbody = document.getElementById('beasketTbody');
    totalBasketPriceVal = 0
    beasketTbody.innerHTML = '';
    Object.entries(basketData).forEach(([etf, data]) => {
        beasketTbody.innerHTML += `<tr><td>${etf}</td><td>${data}</td></tr>`;
        totalBasketPriceVal+=parseFloat(data);
    })
    totalBasketPrice =  document.getElementById('totalBasketPrice');
    totalBasketPrice.innerHTML = `Total Basket Price: $${totalBasketPriceVal.toFixed(2)}`;
}     

renderBasket()


document.getElementById('clearBasketButton').addEventListener('click', async (e) => {
    e.preventDefault();    
    basket.clearBasket();
    renderBasket();     
})

    //;

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
    document.getElementById('equity-bond-split').textContent = `Equity ETF By Sector: ${app.equityPct()}%, Bonds ETF - BND: ${app.bond()}%`;

    // Table
    const table = document.createElement('table');
    table.classList.add('w-full', 'border-collapse', 'text-sm');
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    ['ETF Tickers', 'Allocation (%)', 'Dollar Amount ($)' , 'Add'].forEach(text => {
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
        [
            displayEtf, 
            data.percent.toFixed(2), 
            dollarAmount,   
            `<input type="checkbox" class="Productsticker" name="${etf}" value="${dollarAmount}" >`
        ].forEach((text, index) => {
            const td = row.insertCell();
            if(index==4) {
                td.textContent = text;
            } else {
                td.innerHTML = text;
            }
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


document.getElementById('BasketForm').addEventListener('submit', async (e) => {
    e.preventDefault();     
    const formData = new FormData(e.target);
    
    tickers = document.getElementsByClassName("Productsticker");
    Object.entries(tickers).forEach(([index, ticker]) => {
        if(ticker.checked) {
            basket.addBasketItem(ticker.name, ticker.value);
        }
    }); 
    resultsModal.close();       
    renderBasket();     
    
})

// Close modals
closeModalBtn.addEventListener('click', () => resultsModal.close());
closeErrorBtn.addEventListener('click', () => errorModal.close());
errorOkBtn.addEventListener('click', () => errorModal.close());