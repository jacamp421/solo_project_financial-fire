document.getElementById("fire-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get input values
  const currentAge = parseInt(document.getElementById("current-age").value);
  const retirementAge = parseInt(document.getElementById("retirement-age").value);
  const currentSavings = parseFloat(document.getElementById("current-savings").value);
  const monthlyIncome = parseFloat(document.getElementById("monthly-income").value);
  const monthlySavings = parseFloat(document.getElementById("monthly-savings").value);
  const monthlyExpenses = parseFloat(document.getElementById("monthly-expenses").value);
  const annualReturn = parseFloat(document.getElementById("annual-return").value) || 7;
  const inflationRate = parseFloat(document.getElementById("inflation-rate").value) || 3;

  const yearsToInvest = retirementAge - currentAge;
  const monthsToInvest = yearsToInvest * 12;
  const monthlyReturnRate = (annualReturn / 100) / 12;

  // Future value of current savings + monthly contributions (compound interest formula)
  let futureValue = currentSavings * Math.pow(1 + monthlyReturnRate, monthsToInvest);

  for (let i = 1; i <= monthsToInvest; i++) {
    futureValue += monthlySavings * Math.pow(1 + monthlyReturnRate, monthsToInvest - i);
  }

  // FIRE goal: Annual expenses × 25 (based on 4% withdrawal rate)
  const annualExpenses = monthlyExpenses * 12;
  const fireNumber = annualExpenses * 25;

  const isFireAchieved = futureValue >= fireNumber;

  const resultText = `
    <h2>Results</h2>
    <p><strong>Future Value of Investments at Age ${retirementAge}:</strong> $${futureValue.toFixed(2)}</p>
    <p><strong>FIRE Goal (25× Annual Expenses):</strong> $${fireNumber.toFixed(2)}</p>
    <p><strong>Status:</strong> ${isFireAchieved ? "🎉 You can achieve FIRE by your retirement age!" : "❌ You may need to save more or retire later."}</p>
  `;

  document.getElementById("results").innerHTML = resultText;
});

