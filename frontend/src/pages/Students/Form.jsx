import { ArrowUturnLeftIcon, CheckBadgeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, CloudArrowUpIcon, ExclamationCircleIcon, ExclamationTriangleIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function StudentForm() {
    const { id } = useParams();
    const [response, setResponse] = useState({
        status: null,
        message: null
    });
    const [student, setStudent] = useState({
        photo: undefined,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: {
            zipcode: "",
            street: "",
            neighborhood: "",
            city: "",
            state: "",
            number: "",
            complement: ""
        }
    });

    function handlePhotoSelection(e) {
        setStudent({
            ...student,
            photo: e.target.files[0]
        });
    }

    function handleStudentChange(e) {
        setStudent({
            ...student,
            [e.target.id]: e.target.value
        });
    }

    function handleStudentAddressChange(e) {
        setStudent({
            ...student,
            address: {
                ...student.address,
                [e.target.id]: e.target.value
            }
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const formdata = new FormData();
        for (const key in student) {
            if (key == 'address') {
                for (const keyA in student.address) {
                    formdata.append(keyA, student.address[keyA]);
                }
            } else {
                formdata.append(key, student[key]);
            }
        }

        if (id) {
            return putRequest(formdata);
        }

        return postRequest(formdata);
    }

    async function postRequest(fd) {
        await fetch(`http://${import.meta.env.VITE_API_IP ?? '127.0.0.1:8000'}/api/v1/students`, {
            method: 'POST',
            body: fd
        })
            .then(response => response.json())
            .then(response => {
                setResponse(response);
                setTimeout(() => location.href = "/", 1500);
            })
            .catch(err => console.log(err));
    }

    async function putRequest(fd) {
        fd.append('_method', 'PUT');

        await fetch(`http://${import.meta.env.VITE_API_IP ?? '127.0.0.1:8000'}/api/v1/students/${id}`, {
            method: 'POST',
            body: fd
        })
            .then(response => response.json())
            .then(response => {
                setResponse(response);
                setTimeout(() => location.reload(), 1500);
            })
            .catch(err => console.log(err));
    }

    async function handleStudentDeletion(e) {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('_method', 'DELETE');

        await fetch(`http://${import.meta.env.VITE_API_IP ?? '127.0.0.1:8000'}/api/v1/students/${id}`, {
            method: 'POST',
            body: formdata
        })
            .then(response => response.json())
            .then(response => {
                setResponse(response);
                setTimeout(() => location.reload(), 1500);
            })
            .catch(err => console.log(err));
    }

    async function getAddressDataByZip() {
        if (student.address.zipcode.length != 8) return;

        const data = await (await fetch(`https://viacep.com.br/ws/${student.address.zipcode}/json/`)).json();
        setStudent({
            ...student,
            address: {
                ...student.address,
                street: data.logradouro,
                neighborhood: data.bairro,
                city: data.localidade,
                state: data.uf
            }
        });
    }

    function handleResponse() {
        if (response.status == 200 || response.status == 201) return true;
        return false;
    }

    if (id) {
        const getStudentData = async () => {
            const data = await (await fetch(`http://${import.meta.env.VITE_API_IP ?? '127.0.0.1:8000'}/api/v1/students/${id}`)).json();

            setStudent({ ...data });
        }

        useEffect(() => {
            getStudentData();
        }, []);
    }

    return (
        <form className="p-5 bg-white" onSubmit={handleFormSubmit}>
            <button type="submit" disabled className='hidden'></button>
            <div className="max-w-7xl mx-auto">
                <div>
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Inserir novo aluno</h1>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-6 sm:col-span-full">
                            <div className="mt-2 flex flex-col sm:flex-row items-center gap-x-3 ">
                                {student.photo ? (
                                    <img src={student.photo instanceof File ? URL.createObjectURL(student?.photo) : `http://${import.meta.env.VITE_API_IP ?? '127.0.0.1:8000' }/${student?.photo}`} alt="Foto do aluno" className="h-24 w-24 border-2 border-[--dit-blue] rounded-[3rem]" />
                                ) : (
                                    <UserCircleIcon className="h-24 w-24 text-gray-300" aria-hidden="true" />
                                )}
                                <label
                                    role="button"
                                    htmlFor="photo"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Selecionar foto
                                </label>
                                <input type="file" id="photo" className='hidden' accept='image/*' onChange={handlePhotoSelection} />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                Primeiro nome
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="firstName"
                                    value={student.firstName}
                                    onChange={handleStudentChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[--dit-blue] sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                Último nome
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="lastName"
                                    value={student.lastName}
                                    onChange={handleStudentChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[--dit-blue] sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                Celular
                            </label>
                            <div className="mt-2">
                                <input
                                    type="tel"
                                    id="phone"
                                    value={student.phone}
                                    onChange={handleStudentChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[--dit-blue] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                E-mail
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    id="email"
                                    value={student.email}
                                    onChange={handleStudentChange}
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[--dit-blue] sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                País
                            </label>
                            <div className="mt-2">
                                <select
                                    id="country"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 sm:max-w-xs sm:text-sm sm:leading-6"
                                    disabled
                                >
                                    <option>Brasil</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-1 sm:col-start-1">
                            <label htmlFor="zipcode" className="block text-sm font-medium leading-6 text-gray-900">
                                CEP
                            </label>
                            <div className="mt-3">
                                <input
                                    type="number"
                                    id="zipcode"
                                    value={student.address.zipcode}
                                    onChange={handleStudentAddressChange}
                                    onBlur={getAddressDataByZip}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[--dit-blue] sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-1">
                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                Estado
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="state"
                                    value={student.address.state}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 sm:text-sm sm:leading-6"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                Cidade
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="city"
                                    value={student.address.city}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 sm:text-sm sm:leading-6"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="neighborhood" className="block text-sm font-medium leading-6 text-gray-900">
                                Bairro
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="neighborhood"
                                    value={student.address.neighborhood}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 sm:text-sm sm:leading-6"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                Endereço
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="street"
                                    value={student.address.street}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 sm:text-sm sm:leading-6"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-1">
                            <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                                Número
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    id="number"
                                    value={student.address.number}
                                    onChange={handleStudentAddressChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[--dit-blue] sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="complement" className="block text-sm font-medium leading-6 text-gray-900">
                                Complemento
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="complement"
                                    value={student.address.complement}
                                    onChange={handleStudentAddressChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[--dit-blue] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {response.status ? <div className='mt-6 flex justify-end'>
                    <div className={`flex rounded-md shadow gap-2 p-2 ${handleResponse() ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        {handleResponse()
                            ? <CheckCircleIcon className={`w-7 h-7 ${handleResponse() ? 'text-green-400' : 'text-yellow-400'}`} />
                            : <ExclamationTriangleIcon className={`w-7 h-7 ${handleResponse() ? 'text-green-400' : 'text-yellow-400'}`} />
                        }
                        <span className={`${handleResponse() ? 'text-green-800' : 'text-yellow-800'}`}>{response.message ?? "Messagem não encontrada"}</span>
                    </div>
                </div> : ""}
                <div className="mt-6 flex items-center justify-between">
                    <div>
                        {id ? <button
                            onClick={handleStudentDeletion}
                            className="flex gap-2 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80"
                        >
                            <TrashIcon className='w-5 h-5' />
                            Excluir
                        </button> : ""}
                    </div>
                    <div className='flex gap-2 sm:gap-6'>
                        <Link to={"/"} className="flex gap-2 text-sm px-2 py-3 border rounded-md font-semibold text-gray-900">
                            <ArrowUturnLeftIcon className='w-5 h-5' />
                            Voltar
                        </Link>
                        <button
                            type="submit"
                            className="flex gap-2 items-center rounded-md bg-[--dit-blue] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80"
                        >
                            <CloudArrowUpIcon className='w-5 h-5' />
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default StudentForm;