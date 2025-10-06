
const calendarAppConfig = (urls, data) => ({
    data() {
        console.log('Initial data:', data);
        console.log('Initial data.events:', data.events);

        return {
            events: data.events || [],
        }
    },
    methods: {
        initCalendar() {
            const calendarEl = document.getElementById('calendar');
            this.calendar = new FullCalendar.Calendar(calendarEl, {
                schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
                selectable: true,
                initialView: 'timeGridWeek',
                selectAllow: function(selectInfo) {
                    return !selectInfo.allDay;
                },
                timeZone: 'UTC-6',
                headerToolbar: null,
                slotMinTime: "6:00:00",     // hora de inicio visible
                slotMaxTime: "24:00:00", 
                slotDuration: '00:30:00',
                
                aspectRatio: 1.5,
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: ''
                },
                editable: true,
                selectable: true,
                events: this.events,
                eventClick: (info) => {
                    alert('Evento: ' + info.event.title);
                },
                select: (info) =>{
                    console.log('EXV',this.events)
                    console.log(info)
                    
                    const dayHasEvents = this.calendar.getEvents().filter(event => moment(event.start).format('YYYY-MM-DD') === moment(info.startStr).format('YYYY-MM-DD'))
                    console.log('dayHasEvents', dayHasEvents, dayHasEvents.length )
                    if(dayHasEvents.length > 0) {
                        alert('Ya existe un evento en este horario');
                        return;
                    }
                    const startDate = moment(info.startStr);
                    const endDate = moment(info.endStr);
                    
                    const newEvent = {
                        title: endDate.diff(startDate, 'hours', true) + ' horas',
                        start: info.startStr,
                        end: info.endStr,
                    }; 

                    console.log(newEvent)
                    this.calendar.addEvent(newEvent);
                    this.events.push(newEvent);
                },
                eventDrop: (info) => {
                    const startDate = moment(info.event.start);
                    const endDate = moment(info.event.end);
                    const title = endDate.diff(startDate, 'hours', true) + ' horas'
                    console.log('info', info)
                    const index = this.events.findIndex(event => event.start === info.oldEvent.startStr && event.end === info.oldEvent.endStr);
                    console.log('index', index)
                    if (index !== -1) {
                        this.events[index].title = title;
                        this.events[index].start = info.event.start.toISOString();
                        this.events[index].end = info.event.end ? info.event.end.toISOString() : null;   
                        console.log('Evento movido a: ' + info.event.start.toISOString());
                    }
                    console.log('EXV',this.events)
                }
                
            });
            
            this.calendar.render();
        },
        saveCalendar(employeeId){
            console.log('Saving events:', this.events);
            
            axios.post(urls.save, {
                events: this.events
            })
            .then((response) => {
                console.log('Save successful:', response);
                alert('Calendario guardado correctamente');
            })
            .catch((error) => {
                console.error('Error saving:', error);
                alert('Error al guardar el calendario');
            });
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.initCalendar();
        });
    }
})