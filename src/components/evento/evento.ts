

export enum EventoAttribute {
	'image' = 'image',
	'tittle' = 'tittle',
	'day' = 'day',
	'Asistentes' = 'asistentes',
	'ubication' = 'ubication',
}

export default class evento extends HTMLElement {
	image?: string;
	tittle?: string;
	autor?: string;
	day?: string;
	asistentes?: string;
	ubication?: string;

	static get observedAttributes() {
		const attrs: Record<EventoAttribute, null> = {
			image: null,
			tittle: null,
			day: null,
			asistentes: null,
			ubication: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(proptittle: EventoAttribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (proptittle) {
			default:
				this[proptittle] = newValue; 
				break;
		}
	}
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
        <section>
        <div>
        <img src="${this.image}">
        <b>${this.tittle}</b>
        <p>Album: ${this.day}</p>
        <p>Date added: ${this.asistentes}</p>
        <p>Duration: ${this.ubication}</p>
    </div>
    </section>
`;
		}
	}
}

customElements.define('comp-evento', evento);