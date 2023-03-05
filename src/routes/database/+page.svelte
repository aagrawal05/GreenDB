<script>
	import '../../app.css';
	// Import the functions you need from the SDKs you need
	import { initializeApp } from 'firebase/app';
	//import { getAnaytics } from 'firebase/analytics';
	import { getFirestore, collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore';
	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	const firebaseConfig = {
		apiKey: 'AIzaSyC-opKFcOfL3hQ_eZMlWVcWhDC0oTry1tg',
		authDomain: 'greendb-faf69.firebaseapp.com',
		projectId: 'greendb-faf69',
		storageBucket: 'greendb-faf69.appspot.com',
		messagingSenderId: '421596998460',
		appId: '1:421596998460:web:3c428ab3fd9ac34aaa8c39',
		measurementId: 'G-3T11WHSG5G'
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	//const analytics = getAnalytics(app);
	const db = getFirestore(app);

	const getSaplings = async () => {
		// Request all sapling documents form saplings collection
		let query = await getDocs(collection(db, 'saplings'));
		//Extract the documents as JSON objects and replace saplings
		saplings = query.docs.map((doc) => { 
				return {
								id: doc.id,
								data: doc.data(),
				}
    });

	};

	const addSapling = async () => {
		// Add a new document with a generated id.
		const docRef = await addDoc(collection(db, 'saplings'), {
			age: 15,
			status: 200,
			quantity: 12
		});
		console.log('Document written with ID: ', docRef.id);
		await getSaplings();
	};

	const deleteSapling = async (id) => {
		// Delete a document from the collection
		await deleteDoc(doc(db, 'saplings', id));
		console.log('Document deleted with ID: ', id);
		await getSaplings();
	};

	const updateSapling = async (id) => {
		// Update an existing document
		await updateDoc(doc(db, 'saplings', id), {
			age: 15,
			status: 200,
			quantity: 12
		});
		console.log('Document updated with ID: ', id);
		await getSaplings();
	};

	let saplings = [];
	getSaplings();
</script>

<div id="main">
	<table>
    <tr>
				<td><b>Age</b></td>
				<td><b>Quanity</b></td>
				<td><b>Status</b></td>
				<td><b>Delete</b></td>
		</tr>
		{#each saplings as sapling}
			<tr>
				<td>{sapling.data.age}</td>
				<td>{sapling.data.quantity}</td>
				<td>{sapling.data.status}</td>
				<td><button on:click={() => deleteSapling(sapling.id)}>Delete Sapling</button></td>
			</tr>
		{/each}
	</table>
	<button on:click={getSaplings}>Update Table</button>
	<button on:click={addSapling}>Add Sapling</button>
</div>

