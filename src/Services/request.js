export const baseUrl = "http://localhost:3030/api";

export const request = async (url, method, data) => {

    try {
        let response;
        if (method === "GET") {
            response = await fetch(url, {
                credentials: 'include'
            });
        } else {
            response = await fetch(url, {
                method,
                credentials: 'include',
                headers: { "Content-type": "Application/json" },
                body: JSON.stringify(data)
            });
        }

        if (response.ok !== true) {
            throw await response.json();
        }

        try {
            const result = await response.json();
            return result;
        } catch (err) {
            throw err;
        }

    } catch (err) {
        throw err.message;
    }
};