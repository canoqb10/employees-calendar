const { createApp } = Vue;

const vueApp = (id, config) =>{ 
    return createApp(config).mount(`#${id}`);
}

