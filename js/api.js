const BASE_URL = 'https://fakestoreapi.com'

export async function fetchData(endpoint){
    try{
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if(!response.ok){
            throw new Error(`Network connection error: ${response.status}`);
        }
        return await response.json();
    }
    catch(error){
        console.error("Fetch API error", error);
        throw error;
    }
}