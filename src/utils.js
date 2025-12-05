export function ordinal(i) {
    let mod100 = i % 100;
    let mod10 = i % 10;
    if (mod10 === 1 && mod100 !== 11) return i + "st";
    else if (mod10 === 2 && mod100 !== 12) return i + "nd";
    else if (mod10 === 3 && mod100 !== 13) return i + "rd";
    return i + "th";
}

export function formatDate(date) {
    date = new Date(date);
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return `${dd}.${mm}.${(date.getFullYear())}`;
}

export function areStringArraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
