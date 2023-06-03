async function getResource(url, callback) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    const data = await res.json();
    callback(data);
}

export { getResource };