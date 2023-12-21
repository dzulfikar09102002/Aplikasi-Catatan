import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/user/register', {
                name: name,
                email: email,
                password: password,
            });
            history.push("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={handleRegister} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <Input name="name" placeholder="Masukkan nama" value={name} onChange={(e) => setName(e.target.value)} />
                                <Input name="email" placeholder="Masukkan email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Input name="password" type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <div className="field mt-5">
                                    <Button>Register</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
