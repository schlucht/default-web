import { serv } from './service/first-service'

const app: HTMLElement = document.getElementById('app')
const title: HTMLElement = document.createElement('h1')

title.innerText = serv

app.appendChild(title)

