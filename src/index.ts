function component() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello webpack';

  console.log('index.ts', process.env, process.env.NODE_ENV);

  return element;
}

document.querySelector('#app').appendChild(component());
