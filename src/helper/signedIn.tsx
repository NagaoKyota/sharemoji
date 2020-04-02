import { auth } from "../firebase";

const signedIn = auth.currentUser;

export { signedIn };
