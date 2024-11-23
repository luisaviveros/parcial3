import style from './index.css';
import { addVinyl, getVinyl } from './firebaseConfig';
import * as components from './components/export';
import { Cancion } from './components/export';


class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.loadSongs();
		const formElement = this.shadowRoot?.querySelector('form');
		if (formElement) {
			formElement.addEventListener('submit', this.handleSubmit.bind(this));
		}
	}

	async handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const vinylData = {
			name: formData.get('title') as string,
			image: formData.get('day') as string,
			album: formData.get('album') as string,
			dateAdded: formData.get('ubication') as string,
			duration: formData.get('asistentes') as string,
		};
		await addVinyl(vinylData);

	
		this.saveSongToLocalAndSession(vinylData);

		const removeElement = this.shadowRoot?.querySelector('form');
		if (removeElement) {
			removeElement.reset();
		}

		this.loadSongs();
	}

	async loadSongs() {
		const saveVinyl = await getVinyl();

		localStorage.setItem('vinyl', JSON.stringify(saveVinyl));
		sessionStorage.setItem('vinyl', JSON.stringify(saveVinyl));

		const container = this.shadowRoot?.querySelector('.list-songs');
		if (container) {
			container.innerHTML = '';

			saveVinyl.forEach((vinyl: any) => {
				const vinylComponent = document.createElement('comp-cancion') as Cancion;
				vinylComponent.tittle = vinyl.tittle;
				vinylComponent.image = vinyl.image;

				vinylComponent.day = vinyl.day;
				vinylComponent.asistentes = vinyl.stock;
				vinylComponent.ubication = vinyl.ubication;
				container.appendChild(vinylComponent);
			});
		}
	}

	saveSongToLocalAndSession(songData:any) {
		let songs = JSON.parse(localStorage.getItem('songs') || '[]');
		songs.push(songData);
		localStorage.setItem('songs', JSON.stringify(songs));

		let sessionSongs = JSON.parse(sessionStorage.getItem('songs') || '[]');
		sessionSongs.push(songData);
		sessionStorage.setItem('songs', JSON.stringify(sessionSongs));
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${style}</style>
                <header id="main-header-container"></header>
				<div class="app-container">
					<div class="title"><h1>ADD PRODUCTS</h1></div>
					<div class = "form-create-song">
						<form id="form-song">
							<input type="text" name="title" placeholder="Title" required>
							<input type="text" name="day" placeholder="day" required>
							<input type="text" name="asistentes" placeholder="Stock" required>
							<input type="text" name="ubication" placeholder="Price" required>
							<input type="text" name="image" placeholder="Image" required>
							<input type="submit" id="save-vinyl" value="Save"/>
						</form>
					</div>
					<div class="list-eventos"></div>
				</div>
			`;


            const cssAbuelo = this.ownerDocument.createElement('style');
			cssAbuelo.innerHTML = style;
			this.shadowRoot?.appendChild(cssAbuelo);
		}
        
	}
}

customElements.define('app-container', AppContainer);