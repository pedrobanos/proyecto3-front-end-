import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getCurrentGarage } from "../services/GarageService";
import { getAccessToken, logout, setToken } from "../store/AccessTokenStore";
import { verifyJWT } from "../utils/jwtHelper";



export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {

    const [garage, setGarage] = useState()
    const [isAuthenticationFetched, setIsAuthenticationFetched] = useState(false)

    const login = (token, navigateCb) => {
        setToken(token)
        getGarage(navigateCb)

    }
    const getGarage = (callaback) => {
        getCurrentGarage()
            .then(garage => {
                setGarage(garage)
                setIsAuthenticationFetched(true)
                callaback && callaback()
            })
    }
    useEffect(() => {
        // Si existe token, me traigo al usuario
        if (getAccessToken()) {
            if (!verifyJWT(getAccessToken())) {
                logout()
            } else {
                getGarage()
            }
        } else {
            setIsAuthenticationFetched(true)
        }
    }, [])

    const value  = {
        garage,
        isAuthenticationFetched,
        login,
        getGarage
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext