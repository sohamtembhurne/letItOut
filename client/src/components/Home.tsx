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
        <>
            <div className="home_page">
                <h4>
                    Welcome <span>{username}</span>
                </h4>
                <button onClick={logout}>LOGOUT</button>

                <input
                    type="text"
                    name=""
                    id="" />

                {secrets.filter(secret => (secret.userId === loggedId)).map(secret => (
                    <div>
                        {secret.text}
                    </div>
                ))}

                {secrets.filter(secret => (secret.userId !== loggedId)).map(secret => (
                    <div>
                        {secret.text}
                    </div>
                )
                )}
            </div>
        </>
    );
};

export default Home;
