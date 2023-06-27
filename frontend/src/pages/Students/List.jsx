import { Cog6ToothIcon, FolderOpenIcon, PencilSquareIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListHeader() {
    return (
        <div className="flex items-center">
            <div className="flex-1">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Alunos</h1>
            </div>
            <div className="ml-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button type="button" className="border-2 border-transparent rounded-md bg-[--dit-dark-blue] hover:text-[--dit-blue] hover:bg-transparent hover:border-[--dit-blue] px-3 py-2 text-sm font-semibold text-white shadow">
                    <Link to={"/alunos"} className="flex items-center gap-1">
                        <UserPlusIcon className="w-5 h-5" />
                        Inserir Aluno
                    </Link>
                </button>
            </div>
        </div>
    );
}

function ContentTableRow({ student }) {
    const studentId = `student_${student.id}`;
    const fullName = `${student.firstName} ${student.lastName}`;

    return (
        <tr id={studentId}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{fullName}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{student.email}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{student.phone}</td>
            <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
                <Link to={"/alunos/" + student.id} className="flex items-center justify-end gap-1 text-[--dit-blue] hover:text-[--dit-dark-blue]">
                    <PencilSquareIcon className="w-5 h-5" /> Editar<span className="hidden">, {fullName}</span>
                </Link>
            </td>
        </tr>
    );
}

function LoadingTableContent() {
    return (
        <tr>
            <td colSpan={4} className="px-3 py-3 text-base text-gray-900">
                <div className="flex items-center justify-center gap-4">
                    <Cog6ToothIcon className="animate-spin w-5 h-5" />
                    Buscando alunos...
                </div>
            </td>
        </tr>
    );
}

function EmptyTableContent() {
    return (
        <tr>
            <td colSpan={4} className="px-3 py-3 text-base text-gray-900">
                <div className="flex items-center justify-center gap-4">
                    <FolderOpenIcon className="w-5 h-5" />
                    Nenhum aluno cadastrado...
                </div>
            </td>
        </tr>
    );
}

function ContentTable() {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dataFetch = async () => {
        const data = await (await fetch("http://127.0.0.1:8000/api/v1/students")).json();

        setIsLoading(false);
        setStudents(data);
    }

    useEffect(() => {
        dataFetch();
    }, []);

    return (
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th scope="col" className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Nome</th>
                        <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900">E-mail</th>
                        <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900">Telefone</th>
                        <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-0"><span className="hidden">Editar</span></th>
                    </tr>
                </thead>
                <tbody>

                    {isLoading ? (
                        <LoadingTableContent />
                    ) : (students.length ? (
                        students.map(student => (
                            <ContentTableRow  key={student.id} student={student} />
                        ))
                    ) : (
                        <EmptyTableContent />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function StudentsList() {
    return (
        <div className="py-5 bg-white min-h-[100vh]">
            <div className="max-w-7xl mx-auto">
                <div className="px-4 sm:px-6 lg:px-8">
                    <ListHeader />
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <ContentTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentsList;