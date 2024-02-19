import "./register.css"
import { useState } from "react";
import axios from "axios"

export default function Register() {
    const [userRegister, setUserRegister] = useState({
        name: "",
        email: "",
        password: ""
    });
    const handleChange = (event) => {
        setUserRegister({
            ...userRegister,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (userRegister.name === "" || userRegister.email === "" || userRegister.password === "") {
            alert("plz add all filed")
        } else {
            const res = await axios.post("http://localhost:3310/api/user/register", userRegister)

            alert(res.data.message)
            setUserRegister({
                name: "",
                email: "",
                password: ""
            })
        }

    }

    return (
        <div className="container">
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />
                <div className="signup">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="chk" aria-hidden="true">
                            Sign up
                        </label>
                        <input value={userRegister.name} type="text" name="name" placeholder="User name" required="true" onChange={handleChange} />
                        <input value={userRegister.email} type="email" name="email" placeholder="Email" required="true" onChange={handleChange} />
                        <input value={userRegister.password} type="password" name="password" placeholder="Password" required="true" onChange={handleChange} />
                        <button>Sign up</button>
                    </form>
                </div>

            </div>
        </div>
    )
}
