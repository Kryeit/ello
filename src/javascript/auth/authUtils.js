async function getMinecraftUsername(UUID) {
    try {
        const response = await fetch(`/api/players/${UUID}`);
        if (!response.ok) {
            return 'Failed to fetch username';
        }
        const data = await response.json();
        return data && data.name ? data.name : 'Username not found';
    } catch (error) {
        return 'Failed to fetch username';
    }
}

export { getMinecraftUsername };