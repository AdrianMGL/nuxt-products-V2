export const useAuthentication = () => {
    const { loggedIn, session, user, clear, fetch } = useUserSession();

    /** */
    const login = async (email: string, password: string) => {
        try {
            await $fetch('/api/auth/login', {
                method: 'POST',
                body: { email, password },
            });

            await fetch();
            navigateTo('/?message=Login Successfully');

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /** */
    const register = async (fullName: string, email: string, password: string) => {

        return true;
    }

    /** */
    const logout = async () => {
        await clear();

        navigateTo('/?message=Logout Successfully');
    }


    return {
        loggedIn,
        session,
        user,

        // getters
        isLoggedIn: loggedIn,
        isAdmin: computed(() => user.value?.roles.includes('admin')),

        // methods, acciones
        fetch,
        login,
        register,
        logout,
    }
}