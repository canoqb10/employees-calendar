<?php
namespace App\Service;

use App\Entity\Employees;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;

class EmployeesService
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getAllEmployees()
    {
        $result = $this->entityManager->getRepository(Employees::class)->findAll();

        $data = array_map(fn($emp) => [
            'id' => $emp->getId(),
            'name' => $emp->getName(),
            'email' => $emp->getEmail(),
            'position' => $emp->getPosition(),
            'lastname' => $emp->getLastname(),
            'created_at' => $emp->getCreatedAt()->format('Y-m-d H:i:s'),
            'created_by' => $emp->getCreatedBy() ? $emp->getCreatedBy()->getName() : null,
        ], $result);
        
        return $data;
    }

    public function getEmployee($id)
    {
        return $this->entityManager->getRepository(Employees::class)->find($id);
    }

}