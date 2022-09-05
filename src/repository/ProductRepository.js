import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, onValue } from "firebase/database";
import config from "../FirebaseConfig";

export default class ProductRepository{
  constructor(){
    const firebaseConfig = config;
    
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.db = getDatabase();
  }
  
  ref(path = ""){
    return ref(this.db, `products${path}`);
  }

  getProducts (callback){    
    return onValue(this.ref(), (snapshot) => {
      const data = [];
      snapshot.forEach(function(childSnapshot) {
        data.push({id:childSnapshot.key,...childSnapshot.val()});
      });

      callback(data);
    });
  }

  getProduct (id, callback){    
    return onValue(this.ref(`/${id}`), (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
  }

  createProduct(modelData) {
    push(this.ref(), {...modelData});
  }

}
