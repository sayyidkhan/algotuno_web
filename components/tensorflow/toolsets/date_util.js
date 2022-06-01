function next_week(curr_date, no_of_week) {
    let total_days = no_of_week * 7;

    let today = new Date(curr_date);
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + total_days).toISOString();
}

function next_day(curr_date) {
    let today = new Date(curr_date);
    let nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    return nextDay;
}

export {
    next_week,
    next_day
};

