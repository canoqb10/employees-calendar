<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\RedirectResponse;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('home/index.html.twig');
    }
    #[Route('/', name: 'app_home_calendar')]
    public function showCalendar(int $employeeId): RedirectRespose 
    {
        return $this->redirectToRoute('calendar_employee', ['employeeId' => $employeeId]);
    }
    
}