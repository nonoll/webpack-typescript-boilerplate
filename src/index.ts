import '~/styles/global.scss';
import '~/styles/style.scss';

import Logo from '~/images/icons8-typescript-48.png';

import { Component } from '@/components';

console.log('index.ts', process.env, process.env.NODE_ENV, jQuery);

const appEl = document.querySelector('#app');

const img = document.createElement('img');
img.src = Logo;
appEl.appendChild(img);

const component: Component = new Component();
appEl.appendChild(component.element);