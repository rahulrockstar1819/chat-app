export const getMessageDate = (dateString) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Format dates for comparison
    const isToday = messageDate.toDateString() === today.toDateString();
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    if (isToday) {
        return "Today";
    } else if (isYesterday) {
        return "Yesterday";
    } else {
        // Return formatted date (e.g., "Monday" or "October 29")
        return messageDate.toLocaleDateString(undefined, { weekday: 'long' });
    }
};
