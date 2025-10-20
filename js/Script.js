// ETF Lists
const sectorETFs = [
    { name: 'Energy', ticker: 'XLE' },
    { name: 'Materials', ticker: 'XLB' },
    { name: 'Industrials', ticker: 'XLI' },
    { name: 'Consumer Discretionary', ticker: 'XLY' },
    { name: 'Consumer Staples', ticker: 'XLP' },
    { name: 'Health Care', ticker: 'XLV' },
    { name: 'Financials', ticker: 'XLF' },
    { name: 'Information Technology', ticker: 'XLK' },
    { name: 'Communication Services', ticker: 'XLC' },
    { name: 'Utilities', ticker: 'XLU' },
    { name: 'Real Estate', ticker: 'XLRE' }
];

const capETFs = [
    { name: 'Mega Cap', ticker: 'MGC' },
    { name: 'Large Cap', ticker: 'VOO' },
    { name: 'Mid Cap', ticker: 'VO' },
    { name: 'Small Cap', ticker: 'VB' }
];

// Fake API for async communication (mock server)
async function fakeAPI(endpoint, params) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (endpoint === 'allocation') {
                resolve({ success: true, data: 'Mock allocation data' });
            } else if (endpoint === 'stockData') {
                // Mock fundamental data for calculations
                resolve({
                    currentAssets: 100000,
                    currentLiabilities: 50000,
                    totalAssets: 200000,
                    retainedEarnings: 80000,
                    ebit: 30000,
                    marketValueEquity: 150000,
                    totalLiabilities: 100000,
                    sales: 200000,
                    netIncome: 20000,
                    totalReceivables: 30000,
                    totalCurrentAssets: 100000,
                    totalCurrentLiabilities: 50000,
                    depreciation: 10000,
                    totalDebt: 50000,
                    cash: 40000,
                    workingCapital: 50000,
                    costOfDebt: 0.05,
                    taxRate: 0.21,
                    beta: 1.2,
                    riskFreeRate: 0.03,
                    marketPremium: 0.05,
                    freeCashFlow: [10000, 12000, 15000, 20000, 25000],
                    growthRate: 0.03,
                    discountRate: 0.08
                });
            }
            resolve({ error: 'Invalid endpoint' });
        }, 500); // Simulate network delay
    });
}

// Allocation Logic
function getAgeGroup(age) {
    if (age < 30) return 'aggressive';
    if (age <= 50) return 'balanced';
    return 'conservative';
}

function getSectorAllocation(ageGroup) {
    const allocations = {
        aggressive: { XLK: 20, XLY: 15, XLC: 15, XLF: 10, XLI: 10, XLV: 10, XLB: 5, XLE: 5, XLRE: 5, XLU: 3, XLP: 2 },
        balanced: { XLK: 15, XLY: 10, XLC: 10, XLF: 10, XLI: 10, XLV: 10, XLB: 10, XLE: 10, XLRE: 5, XLU: 5, XLP: 5 },
        conservative: { XLP: 20, XLU: 15, XLV: 15, XLP: 10, XLU: 10, XLRE: 10, XLF: 5, XLI: 5, XLB: 5, XLE: 3, XLY: 2 }
    };
    return allocations[ageGroup];
}

function getCapAllocation(ageGroup) {
    const allocations = {
        aggressive: { VB: 30, VO: 30, VOO: 20, VTI: 20 },
        balanced: { VB: 20, VO: 25, VOO: 30, VTI: 25 },
        conservative: { VB: 10, VO: 15, VOO: 40, VTI: 35 }
    };
    return allocations[ageGroup];
}

// Financial Calculations
function calculateAltmanZScore(data) {
    const X1 = (data.currentAssets - data.currentLiabilities) / data.totalAssets;
    const X2 = data.retainedEarnings / data.totalAssets;
    const X3 = data.ebit / data.totalAssets;
    const X4 = data.marketValueEquity / data.totalLiabilities;
    const X5 = data.sales / data.totalAssets;
    return 1.2 * X1 + 1.4 * X2 + 3.3 * X3 + 0.6 * X4 + 1.0 * X5;
}

function calculatePiotroskiScore(data) {
    let score = 0;
    score += data.netIncome > 0 ? 1 : 0;
    score += data.cashFromOperations > 0 ? 1 : 0;
    score += data.returnOnAssets > 0 ? 1 : 0; // Assume calculated
    // Simplified: add more criteria as needed, max 9
    return score; // Mock partial
}

function calculateWACC(data) {
    const costOfEquity = data.riskFreeRate + data.beta * data.marketPremium;
    const debtRatio = data.totalDebt / (data.totalDebt + data.marketValueEquity);
    const equityRatio = 1 - debtRatio;
    return (equityRatio * costOfEquity) + (debtRatio * data.costOfDebt * (1 - data.taxRate));
}

function calculateCAPM(data) {
    return data.riskFreeRate + data.beta * data.marketPremium;
}

function calculateDCF(data) {
    let presentValue = 0;
    data.freeCashFlow.forEach((fcf, i) => {
        presentValue += fcf / Math.pow(1 + data.discountRate, i + 1);
    });
    const terminalValue = data.freeCashFlow[data.freeCashFlow.length - 1] * (1 + data.growthRate) / (data.discountRate - data.growthRate);
    presentValue += terminalValue / Math.pow(1 + data.discountRate, data.freeCashFlow.length);
    return presentValue;
}

function calculateIntrinsicValue(dcf, shares) {
    return dcf / shares; // Assume shares from data
}

// Handle Allocation Form
document.getElementById('allocation-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const age = parseInt(document.getElementById('age').value);
    const salary = parseFloat(document.getElementById('salary').value);
    const loan = parseFloat(document.getElementById('loan').value) * 12; // Annualize
    const expenses = parseFloat(document.getElementById('expenses').value) * 12; // Annualize

    const disposable = salary - loan - expenses;
    const stockPercent = 110 - age;
    const bondPercent = 100 - stockPercent; // Assume simple
    const ageGroup = getAgeGroup(age);

    await fakeAPI('allocation'); // Simulate async call

    const sectorAlloc = getSectorAllocation(ageGroup);
    const capAlloc = getCapAllocation(ageGroup);

    let resultHTML = `<p>Disposable Income: $${disposable.toFixed(2)}</p>
        <p>Stock Allocation: ${stockPercent}% | Bond: ${bondPercent > 0 ? bondPercent : 0}%</p>
        <h3>Sector Allocations:</h3><ul>`;
    for (let ticker in sectorAlloc) {
        resultHTML += `<li>${ticker}: ${sectorAlloc[ticker]}%</li>`;
    }
    resultHTML += `</ul><h3>Cap Allocations:</h3><ul>`;
    for (let ticker in capAlloc) {
        resultHTML += `<li>${ticker}: ${capAlloc[ticker]}%</li>`;
    }
    resultHTML += `</ul>`;

    const resultDiv = document.getElementById('allocation-result');
    resultDiv.innerHTML = resultHTML;
    resultDiv.classList.remove('hidden');
});

// Handle Analysis Form
document.getElementById('analysis-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const ticker = document.getElementById('ticker').value.toUpperCase();
    const apiKey = document.getElementById('L3SR10J5BK54BN4K').value || 'demo'; // Use demo or real

    let data;
    if (apiKey === 'demo') {
        data = await fakeAPI('stockData', { ticker });
    } else {
        // Real API calls (simplified; in practice, fetch balance_sheet, income_statement, etc.)
        const balance = await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${ticker}&apikey=${apiKey}`).then(res => res.json());
        const income = await fetch(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=${apiKey}`).then(res => res.json());
        const cash = await fetch(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${ticker}&apikey=${apiKey}`).then(res => res.json());
        const overview = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`).then(res => res.json());
        // Extract needed fields (simplified; map from quarterlyReports[0])
        data = {
            currentAssets: parseFloat(balance.quarterlyReports[0].totalCurrentAssets),
            currentLiabilities: parseFloat(balance.quarterlyReports[0].totalCurrentLiabilities),
            totalAssets: parseFloat(balance.quarterlyReports[0].totalAssets),
            retainedEarnings: parseFloat(balance.quarterlyReports[0].retainedEarnings),
            ebit: parseFloat(income.quarterlyReports[0].ebit),
            marketValueEquity: parseFloat(overview.MarketCapitalization),
            totalLiabilities: parseFloat(balance.quarterlyReports[0].totalLiabilities),
            sales: parseFloat(income.quarterlyReports[0].totalRevenue),
            // Add more as needed
            beta: parseFloat(overview.Beta),
            // Defaults for others
            riskFreeRate: 0.03,
            marketPremium: 0.05,
            costOfDebt: 0.05,
            taxRate: 0.21,
            growthRate: 0.03,
            discountRate: 0.08,
            freeCashFlow: [10000, 12000, 15000, 20000, 25000] // Mock; calculate from cash flow
        };
    }

    const zScore = calculateAltmanZScore(data);
    const piotroski = calculatePiotroskiScore(data);
    const wacc = calculateWACC(data);
    const capm = calculateCAPM(data);
    const dcf = calculateDCF(data);
    const intrinsic = calculateIntrinsicValue(dcf, 1000000); // Mock shares

    let resultHTML = `<p>Altman Z-Score: ${zScore.toFixed(2)} (Bankruptcy Risk: ${zScore < 1.8 ? 'High' : zScore < 3 ? 'Medium' : 'Low'})</p>
        <p>Piotroski Score: ${piotroski}</p>
        <p>Undervalued: ${intrinsic > data.marketValueEquity / 1000000 ? 'Yes' : 'No'} (Intrinsic: $${intrinsic.toFixed(2)})</p>
        <p>WACC: ${(wacc * 100).toFixed(2)}%</p>
        <p>CAPM Expected Return: ${(capm * 100).toFixed(2)}%</p>
        <p>DCF Value: $${dcf.toFixed(2)}</p>`;

    const resultDiv = document.getElementById('analysis-result');
    resultDiv.innerHTML = resultHTML;
    resultDiv.classList.remove('hidden');
});