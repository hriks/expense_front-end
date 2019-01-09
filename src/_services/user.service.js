import { authHeader, config } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getGroups,
    getById,
    addBill,
    addGroup
};

function login(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    };

    return fetch(config.apiUrl + '/api/login/', requestOptions)
        .then(handleResponse, handleError)
        .then(user => {
            // login successful if there's a access_token token in the response
            if (user.username && user.access_token) {
                // store user details and access_token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    var data = {
        username: user.username, email: user.email
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(config.apiUrl + '/api/signup/', requestOptions)
        .then(handleResponse, handleError)
        .then(response=> {
            return response;
        })
}


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/details/', requestOptions)
    .then(handleResponse, handleError)
    .then(response => {
        return response;
    });
}

function getGroups() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(config.apiUrl + '/api/retrieve/groups', requestOptions)
    .then(handleResponse, handleError)
    .then(response=> {
        return response;
    })
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function addBill(group_id, amount) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({'group': group_id, 'amount': amount})
    };

    return fetch(config.apiUrl + '/api/create/bill/', requestOptions)
    .then(handleResponse, handleError)
    .then(response=> {
        return response;
    })
}

function addGroup(group_type, group_users, groupname) {
    var user_ids = []
    group_users.map((row, index) =>{
        user_ids.push(row.value)
    })
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({'group_type': group_type, 'name': groupname, 'users': user_ids})
    };

    return fetch(config.apiUrl + '/api/create/group/', requestOptions)
    .then(handleResponse, handleError)
    .then(response=> {
        return response;
    })
}


function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            if (response.url.includes('signup')) {
                response.json().then(resp => reject(resp.email));
            } else {
                response.json().then(resp => reject(resp.detail));
            }
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.detail);
}