import style from './index.css'; 
import { updateAttendees, getVinyl } from './firebaseConfig';
import './types/vinyl'; 

class UserView extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.loadEvents();
	}

	async loadEvents() {
		const eventos = await getVinyl(); 

		localStorage.setItem('eventos', JSON.stringify(eventos));
		sessionStorage.setItem('eventos', JSON.stringify(eventos));

		
		const container = this.shadowRoot?.querySelector('.list-eventos');
		if (container) {
			container.innerHTML = ''; 
			eventos.forEach((evento: any) => {
				const eventoComponent = document.createElement('comp-evento');
				eventoComponent.setAttribute('image', evento.image);
				eventoComponent.setAttribute('tittle', evento.tittle);
				eventoComponent.setAttribute('day', evento.day);
				eventoComponent.setAttribute('asistentes', evento.asistentes);
				eventoComponent.setAttribute('ubication', evento.ubication);

				const registerButton = document.createElement('button');
				registerButton.textContent = 'Registrarse';
				registerButton.addEventListener('click', () =>
					this.registerAsAttendee(evento.id, evento.asistentes)
				);

				eventoComponent.appendChild(registerButton);
				container.appendChild(eventoComponent);
			});
		}
	}

	async registerAsAttendee(eventId: string, currentAttendees: number) {

		await updateAttendees(eventId, currentAttendees + 1)
		this.loadEvents();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${style}</style>
				<div class="user-view">
					<h1>Explorar Eventos</h1>
					<div class="list-eventos"></div>
				</div>
			`;

			const css = this.ownerDocument.createElement('style');
			css.innerHTML = style;
			this.shadowRoot.appendChild(css);
		}
	}
}

customElements.define('user-view', UserView);
