
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
                        if (confirm('Do you want to delete this event?')) {
                            const oldDateStart = moment(info.event.start);
                            const oldDateEnd = moment(info.event.end);
                            
                            const index = self.events.findIndex(event =>{
                                return moment(event.start).isSame(oldDateStart) &&  moment(event.end).isSame(oldDateEnd)
                            });
                            
                            if (index !== -1) {
                                this.events[index].deleted = true;
                                info.event.remove(); 
                                console.log('Event removed');
                            }
                        }
                    }.bind(this));

                    return { domNodes: [titleEl, btnEl] };
                },
                select: (info) =>{
                    const dayHasEvents = this.calendar.getEvents().filter(event => moment(event.start).format('YYYY-MM-DD') === moment(info.startStr).format('YYYY-MM-DD'))
                    if(dayHasEvents.length > 0) {
                        alert('You can only select one event per day');
                        return;
                    }
                    const startDate = moment(info.startStr);
                    const endDate = moment(info.endStr);
                    const diffDates = endDate.diff(startDate, 'hours', true); 
                    
                    if(startDate.dates() !== endDate.dates()) {
                        alert('You can only select hours on the same day.');
                        return ;
                    }
                    const newEvent = {
                        title: diffDates + ' hours',
                        start: info.startStr,
                        end: info.endStr,
                    }; 

                    this.calendar.addEvent(newEvent);
                    this.events.push(newEvent);
                },
                eventDrop: (info) => {
                    const startDate = moment(info.event.start);
                    const endDate = moment(info.event.end);
                    const title = endDate.diff(startDate, 'hours', true) + ' hours'
                    
                    const index = this.events.findIndex(event =>
                        (moment(event.start).isSame(info.oldEvent.startStr) &&  moment(event.end).isSame(info.oldEvent.endStr)
                    ));

                
                    if (index !== -1) {
                        this.events[index].title = title;
                        this.events[index].start = info.event.start.toISOString();
                        this.events[index].end = info.event.end ? info.event.end.toISOString() : null;   
                        console.log('Event moved  to: ' + info.event.start.toISOString());
                    } 
                },
                eventResize: (info) => {
                    const startDate = moment(info.event.start);
                    const endDate = moment(info.event.end);
                    const title = endDate.diff(startDate, 'hours', true) + ' hours'
                    const oldDateStart = moment(info.oldEvent.start);
                    const oldDateEnd = moment(info.oldEvent.end);
                    
                    if(startDate.dates() !== endDate.dates()) {
                        alert('You can only edit in the same day.');
                        return ;
                    }
                    
                    const index = this.events.findIndex(event =>{
                        return moment(event.start).isSame(oldDateStart) &&  moment(event.end).isSame(oldDateEnd)
                    });
                    
                    
                    if (index !== -1) {
                        this.events[index].title = title;
                        this.events[index].start = info.event.start.toISOString();
                        this.events[index].end = info.event.end ? info.event.end.toISOString() : null;   
                        console.log('Event resize to: ' + info.event.end.toISOString());
                    }
                },
            });
            
            this.calendar.render();
        },
        saveCalendar(employeeId){
            console.log('Saving events...');
            
            axios.post(urls.save, {
                events: this.events
            })
            .then((response) => {
                console.log('Save successful:', response);
                alert('Calendar save successful');
            })
            .catch((error) => {
                console.error('Error saving:', error);
                alert('An error occurred while trying to save the calendar.');
            });
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.initCalendar();
        });
    }
})