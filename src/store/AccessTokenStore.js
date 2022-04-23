const ACCESS_TOKEN_KEY = 'access_token'

let accesToken = localStorage.getItem(ACCESS_TOKEN_KEY) || ''

export const setToken = (token) => {
    accesToken = token
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const getAccessToken = () => {
    return accesToken
}

export const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)

    window.location.assign('/login')
}