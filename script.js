document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculateRevenues);
    // Add listeners for sliders to update output display
    if (input.type === "range") {
        input.addEventListener('input', () => {
            const outputId = input.id + "Output"; // Assumes output has ID matching slider ID + "Output"
            document.getElementById(outputId).textContent = input.value;
        });
    }
});

function calculateRevenues() {
    // Venue Revenue Calculation
    const capacity = parseInt(document.getElementById('capacity').value || 0);
    const sessions = parseInt(document.getElementById('sessions').value || 0);
    const ticketCost = parseInt(document.getElementById('ticketCost').value || 0);
    const venueRevenue = capacity * sessions * ticketCost;
    document.getElementById('venueRevenue').textContent = formatNumber(venueRevenue);

    // Entertainment Fee and RLMFS Payout Calculation
    const players = parseInt(document.getElementById('players').value || 0);
    const buyIn = parseInt(document.getElementById('buyIn').value || 0);
    const gamesHour = parseInt(document.getElementById('gamesHour').value || 0);
    const hoursDay = parseInt(document.getElementById('hoursDay').value || 0);
    const totalWageringHandle = players * buyIn * gamesHour * hoursDay;
    const entertainmentFee = totalWageringHandle * 0.15;
    const rlmfsPayout = totalWageringHandle * 0.85;
    document.getElementById('entertainmentFee').textContent = formatNumber(entertainmentFee);
    document.getElementById('rlmfPayout').textContent = formatNumber(rlmfsPayout);

    // Machine Lease Revenue Calculation
    const rentalFee = parseFloat(document.getElementById('rentalFee').value || 0);
    const locations = parseInt(document.getElementById('locations').value || 0);
    const machinesLocation = parseInt(document.getElementById('machinesLocation').value || 0);
    const machineLeaseRevenue = rentalFee * locations * machinesLocation;
    document.getElementById('machineLeaseRevenue').textContent = formatNumber(machineLeaseRevenue);

    // Advertisement Revenue Calculation
    const advertisers = parseInt(document.getElementById('advertisers').value || 0);
    const avgSpend = parseFloat(document.getElementById('avgSpend').value || 0);
    const adRevenue = advertisers * avgSpend;
    document.getElementById('adRevenue').textContent = formatNumber(adRevenue);

    // Total Daily Revenue Calculation
    const totalDailyRevenue = venueRevenue + entertainmentFee + machineLeaseRevenue + adRevenue;
    document.getElementById('totalDailyRevenue').textContent = formatNumber(totalDailyRevenue);

    // Annual Revenue Calculation
    const operationDays = parseInt(document.getElementById('operationDays').value || 0);
    const totalAnnualRevenue = totalDailyRevenue * operationDays;
    document.getElementById('totalAnnualRevenue').textContent = formatNumber(totalAnnualRevenue);

    // Yearly revenues for individual streams
    document.getElementById('yearlyVenueRevenue').textContent = formatNumber(venueRevenue * operationDays);
    document.getElementById('yearlyEntertainmentFee').textContent = formatNumber(entertainmentFee * operationDays);
    document.getElementById('yearlyMachineLeaseRevenue').textContent = formatNumber(machineLeaseRevenue * operationDays);
    document.getElementById('yearlyAdRevenue').textContent = formatNumber(adRevenue * operationDays);
    document.getElementById('yearlyRLMFSPayouts').textContent = formatNumber(rlmfsPayout * operationDays);
}

function formatNumber(number) {
    return `$${number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

// Initialize all inputs to default values for initial calculation
window.onload = () => {
    initInputsAndOutputs();
    calculateRevenues(); // Perform an initial calculation
};

function initInputsAndOutputs() {
    // Set default values and synchronize output displays
    const inputs = [
        { id: 'capacity', value: 1500 },
        { id: 'sessions', value: 3 },
        { id: 'ticketCost', value: 50 },
        { id: 'players', value: 5000 },
        { id: 'buyIn', value: 50 },
        { id: 'gamesHour', value: 3 },
        { id: 'hoursDay', value: 12 },
        { id: 'rentalFee', value: 100 },
        { id: 'locations', value: 500 },
        { id: 'machinesLocation', value: 25 },
        { id: 'advertisers', value: 25 },
        { id: 'avgSpend', value: 10000 },
        { id: 'operationDays', value: 365 }
    ];
    inputs.forEach(inputInfo => {
        const input = document.getElementById(inputInfo.id);
        input.value = inputInfo.value; // Set default value
        if (input.type === 'range') {
            const outputId = input.id + "Output";
            document.getElementById(outputId).textContent = input.value; // Initialize output display
        }
    });
}