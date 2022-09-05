import ProductRepository from "../repository/ProductRepository";

export default class ProductService {
    constructor(){
        this.repository = new ProductRepository();
    }
    
    getProducts(){
        this.repository.getProducts(function (data){
            console.log("Products: ", data);
        });
    }

    getProduct(id, callback){
        this.repository.getProduct(id, function (data){
            console.log("Product: ", data);
            callback(data)
        });
    }

    createProduct(modelData) {
        this.repository.createProduct(modelData);
    }

}