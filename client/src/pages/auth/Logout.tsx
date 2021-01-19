import { useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useCurrentUser } from "../../state/AppState"

export const Logout = () => {
    const { setUser } = useCurrentUser();

    useEffect(() => {
        if (!setUser) return;
        setUser(null);
    }, [setUser]);

    return <Redirect to='/' />
}
