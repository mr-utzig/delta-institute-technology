import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function StudentForm() {
    const { id } = useParams();
    const [student, setStudent] = useState({
        photo: null,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: {
            zipcode: "",
            street: "",
            county: "",
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
            formdata.append(key, student[key]);
            console.log(key, student[key]);
        }
    }

    async function getAddressDataByZip() {
        if (student.address.zipcode.length != 8) return;

        const data = await (await fetch(`https://viacep.com.br/ws/${student.address.zipcode}/json/`)).json();
        setStudent({
            ...student,
            address: {
                ...student.address,
                street: data.logradouro,
                county: data.bairro,
                city: data.localidade,
                state: data.uf
            }
        });
    }

    const getStudentData = async () => {
        const data = await (await fetch("https://jsonplaceholder.typicode.com/users/" + id)).json();

        setStudent({
            firstName: data.name.split(" ")[0],
            lastName: data.name.split(" ")[1],
            email: data.email,
            phone: data.phone,
            address: {
                ...student.address,
                zipcode: data.address.zipcode,
                street: data.address.street,
                city: data.address.city,
                complement: data.address.suite.split(" ")[0],
                number: data.address.suite.split(" ")[1]
            }
        });
    }

    useEffect(() => {
        getStudentData();
    }, [id]);

    return (
        <form className="py-5 bg-white" onSubmit={handleFormSubmit}>
            <button type="submit" disabled className='hidden'></button>
            <div className="max-w-7xl mx-auto">
                <div>
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Inserir novo aluno</h1>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <div className="mt-2 flex items-center gap-x-3">
                                {student.photo ? (
                                    <img src={URL.createObjectURL(student?.photo)} alt="Foto do aluno" className="h-24 w-24 border-2 border-[--dit-blue] rounded-[3rem]" />
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
                                <input type="file" id="photo" className='hidden' onChange={handlePhotoSelection} />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
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
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                Último nome
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="lastName"
                                    value={student.lastName}
                                    onChange={handleStudentChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[--dit-blue] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
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
                        <div className="sm:col-span-4">
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
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
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
                        <div className="sm:col-span-1 sm:col-start-1">
                            <label htmlFor="zipcode" className="block text-sm font-medium leading-6 text-gray-900">
                                CEP
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="zipcode"
                                    value={student.address.zipcode}
                                    onChange={handleStudentAddressChange}
                                    onBlur={getAddressDataByZip}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[--dit-blue] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-1">
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
                        <div className="sm:col-span-2">
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
                        <div className="sm:col-span-2">
                            <label htmlFor="county" className="block text-sm font-medium leading-6 text-gray-900">
                                Bairro
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="county"
                                    value={student.address.county}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 sm:text-sm sm:leading-6"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-span-3">
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
                        <div className="col-span-2">
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
                        <div className="col-span-1">
                            <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                                Número
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="number"
                                    value={student.address.number}
                                    onChange={handleStudentAddressChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[--dit-blue] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link to={"/"} className="text-sm font-semibold leading-6 text-gray-900">
                        Voltar
                    </Link>
                    <button
                        type="submit"
                        className="rounded-md bg-[--dit-blue] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </form>
    )
}

export default StudentForm;