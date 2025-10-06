
const SLOT_MIN_TIME = '6:00:00';
const SLOT_MAX_TIME = '24:00:00';
const SLOT_DURATION = '00:30:00';
const RATIO = 2.5;
const TZONE = 'UTC-6'

const calendarAppConfig = (urls, data) => ({
    data() {
        return {
            events: data.events || [],
        }
    },
    methods: {
        initCalendar() {
            const calendarEl = document.getElementById('calendar');
            this.calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'timeGridWeek',
                schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
                selectable: true,
                droppable: true,
                selectAllow: function(selectInfo) {
                    return !selectInfo.allDay;
                },
                timeZone: TZONE,
                headerToolbar: null,
                slotMinTime: SLOT_MIN_TIME,
                slotMaxTime: SLOT_MAX_TIME, 
                slotDuration: SLOT_DURATION,
                aspectRatio: RATIO,
                slotLabelFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false 
                },
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: ''
                },
                editable: true,
                selectable: true,
                events: this.events,
                eventContent: (info) => {
                    let titleEl = document.createElement('span');
                    titleEl.innerText = `${info.timeText} - ${info.event.title}`;
                    titleEl.classList.add('event-title')
                    
                    let btnEl = document.createElement('button');
                    btnEl.classList.add('btn');
                    btnEl.classList.add('btn-close');
                    btnEl.classList.add('event-close');
                    
                    const self = this;
                    btnEl.addEventListener('click', function(ev) {
                        ev.stopPropagation(); 
                        if (confirm('¿Eliminar este evento?')) {
                            const oldDateStart = moment(info.event.start);
                            const oldDateEnd = moment(info.event.end);
                            
                            const index = self.events.findIndex(event =>{
                                return moment(event.start).isSame(oldDateStart) &&  moment(event.end).isSame(oldDateEnd)
                            });
                            
                            if (index !== -1) {
                                this.events[index].deleted = true;
                                info.event.remove(); 
                                console.log('Evento removido');
                            }
                        }
                    }.bind(this));

                    return { domNodes: [titleEl, btnEl] };
                },
                select: (info) =>{
                    const dayHasEvents = this.calendar.getEvents().filter(event => moment(event.start).format('YYYY-MM-DD') === moment(info.startStr).format('YYYY-MM-DD'))
                    console.log('dayHasEvents', dayHasEvents, dayHasEvents.length )
                    if(dayHasEvents.length > 0) {
                        alert('Ya existe un evento en este horario');
                        return;
                    }
                    const startDate = moment(info.startStr);
                    const endDate = moment(info.endStr);
                    const diffDates = endDate.diff(startDate, 'hours', true); 
                    
                    if(startDate.dates() !== endDate.dates()) {
                        alert('solo puedes selecionar horas en el mismo dia');
                        return ;
                    }
                    const newEvent = {
                        title: diffDates + ' horas',
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
                    
                    const index = this.events.findIndex(event => event.start === info.oldEvent.startStr && event.end === info.oldEvent.endStr);
                    
                    if (index !== -1) {
                        this.events[index].title = title;
                        this.events[index].start = info.event.start.toISOString();
                        this.events[index].end = info.event.end ? info.event.end.toISOString() : null;   
                        console.log('Evento movido a: ' + info.event.start.toISOString());
                    }
                    console.log('EXV',this.events)
                },
                eventResize: (info) => {
                    const startDate = moment(info.event.start);
                    const endDate = moment(info.event.end);
                    const title = endDate.diff(startDate, 'hours', true) + ' horas'
                    const oldDateStart = moment(info.oldEvent.start);
                    const oldDateEnd = moment(info.oldEvent.end);
                    
                    const index = this.events.findIndex(event =>{
                        return moment(event.start).isSame(oldDateStart) &&  moment(event.end).isSame(oldDateEnd)
                    });
                    
                    if (index !== -1) {
                        this.events[index].title = title;
                        this.events[index].start = info.event.start.toISOString();
                        this.events[index].end = info.event.end ? info.event.end.toISOString() : null;   
                        console.log('Evento resize to: ' + info.event.end.toISOString());
                    }
                    console.log('EVX', this.events)
                },
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