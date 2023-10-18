import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/employee/employeeSlice";

function OAuth() {
  const dispatch = useDispatch();
  async function handleGoogleclick() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.employee.displayName,
          email: result.employee.email,
          photo: result.employee.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("could not login with google", error);
    }
  }
  return (
    <button
      type="button"
      onClick={handleGoogleclick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}

export default OAuth;
