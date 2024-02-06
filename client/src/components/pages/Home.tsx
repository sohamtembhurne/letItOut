import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../common/Toaster";

interface secretType {
    userId: string,
    text: string,
}

const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
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
                navigate("/login");
            }
        } else {
            console.log("Redirecting to login...");
            navigate("/login");
            return;
        }


    };

    const getSecrets = async () => {
        try {
            const results = (await axios.get("http://localhost:5500/secrets")).data.results
            // console.log(results);
            setSecrets(results)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getSecrets()
    })

    useEffect(() => {
        verifyToken()
    }, []);

    const handleUpdate = async () => {
        if (inputText.trim() === "") {
            notifyError('New secret empty');
            return;
        }
        try {
            await axios.put('http://localhost:5500/secrets', {
                content: inputText
            },
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });
            getSecrets();
            setInputText("");
            notifySuccess("Secret updated successfully");
        } catch (err) {
            console.error(err);
            notifyError("Failed to update secret");
        }
    };


    const logout = () => {
        console.log("Clearing token");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex flex-col bg-gradient-to-br from-purple-800 to-blue-600 text-white p-4 h-screen items-center">
            <div className="flex justify-between w-full">
                <h4>
                    Welcome <span className="text-blue-300">{username}</span>
                </h4>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 mt-2">LOGOUT</button>
            </div>
    
            <div className="flex flex-col justify-center items-center my-auto">
    
                <h3 className="text-lg font-semibold mt-4">Enter your new secret in this box</h3>
    
                <input
                    value={inputText}
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => (setInputText(e.target.value))}
                    className="border rounded px-3 py-2 mt-2 text-black"
                />
                <button type="button" onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2">Update Secret</button>
    
    
                {loading ? (
                    <div className="mt-4 border border-gray-600 animate-pulse p-4 rounded">
                        Loading...
                    </div>
                ) : (
                    <>
                        {secrets.filter((secret) => secret.userId === loggedId).map((secret) => (
                            <div key={secret.userId} className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-xl">
                                {secret.text}
                            </div>
                        ))}
    
                        {secrets.filter((secret) => secret.userId !== loggedId).map((secret) => (
                            <div key={secret.userId} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-xl">
                                {secret.text}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
    
};

export default Home;
