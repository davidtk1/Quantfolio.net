Quantfolio.net
Overview
Quantfolio.net is a web application designed to help novice investors with stock allocation and risk-free investing advice. Users enter their age, salary, loan payments, and expenses to receive a recommended stock allocation (110 - age)% and financial analysis of sample stocks, including Altman Z-Score, Piotroski Score, WACC, CAPM, DCF, and intrinsic value.
Features

User input form for age, salary, loan payments, and expenses.
Stock allocation based on age (110 - age) with sector and market cap breakdowns.
Financial analysis using fake API data (Russell 3000 tickers and metrics).
Responsive design with Tailwind CSS and Chart.js pie charts.
CSS animations and Google Fonts (Poppins).

Setup

Clone the repository: git clone https://github.com/yourusername/Quantfolio.net.git
Open index.html with VSCode's Live Server extension.
Ensure data/russell3000.json and data/financials.json are in the data/ folder.

Project Structure

index.html: Main page with form, allocation, and analysis sections.
css/styles.css: Custom CSS with animations.
js/main.js: Logic for calculations, charts, and data fetching.
data/: JSON files for tickers and financial data.
assets/: Images and other resources.

Requirements

Visual Studio Code with Live Server extension.
Modern web browser.
Git for version control.

Usage

Open index.html with Live Server.
Enter financial details and submit.
View stock allocation pie charts and financial analysis cards.

License
MIT License
