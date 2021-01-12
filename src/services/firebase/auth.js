import { auth } from '@/plugins/firebase';

export const signIn = async (email, passw) => {
  try {
    return await auth.signInWithEmailAndPassword(email, passw);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const logOut = async () => {
  try {
    return await auth.signOut();
  } catch (err) {
    return Promise.reject(err);
  }
};

export const regFirebase = async (email, passw) => {
  try {
    return await auth.createUserWithEmailAndPassword(email, passw).currentUser;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const resetPassword = async (email) => {
  try {
    return await auth.sendPasswordResetEmail(email);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getFirebaseUserToken = async () => {
  try {
    return await auth.currentUser.getIdToken();
  } catch (err) {
    return Promise.reject(err);
  }
};
