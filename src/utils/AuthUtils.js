import axios from 'axios';

export async function checkLogin() {
    let token = localStorage.getItem('token');
    if (token == null || token == '') {
        return false
    } else {
        let apiUrl = import.meta.env.VITE_STINFO_BACKEND_API_URL
        let response = await axios.post(`${apiUrl}/auth/checkLogin`, {
            token: token
        });

        if (response.data.status === '200' && response.data.data === true) {
            return true;
        } else {
            return false;
        }
    }
}

export async function login(username, password) {
    let apiUrl = import.meta.env.VITE_STINFO_BACKEND_API_URL
    let response = await axios.post(`${apiUrl}/auth/login`,
        {
            username: username,
            password: password
        }
    )
    
    return response
}

export function logout() {
    localStorage.removeItem('token')
}