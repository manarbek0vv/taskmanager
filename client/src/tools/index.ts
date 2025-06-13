export const getFormattedDate = (value: string) => {
    if (!value.length) return `DD/MM/YYYY`
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear()).padStart(4, '0')
    return `${day}/${month}/${year}`;
}

export const getStringFormattedDate = (value: string, day?: true) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date(value);
    const fullDay = getEndingDate(date.getDate());
    const month = months[date.getMonth()];
    return `${day ? `${days[date.getDay()]} ` : ''}${fullDay} ${month} ${date.getFullYear()}`;
}

const getEndingDate = (day: number) => {
    const lastDigit = day % 10;
    if (lastDigit && day !== 11) return `${day}st`;
    else if (lastDigit && day !== 12) return `${day}nd`;
    else if (lastDigit && day !== 13) return `${day}rd`;
    else return `${day}th`
}