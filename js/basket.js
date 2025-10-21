basket  = {

    Data : {
         
    },

    init :  function() {
        basket.Data = basket.readLocalStorage()   
        return basket.Data;
    },

    addBasketItem : function(ProductId,Amount) {
         data = {}
         basket.Data[ProductId] = Amount;
         basket.updateLocalstorage();   
    },

    updateLocalstorage : function() {
        localStorage.setItem('basket', JSON.stringify(basket.Data));
    },

    readLocalStorage : function() {
       return JSON.parse(localStorage.getItem('basket')) || {};
    },

    clearBasket : function() {
        localStorage.removeItem('basket');
        basket.Data = {}
    }   


}