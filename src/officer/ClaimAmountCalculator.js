// ClaimAmountCalculator.js
// Pure frontend calculation for claim amount (for preview or estimation only)
// This should match the backend logic for consistency.

export function calculateClaimAmount(policyType, coverageAmount, vehicleType) {
    let claimAmount = 0;
    switch (policyType?.toLowerCase()) {
        case "comprehensive":
            if (vehicleType?.toLowerCase() === "car") {
                claimAmount = coverageAmount * 0.8;
            } else if (vehicleType?.toLowerCase() === "bike") {
                claimAmount = coverageAmount * 0.7;
            }
            break;
        case "third party":
            if (vehicleType?.toLowerCase() === "car") {
                claimAmount = 20000;
            } else if (vehicleType?.toLowerCase() === "bike") {
                claimAmount = 10000;
            }
            break;
        case "own damage":
            if (vehicleType?.toLowerCase() === "car") {
                claimAmount = coverageAmount * 0.6;
            } else if (vehicleType?.toLowerCase() === "bike") {
                claimAmount = coverageAmount * 0.5;
            }
            break;
        default:
            claimAmount = 0;
    }
    return claimAmount;
}
