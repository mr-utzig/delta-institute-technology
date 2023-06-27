<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Address extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 5,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'zipcode' => [
                'type' => 'INT',
                'constraint' => 8,
                'unsigned' => true
            ],
            'street' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => true
            ],
            'neighborhood' => [
                'type' => 'VARCHAR',
                'constraint' => 50,
                'null' => true
            ],
            'city' => [
                'type' => 'VARCHAR',
                'constraint' => 50,
                'null' => true
            ],
            'state' => [
                'type' => 'CHAR',
                'constraint' => 2,
                'null' => true
            ],
            'number' => [
                'type' => 'MEDIUMINT',
                'unsigned' => true
            ],
            'complement' => [
                'type' => 'VARCHAR',
                'constraint' => 150,
                'null' => true
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->createTable('address');
    }

    public function down()
    {
        $this->forge->dropTable('address');
    }
}
