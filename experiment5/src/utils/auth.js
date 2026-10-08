// Simulates secure password hashing using the browser's Web Crypto API
export async function hashPassword(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Mock Database using LocalStorage
export function registerUser(name, email, hashedPassword) {
    const users = JSON.parse(localStorage.getItem('experiment5_users') || '{}');
    if (users[email]) {
        return { error: 'Email already exists.' };
    }
    users[email] = { name, email, hash: hashedPassword };
    localStorage.setItem('experiment5_users', JSON.stringify(users));
    return { success: true, user: { name, email } };
}

export function authenticateUser(email, hashedPassword) {
    const users = JSON.parse(localStorage.getItem('experiment5_users') || '{}');
    const user = users[email];
    if (user && user.hash === hashedPassword) {
        return { success: true, user: { name: user.name, email: user.email } };
    }
    return { error: 'Invalid email or password.' };
}

