import { bootstrapApplication } from '@angular/platform-browser';
import { register as registerSwiper } from 'swiper/element/bundle';
import { App } from './app/app';
import { appConfig } from './app/app.config';

registerSwiper();
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
