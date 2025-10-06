const { createApp } = Vue;

const vueApp = (id, config) =>{ 
    console.log('config', config)
    return createApp(config).mount(`#${id}`);
}

