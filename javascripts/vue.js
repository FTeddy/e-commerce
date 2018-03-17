let carousel_banner = [
  { imgUrl: './pictures/banners/g1-banner.jpg',
    class: 'carousel-item active'
  },
  { imgUrl: './pictures/banners/g2-banner.jpg',
    class: 'carousel-item'
  },
  {imgUrl: './pictures/banners/g3-banner.jpg',
    class: 'carousel-item'
  }
]

let promo_banners = [
  {
    imgUrl: './pictures/promo/promo_1.jpg'
  },
  {
    imgUrl: './pictures/promo/promo_1.jpg'
  },
]

let cakes = [
  {
    imgUrl: './pictures/cakes/thumb_1.jpg',
    title: 'Ombre Cake',
    price: '$50'
  },
  {
    imgUrl: './pictures/cakes/thumb_2.jpg',
    title: 'Korean Blossom',
    price: '$60'
  },
  {
    imgUrl: './pictures/cakes/thumb_3.jpg',
    title: 'Decorated Cupcake',
    price: '$15'
  },
  {
    imgUrl: './pictures/cakes/thumb_4.jpg',
    title: 'Special Cupcake',
    price: '$20'
  }
]




Vue.component('carousel', {
  template: `

  <div v-bind:class="banner.class" v-for='(banner, index) in carousel_banner' >
    <img class="d-block w-100 bg-carousel" v-bind:src="banner.imgUrl" alt="First slide">
  </div>
  `,
  props:['carousel-banner'],
  data: function() {
    return {
      data: 'data'
    }
  }
})

Vue.component('promo', {
  template: `

  <div class="container-fluid full-width bottom-border flexbox flex-direct">
    <div class="container-fluid margin-vert-30px flexbox  justify-around align-items" v-for='p_banner in promo_banners'>
      <img class=" margin-side-10px  img-fluid " width="490px" height="280px" v-bind:src="p_banner.imgUrl" alt="placeholder1">
    </div>
  </div>
  `,
  data: function() {
    return {
      promo_banners: promo_banners
    }
  }
})

Vue.component('product', {
  template: `

  <div class="container-fluid bg-white margin-vert-30px padding-bottom-30px bottom-border ">
    <div class=" row flex-simple margin-side-30px">
      <div class="card card-width margin-vert-15px flex-items" v-for='(cake, index) in cakes' >
        <img class="card-img-top img-fluid" v-bind:src="cake.imgUrl" alt="Card image cap">
        <div class="card-body padding-vert-4px">
          <div class="row">
            <div class="col-sm-8">
              <h5 class="card-title margin-vert-3px font-1rem">{{cake.title}}</h5>
              <h5 class="card-title margin-vert-3px font-1rem">{{cake.price}}</h5>
            </div>
            <div class="col-sm-4 flexbox justify align-items">
              <button class="btn btn-success" type="button" name="button" v-on:click='addItem(cake.title, cake.price, cake.imgUrl)'>Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  `,
  data: function() {
    return {
      cakes: cakes
    }
  }
})

Vue.component('modal', {
  template: `

  <div class="card width" style="width: 100%;" v-for='item in cart'>
    <img class="img-fluid" v-bind:src="item.imgUrl" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{item.title}}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{item.price}} - {{item.quantity}} Total: {{totalPrice(item.price, item.quantity)}}</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <button class="btn btn-secondary" type="button" name="button" v-on:click='cartRemoveItem(item.title)'>-</button>
      <button class="btn btn-secondary" type="button" name="button" v-on:click='cartAddItem(item.title)'>+</button>
      <button class="btn btn-danger" type="button" name="button" v-on:click='cartRemoveAll(item.title)'>Remove all</button>
    </div>
  </div>

  `,
  data: function() {
    return {
      cakes: cakes
    }
  }
})

new Vue({
  el: '#vueApp',
  data: {
    title: 'CakePlaza',
    cart: [],
    carousel_banner: carousel_banner,
    promo_banners: promo_banners,
    cakes: cakes
  },
  computed: {
    cartSize : function() {
      return this.cart.length;
    },
    grandTotal: function() {
      let grandTotal = 0;
      this.cart.forEach(item => {
        let priceNum = Number(item.price.slice(1));
        let total = item.quantity * priceNum;
        grandTotal += total;
      })
      console.log(grandTotal);
      return grandTotal;
    }
  },
  methods: {
    addItem: function(title, price, url) {
      let newProduct = {
        title: title,
        price: price,
        imgUrl: url,
        quantity: 1
      };
      // console.log(newProduct);
      let search = this.cart.find(product => {
        return product.title === newProduct.title;
      })
      if (search === undefined) {
        this.cart.push(newProduct);
        console.log(this.cart);
        // console.log(this.cart[0]);
      } else {
        let index = this.cart.findIndex(data => {
          return data.title == newProduct.title
        });
        // console.log(index);
        this.cart[index].quantity += 1;
        console.log(this.cart);
      }
    },
    totalPrice: function(price, quantity) {
      let priceNum = Number(price.slice(1));
      let total = priceNum * quantity;
      return '$ '+ total;
    },
    cartAddItem: function(title) {
      let index = this.cart.findIndex(data => {
        return data.title == title
      });
      this.cart[index].quantity += 1;
    },
    cartRemoveItem: function(title) {
      let index = this.cart.findIndex(data => {
        return data.title == title
      });
      if (this.cart[index].quantity === 1) {
        if (!confirm('are you sure?')) {
          return
        }
      }
      this.cart[index].quantity -= 1;
      if (this.cart[index].quantity === 0) {
        this.cart.splice(index, 1);
      }
    },
    cartRemoveAll: function(title) {
      let index = this.cart.findIndex(data => {
        return data.title == title
      });
      this.cart.splice(index, 1);
    }
  }

})
