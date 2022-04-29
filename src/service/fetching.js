export const getPosts = async () => {

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
            throw new Error(`Could not fetch 'https://jsonplaceholder.typicode.com/posts', status: ${response.status}`);
        }

        const data = await response.json();
        
        return data;

    } catch (err) {
        return Promise.reject(err.message);
    }
}