<?php

namespace App\Controllers;

use App\Models\AddressModel;
use CodeIgniter\RESTful\ResourceController;

class Students extends ResourceController
{
    protected $modelName = 'App\Models\StudentModel';

    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        $student = $this->model->find(['id'  => $id]);
        if ($student) {
            $address = new AddressModel();

            $data = $student[0];
            $data['address'] = $address->find(['id' => $student[0]['address_id']]);

            return $this->respond($data);
        }

        return $this->failNotFound('Aluno não encontrado!', 404);
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        $address = new AddressModel();
        $addressId = $address->insert([
            'zipcode' => $this->request->getPost('zipcode'),
            'street' => $this->request->getPost('street'),
            'neighborhood' => $this->request->getPost('neighborhood'),
            'city' => $this->request->getPost('city'),
            'state' => $this->request->getPost('state'),
            'number' => $this->request->getPost('number'),
            'complement' => $this->request->getPost('complement')
        ]);
        if (!$addressId) return $this->failValidationErrors($address->errors(), 400);

        $fileName = "";
        $image = $this->request->getFile('photo');
        if ($image && $image->isValid() && !$image->hasMoved()) {
            $fileName = $image->getRandomName();
            $image->move(ROOTPATH . 'public/assets/img/students', $fileName);
        }

        if (!$this->model->insert([
            'firstName' => $this->request->getPost('firstName'),
            'lastName' => $this->request->getPost('lastName'),
            'email' => $this->request->getPost('email'),
            'phone' => $this->request->getPost('phone'),
            'photo' => $fileName ? "assets/img/students/{$fileName}" : null,
            'address_id' => $addressId
        ])) {
            $address->delete($addressId);
            return $this->failValidationErrors($this->model->errors(), 400);
        }

        return $this->respondCreated([
            'status' => 201,
            'message' => 'Aluno adicionado com sucesso!'
        ]);
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        $studentData = $this->model->find(['id' => $id]);
        if (!$studentData) return $this->failNotFound('Aluno não encontrado', 404);

        $fileName = "";
        $image = $this->request->getFile('photo');
        if ($image->isValid() && !$image->hasMoved()) {
            if (!empty($studentData[0]["photo"])) {
                unlink(ROOTPATH . 'public/' . $studentData[0]["photo"]);
            }

            $fileName = $image->getRandomName();
            $image->move(ROOTPATH . 'public/assets/img/students', $fileName);
        }

        if (!$this->model->update($id, [
            'firstName' => $this->request->getPost('firstName'),
            'lastName' => $this->request->getPost('lastName'),
            'email' => $this->request->getPost('email'),
            'phone' => $this->request->getPost('phone'),
            'photo' => !empty($fileName) ? "assets/img/students/{$fileName}" : null
        ])) return $this->failValidationErrors($this->model->errors(), 400);

        $address = new AddressModel();
        if (!$address->update($studentData[0]['address_id'], [
            'zipcode' => $this->request->getPost('zipcode'),
            'street' => $this->request->getPost('street'),
            'neighborhood' => $this->request->getPost('neighborhood'),
            'city' => $this->request->getPost('city'),
            'state' => $this->request->getPost('state'),
            'number' => $this->request->getPost('number'),
            'complement' => $this->request->getPost('complement')
        ])) return $this->failValidationErrors($address->errors(), 400);

        return $this->respondUpdated([
            'status' => 200,
            'messages' => 'Cadastro do aluno editado com sucesso!'
        ]);
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        if (!$this->model->find(['id' => $id])) return $this->failNotFound('Aluno não encontrado', 404);
        $this->model->delete($id);

        return $this->respondDeleted([
            'status' => 200,
            'messages' => [
                'success' => 'Aluno removido com sucesso'
            ]
        ]);
    }
}
