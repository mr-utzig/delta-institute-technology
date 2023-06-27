<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Users extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 5,
                'unsigned' => true,
                'auto_increment' => true
            ],
            'firstName' => [
                'type' => 'VARCHAR',
                'constraint' => 50
            ],
            'lastName' => [
                'type' => 'VARCHAR',
                'constraint' => 50
            ],
            'email' => [
                'type' => 'VARCHAR',
                'constraint' => 100
            ],
            'phone' => [
                'type' => 'VARCHAR',
                'constraint' => 50,
                'null' => true
            ],
            'photo' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => true
            ],
            'role' => [
                'type' => 'ENUM',
                'constraint' => ['admin', 'student', 'professor'],
                'default' => 'student'
            ],
            'status' => [
                'type' => 'ENUM',
                'constraint' => ['active', 'inactive'],
                'default' => 'active'
            ],
            'address_id' => [
                'type' => 'INT',
                'constraint' => 5,
                'unsigned' => true,
                'null' => true
            ]
        ]);

        $this->forge->addForeignKey('address_id', 'address', 'id', 'CASCADE', 'SET NULL');
        $this->forge->addKey('id', true);
        $this->forge->createTable('users');
    }

    public function down()
    {
        $this->forge->dropTable('users');
    }
}
