<?php
namespace App\Service;

use App\Entity\Employees;
use App\Entity\Schedule;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;

class CalendarService
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getScheduleByEmployee(int $employeeId)
    {
        $employeeData = $this->entityManager->getRepository(Employees::class)->find($employeeId);
        
        if (!$employeeData) {
            throw new \Exception('Employee not found');
        }

        $eventsData = $this->entityManager->getRepository(Schedule::class)->findBy(
            ['employee_id' => $employeeData]
        );
        
        $events = array_map(fn($event) => [
            'id' => $event->getId(),
            'title' => $event->getTitle(),
            'start' => $event->getStartDate()->format('Y-m-d\TH:i:sP'),
            'end' => $event->getEndDate()->format('Y-m-d\TH:i:sP'),
        ], $eventsData);

        $employee = $employeeData ? [
            'id' => $employeeData->getId(),
            'name' => $employeeData->getName(),
            'email' => $employeeData->getEmail(),
            'position' => $employeeData->getPosition(),
            'lastname' => $employeeData->getLastname(),
            'created_at' => $employeeData->getCreatedAt()->format('Y-m-d H:i:s'),
            'created_by' => $employeeData->getCreatedBy() ? $employeeData->getCreatedBy()->getName() : null,
        ] : null;
        
        return ['employee' => $employee, 'events' => $events];
    }

    public function saveSchedule(int $employeeId, array $data)
    {
        $employee = $this->entityManager->getRepository(Employees::class)->find($employeeId);
        
        if (!$employee) {
            throw new \Exception('Employee not found');
        }
    
        foreach ($data as $item) {
            if(!isset($item['id'])){
                $schedule = new Schedule();
                $schedule->setTitle($item['title']);
                $schedule->setEmployeeId($employee);
                $schedule->setStartDate(new \DateTimeImmutable($item['start']));
                $schedule->setEndDate(new \DateTimeImmutable($item['end']));
                $this->entityManager->persist($schedule);
            }
        }
        $this->entityManager->flush();

    }
}