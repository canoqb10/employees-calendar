<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use App\Service\CalendarService;

class CalendarController extends AbstractController
{
    private CalendarService $calendarService;

    public function __construct(CalendarService $calendarService) {
        $this->calendarService = $calendarService;
    }

    #[Route('/employees/{employeeId}/calendar', name: 'calendar_employee', methods: ['GET'])]
    public function index(int $employeeId): Response
    {
        $data = $this->calendarService->getScheduleByEmployee($employeeId);
        
        return $this->render('calendar/index.html.twig', [
            'employee' => $data['employee'],
            'events' => $data['events'],
        ]);
    } 

    #[Route('/employees/{employeeId}/calendar', name: 'calendar_employee_save', methods: ['POST'])]
    public function save(int $employeeId, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data || !isset($data['events']) || !is_array($data['events'])) {
            return $this->json(['status' => 'error', 'message' => 'Formato de datos inválido'], Response::HTTP_BAD_REQUEST);
        }
        
        try {
            $events = $data['events'];
            
            foreach ($events as $event) {
                if (!isset($event['title']) || !isset($event['start']) || !isset($event['end'])) {
                    throw new \Exception('Formato de evento inválido. Se requieren los campos title, start y end');
                }
            }

            $this->calendarService->saveSchedule($employeeId, $events);

            return $this->json([
                'status' => 'success',
                'message' => 'Eventos guardados correctamente'
            ]);

            return $this->json([
                'status' => 'success',
                'message' => 'Calendario guardado correctamente',
                'data' => $events
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    } 

}