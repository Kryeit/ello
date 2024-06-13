const BASE_URL = 'https://kryeit.com:6969/auth';

export async function registerUser(uuid, password) {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'uuidString': uuid,
            'password': password
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}

export async function loginUser(uuid, password) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'uuidString': uuid,
            'password': password
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}
