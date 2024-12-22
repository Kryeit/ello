const IP_ADDRESSES = {
    production: 'https://kryeit.com',
    development: 'http://localhost:6969'
};

function isProduction() {
    return true;
}

function getIpAddress() {
    if (isProduction()) {
        return IP_ADDRESSES.production;
    } else {
        return IP_ADDRESSES.development;
    }
}

export { IP_ADDRESSES, getIpAddress, isProduction};