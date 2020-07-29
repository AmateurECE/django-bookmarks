///////////////////////////////////////////////////////////////////////////////
// NAME:            Ajax.js
//
// AUTHOR:          Ethan D. Twardy <edtwardy@mtu.edu>
//
// DESCRIPTION:     Implements some basic utilities for ajax calls
//
// CREATED:         07/29/2020
//
// LAST EDITED:     07/29/2020
////

export class Ajax {
    static async doFetch(url, method, headers, body=undefined) {
        const response = await fetch(url, {method, headers, body});
        if (!response.ok) {
            throw new Error('Request to server failed');
        }

        if (method != 'DELETE') {
            return await response.json();
        }

        return {};
    }

    static getHeaders({csrfToken, apiKey, method}) {
        let headers = {};
        if (csrfToken) { headers['X-CSRFToken'] = csrfToken; }
        if (apiKey) { headers['Authorization'] = `Token ${apiKey}`; }

        const contentType = 'application/json';
        if (method && (method == 'PUT' || method == 'DELETE'
                       || method == 'POST')) {
            headers['Content-Type'] = contentType;
        } else if (method && method == 'GET') {
            headers['Accept'] = contentType;
        }
        return headers;
    }

    static async post(url, csrfToken, apiKey, body) {
        const headers = Ajax.getHeaders({csrfToken, apiKey, method: 'POST'});
        return await Ajax.doFetch(url, 'POST', headers, body);
    }

    static async put(url, csrfToken, apiKey, body) {
        const headers = Ajax.getHeaders({csrfToken, apiKey, method: 'PUT'});
        return await Ajax.doFetch(url, 'PUT', headers, body);
    }

    static async delete(url, csrfToken, apiKey) {
        const headers = Ajax.getHeaders({csrfToken, apiKey, method: 'DELETE'});
        return await Ajax.doFetch(url, 'DELETE', headers);
    }

    static async get(url, apiKey) {
        const headers = Ajax.getHeaders({apiKey, method: 'GET'});
        return await Ajax.doFetch(url, 'GET', headers);
    }
}

///////////////////////////////////////////////////////////////////////////////
