import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { Vinyl } from './types/vinyl';


const firebaseConfig = {
  apiKey: "AIzaSyCsv8Q3gid_H4ZnOopsR2LsrfmVtENfCig",
  authDomain: "ejemplo-18.firebaseapp.com",
  projectId: "ejemplo-18",
  storageBucket: "ejemplo-18.appspot.com",
  messagingSenderId: "331457677220",
  appId: "1:331457677220:web:b4e71557f7df5708126331",
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const vinylDocuments = collection(db, 'vinyl');

export const addVinyl = async (vinyl: Vinyl) => {
	try {
		await addDoc(vinylDocuments, vinyl);
		console.log('Se añadió');
	} catch (error) {
		console.error(error);
	}
};

export const getVinyl = async () => {
	const querySnapshot = await getDocs(vinylDocuments);
	const vinyl: Vinyl[] = [];

	querySnapshot.docs.forEach((doc: any) => {
		const data: Omit<Vinyl, 'id'> = doc.data() as any;
		const vinylData = doc.data() as Vinyl;
		vinyl.push(vinylData);
	});
	console.log(vinyl);
	return vinyl;
};