export function extractTime(dateString) {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        console.error('Invalid date format');
        throw new Error('Invalid date format');
    }

    const hours24 = date.getHours();
    const minutes = padZero(date.getMinutes());
    
    // Convert to 12-hour format
    const hours12 = hours24 % 12 || 12; // Convert 0 hours to 12
    const formattedHours = padZero(hours12);

    
    return `${formattedHours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
    return number.toString().padStart(2, "0");
}
