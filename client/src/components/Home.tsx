import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "./Toaster";

interface secretType {
    userId: string,
    text: string,
}

const Home = () => {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("");
    const [username, setUsername] = useState("");
    const [loggedId, setLoggedId] = useState("")
    const [secrets, setSecrets] = useState<secretType[]>([]);
    const storedToken = localStorage.getItem("token");

    const verifyToken = async () => {
        console.log('verifying token');

        if (storedToken) {
            try {
                const { data } = await axios.post(
                    "http://localhost:5500/verify",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    }
                );

                const { status, user, userId } = data;
                setUsername(user);
                setLoggedId(userId);

                if (!status) {
                    console.log("Token verification failed. Redirecting to login...");
                    localStorage.removeItem("token"); // Clear the token
                    navigate("/login");
                } else {
                    console.log("Token verified. Welcome!");
                    notifySuccess(`Hello ${user}`);
                }
            } catch (error) {
                console.error("Error during token verification:", error);
            }
        } else {
            console.log("Redirecting to login...");
            navigate("/login");
            return;
        }


    };

    const getSecrets = async () => {
        const results = (await axios.get("http://localhost:5500/secrets")).data.results
        // console.log(results);
        setSecrets(results)
    }

    useEffect(() => {
        getSecrets()
    }, [])

    useEffect(() => {
        verifyToken()
    }, []);



    const logout = () => {
        console.log("Clearing token");
        localStorage.removeItem("token"); // Clear the token
        navigate("/login");
    };

    return (
        <div className="flex flex-col justify-center bg-gray-800 text-white p-4 h-screen items-center">
            <h4>
                Welcome <span className="text-blue-500">{username}</span>
            </h4>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 mt-2">LOGOUT</button>

            <input
                value={inputText}
                type="text"
                name=""
                id=""
                onChange={(e) => (setInputText(e.target.value))}
                className="border rounded px-2 py-1 mt-4 text-black"
            />

            {secrets.filter(secret => (secret.userId === loggedId)).map(secret => (
                <div key={secret.userId} className="mt-4 border border-red-300">
                    {secret.text}
                </div>
            ))}

            {secrets.filter(secret => (secret.userId !== loggedId)).map(secret => (
                <div key={secret.userId} className="mt-4">
                    {secret.text}
                </div>
            ))}
        </div>
    );
};

export default Home;
