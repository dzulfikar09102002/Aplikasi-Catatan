import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/user/login', {
                email: email,
                password: password
            });
            history.push("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.message);
            }
        }
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={handleLogin} className="box">
                                <Input name="Email" placeholder="Masukkan email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Input name="Password" type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <div className="field mt-5">
                                    <Button>Login</Button>
                                </div>
                                <p className="has-text-centered has-text-danger">{msg}</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
