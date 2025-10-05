<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EmployeesController extends AbstractController
{
    #[Route('/api/employees', name: 'employees_datos')]
    public function index(): Response
    {
        $employees = [
            'employees' => [
                1 => ['id' => 1, 'name' => 'Alice', 'position' => 'Developer'],
                2 => ['id' => 2, 'name' => 'Bob', 'position' => 'Designer'],
                3 => ['id' => 3, 'name' => 'Charlie', 'position' => 'Manager'],
            ],
            'timestamp' => time()
        ];

        return $this->json($employees);
    }

}