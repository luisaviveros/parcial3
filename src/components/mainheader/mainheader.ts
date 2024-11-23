class MainHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

	}

	connectedCallback() {
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
					<div class='div1'>
						<h1 id="evento">EVENTOS</h1>
					</div>
					<div class='div2'>
						<ion-icon class='settings-outline' name="settings-outline" id="settings"></ion-icon>
						<ion-icon class='person-circle-outline' name="person-circle-outline" id="profile"></ion-icon>
					</div>
				</section>
			`;
		}
	
	}
}

customElements.define('main-header', MainHeader);
export default MainHeader;