import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { addUser, removeUser } from "../store/userSlice";
import "../utils/firebase";
import USER_AVTAR from "../assets/Profile-Icon.jpg";


export const signUp = async (email, password, fullName, dispatch) => {
    const auth = getAuth();

    try {
        await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: USER_AVTAR
        });

        await auth.currentUser.reload();

        const freshUser = auth.currentUser;

        const formattedUser = {
            uid: freshUser.uid,
            email: freshUser.email,
            displayName: freshUser.displayName,
            photoURL: freshUser.photoURL
        };

        dispatch(addUser(formattedUser));

        return { user: formattedUser };

    } catch (error) {
        return {
            error: {
                code: error.code,
                message: error.message,
            },
        };
    }
};


export const signIn = async (email, password) => {
    const auth = getAuth();

    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password);
        return userCredential.user;
    } catch (error) {

        return {
            error: {
                code: error.code,
                message: error.message
            }
        }
    }
}


export const signOutUser = async () => {
    const auth = getAuth();

    try {
        await signOut(auth);
        return { message: "User sign out sucessfully" };
    } catch (error) {
        return {
            error: {
                code: error.code,
                message: error.message
            }
        }
    }

}



export const listenToAuthChanges = (dispatch, navigate) => {
    const auth = getAuth();

    return onAuthStateChanged(auth, (user) => {
        if (user) {
            const formattedUser = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            }
            dispatch(addUser(formattedUser));
            // appRouter.navigate("/browse");
            navigate("/browse")

        }
        else {
            dispatch(removeUser());
            // appRouter.navigate("/");
            navigate("/")
        }
    });
};

