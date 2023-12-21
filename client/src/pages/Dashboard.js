/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Table from '../components/Table';

const Dashboard = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [noteBody, setNoteBody] = useState('');
    const [noteId, setNoteId] = useState('');
    const [notes, setNotes] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [query, setQuery] = useState('');

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/user/refreshToken');
            setToken(response.data.data.token);
            const decoded = jwt_decode(response.data.data.token);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/login");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:3001/api/user/refreshToken');
            config.headers.Authorization = `Bearer ${response.data.data.token}`;
            setToken(response.data.data.token);
            const decoded = jwt_decode(response.data.data.token);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getNotes = useCallback(async () => {
        const response = await axiosJWT.get('http://localhost:3001/api/notes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setNotes(response.data.data);
    }, [token])

    const addNote = async (e) => {
        e.preventDefault();
        try {
            await axiosJWT.post('http://localhost:3001/api/notes/add', {
                title: noteTitle,
                body: noteBody
            });
            setNoteTitle('');
            setNoteBody('');
            setModalActive(false);
            getNotes();
        } catch (error) {
            console.log(error);
        }
    }

    const updateNote = async (e) => {
        e.preventDefault();
        try {
            await axiosJWT.put(`http://localhost:3001/api/notes/${noteId}`, {
                title: noteTitle,
                body: noteBody
            });
            setNoteTitle('');
            setNoteBody('');
            setModalActive(false);
            getNotes();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteNote = async (id) => {
        try {
            await axiosJWT.delete(`http://localhost:3001/api/notes/${id}`);
            cleanUp();
            getNotes();
        } catch (error) {
            console.log(error);
        }
    }

    const cleanUp = () => {
        setNoteTitle('');
        setNoteBody('');
        setNoteId('');
    }

    const handleOpenModal = () => setModalActive(true);
    const handleCloseModal = () => {
        setModalActive(false);
        cleanUp();
    }

    const modalStyle = modalActive ? "modal is-active" : "modal";

    const tableHeaders = [
        { key: 'no', value: 'No' },
        { key: 'title', value: 'Judul' },
        { key: 'body', value: 'Deskripsi' },
        { key: 'action', value: 'Aksi' }
    ]

    const filteredNotes = (notes, query) => {
        if (query === '') {
            return notes;
        }

        return notes.filter((note) => {
            const noteTitle = note.title.toLowerCase();
            const noteBody = note.body.toLowerCase();
            return noteTitle.includes(query) || noteBody.includes(query);
        })
    }

    const handleSearch = (e) => {
        const query = e.target.value;
        setQuery(query);
    }

    const tableAction = (note) => (
        <div className="buttons">
            <button onClick={() => {
                handleOpenModal();
                setNoteTitle(note.title);
                setNoteBody(note.body);
                setNoteId(note.id);
            }} className="button is-link">Lihat</button>
            <button onClick={() => deleteNote(note.id)} className="button is-danger">Hapus</button>
        </div>
    )

    // only show note title and body in table
    const tableData = useMemo(() => {
        return filteredNotes(notes, query).map((note, index) => {
            return {
                no: index + 1,
                title: note.title,
                body: note.body,
                action: tableAction(note)
            }
        })
    }, [notes, query]);

    const renderModal = () => (
        <div className={modalStyle}>
            <div onClick={handleCloseModal} className="modal-background"></div>
            <form onSubmit={noteId !== '' ? updateNote : addNote} className="modal-content back box has-background-white py-4 px-4">
                <Input name="judul" placeholder="Masukkan judul" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
                <Input name="deskripsi" textArea placeholder="Masukkan deskripsi" value={noteBody} onChange={(e) => setNoteBody(e.target.value)} />
                <div className="field mt-5">
                    <Button>Simpan</Button>
                </div>
            </form>
            <button onClick={handleCloseModal} className="modal-close is-large" aria-label="close"></button>
        </div>
    );

    useEffect(() => {
        refreshToken();
        getNotes();
    }, [getNotes]);

    return (
        <div className="container mt-5">
            <h1>Halo {name}</h1>

            <div className="my-4 is-flex is-justify-content-space-between is-flex-direction-row">
                <div>
                    <Input placeholder="Cari catatan" value={query} onChange={handleSearch} />
                </div>
                <button className="button is-link" onClick={handleOpenModal}>Tambah Catatan</button>
            </div>

            <Table headers={tableHeaders} data={tableData} />

            {renderModal()}
        </div >
    )
}

export default Dashboard
