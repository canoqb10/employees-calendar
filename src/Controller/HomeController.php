<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\RedirectResponse;
use App\Service\EmployeesService;

class HomeController extends AbstractController
{
     private EmployeesService $employeesService;

    public function __construct(EmployeesService $employeesService) {
        $this->employeesService = $employeesService;
    }

    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        $employees = $this->employeesService -> getAllEmployees();
        
        return $this->render('home/index.html.twig', [
            'employees' => $employees,
        ]);
    }

    #[Route('/', name: 'app_home_calendar')]
    public function showCalendar(int $employeeId): RedirectRespose 
    {
        return $this->redirectToRoute('calendar_employee', ['employeeId' => $employeeId]);
    }
    
}