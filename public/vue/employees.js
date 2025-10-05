const { createApp } = Vue;

initEmployeesApp = function(urls) { 
    return createApp({
        data() {
            return {
                employees:  [],
                cargando: true,
                error: null,
            }
        },
        methods: {
            async cargarUsuarios(url) {
                try {
                    const response = await fetch(url);
                    // const response = await fetch('{{ path('employees_datos') }}');
                    const data = await response.json();
                    console.log('employees', data) 
                    this.employees = data.employees;
                } catch (e) {
                    this.error = 'Error al cargar los datos: ' + e.message;
                } finally {
                    this.cargando = false;
                }
            },
            async guardarDatos(url, datos) {
                console.log('datos', datos)
                const response = await fetch(url, {
                // const response = await fetch('{{ path('employees_save') }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datos)
                });
                return await response.json();
            },
        },
        mounted() {
            this.cargarUsuarios(urls.employees);
        }
    }).mount('#app');
}
