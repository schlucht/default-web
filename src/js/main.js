"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const first_service_1 = require("./service/first-service");
const app = document.getElementById('app');
const title = document.createElement('h1');
title.innerText = first_service_1.serv;
app.appendChild(title);
