    //detail nav
    let menu=document.querySelector('.detail-nav');
    
    document.addEventListener("click",toggleMenu);

    menu.addEventListener("click", function (event) {
      event.stopPropagation();
    });


    function toggleMenu(e){
      let clickedElement = e.target;
      if(isMenuToggler(clickedElement) || isMenu(clickedElement)){
        displayMenu('grid');
        return;
      }
      displayMenu('none');
    }

    function isMenu(element){
      if(element.classList.contains('detail-nav')){
        return true;
      }
      return false;
    }
    function isMenuToggler(element){
      if(element.id == 'items-menu'){
        return true;
      }
      return false;
    }


    function displayMenu(param){
      menu.style.display=param;
    }
    // Slider
    let slideIndex = 0;
    showSlides();
    
    function showSlides() {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
      }
      slideIndex++;
      if (slideIndex > slides.length) {slideIndex = 1}    
      slides[slideIndex-1].style.display = "block";  
      setTimeout(showSlides, 4000); // Change image every 2 seconds
    }

    //add product
    let itemListAdd = document.querySelector('.products');

    itemListAdd.addEventListener('click',addProduct);

    function addProduct(e){
      if(e.target.parentElement.classList.contains('btn-panier')){
        addLi(e);
        addModal(e);
      }
    }
    

    function addLi(e){
      //Get input value
        let value=e.target.parentElement.parentElement.parentElement;
        //get image
         let image=value.parentElement.querySelector('.product__photo img').src;
        //get title
        let title = value.parentElement.getElementsByClassName('product__title')[0].innerText;
        //get reference
        let reference=value.parentElement.getElementsByClassName('product__reference')[0].innerText;
        //get price
        let price=value.getElementsByClassName('price')[0].innerText;
      //add items
      addItems(image,title,reference,price);
    }
    
    function addItems(image,title,reference,price){
      // Create new li element
      let li=document.createElement('li');
      li.className = 'items';

      //verification
      let list=document.getElementsByClassName('panier_list')[0];
      let itemList=list.getElementsByClassName('desc_title');
      for (let i = 0; i < itemList.length; i++) {
        let chtitle=itemList[i].innerText.replace(/"/g,'');
        if (chtitle == title) {
            let qte=itemList[i].parentElement.parentElement.getElementsByClassName('coef')[0];
            qte.value=parseInt(qte.value)+1;
            updatedTotal();
            return;
        }
      }

      //contenu li
      let liContent=`
      <div>
      <img src="${image}" alt="">
  </div>
  <div class="desc">
      <p class="desc_title">"${title}"</p>
      <span>"${reference}"</span>
  </div>
  <div class="price_product"><h3>${price}</h3></div>
  <div class="quantité">
      <input type="number" class="coef" value="1" min=1>
  </div>
  <div class="price_product price_product--updated"><h3>0,000 DT</h3></div>
  <div class="delete"><i class="fas fa-trash-alt"></i></div>
      `;

      li.innerHTML = liContent;

      list.append(li);

      updatedTotal();
    }


        //remove products
        let itemListRemove = document.querySelector('.panier_list');
    
        itemListRemove.addEventListener('click',deleteProduct);
    
        function deleteProduct(e){
          if(e.target.parentElement.classList.contains('delete')){
            if(confirm('Are You Sure?')){
              let li = e.target.parentElement.parentElement;
              li.remove();
              updatedTotal();
            }
          }
        }



//modal activate
        let modal=document.querySelector('.modal');
        function addModal(e){
          createModal(e);
          modalDisplay('block');
        }

//createModal
     function createModal(e){
     //Get input value
        let value=e.target.parentElement.parentElement.parentElement;
        console.log(value);
        //get image
         let image=value.parentElement.querySelector('.product__photo img');
        //get title
        let title = value.parentElement.getElementsByClassName('product__title')[0].innerText;
        //get reference
        let reference=value.parentElement.getElementsByClassName('product__reference')[0].innerText;
        //get price
        let price=value.getElementsByClassName('price')[0].innerText;

        let totalPrixM=parseFloat(document.getElementsByClassName('total_prix')[0].innerText.replace(' DT', ''));
        let list=document.getElementsByClassName('panier_list')[0];
        let itemList=list.getElementsByClassName('desc_title');

        let s=0;
        for (let i = 0; i < itemList.length; i++){
          let qte=itemList[i].parentElement.parentElement.getElementsByClassName('coef')[0];
          document.getElementsByClassName('gte-modal')[0].innerText='Qté: '+qte.value;//nooo
          s=s+parseInt(qte.value);
        }


        document.getElementsByClassName('modal-image')[0].src=image.src;
        document.getElementsByClassName('modal-title')[0].innerText=title;
        document.getElementsByClassName('modal-reference')[0].innerText=reference;
        document.getElementsByClassName('modal-price')[0].innerText=price;
        //document.getElementsByClassName('gte-modal')[0].innerText='Qté: '+quantity;
        document.getElementsByClassName('panierS')[0].innerText='Il Y A '+s+' Article Dans Votre Panier.';
        document.getElementsByClassName('total-prix-modal')[0].innerText=totalPrixM.toFixed(3)+' DT TTC';
      }
    //modal
    let closeBtn=document.querySelector('.close');
    closeBtn.addEventListener('click',closeModal);
    window.addEventListener('click',outsideClick);

    let btnContinuer=document.querySelector('#continuer');
    let btnCommander=document.querySelector('#commander');

    btnContinuer.addEventListener('click',continuerShop);
    btnCommander.addEventListener('click',commanderMoadal);

    function continuerShop(){
      closeModal();
    }

    function commanderMoadal(){
      closeModal();
      displayPanier('none','block');
    }

    function closeModal(){
      modalDisplay('none');
    }

    function outsideClick(e){
      if(e.target == modal){
        modalDisplay('none');
      }
    }

    function modalDisplay(param){
      modal.style.display = param;
    }

    //quantity
    let quantityBouton=document.querySelector('.panier_list');
    quantityBouton.addEventListener('change',changecoef);

    function changecoef(e){
      if (isNaN(e.target.value)) {
        e.target.value = 1;
      }
      console.log(e.target.value);
      updatedTotal();
    }


    function updatedTotal(){
        let listItems=document.getElementsByClassName('panier_list')[0];
        let items=listItems.getElementsByClassName('items');
        let total=0;
        let prix=0;
        for(let i=0;i<items.length;i++){
          //inputt
          let item=items[i];
          //prix item
          let priceElement=item.getElementsByClassName('price_product')[0].innerText;
          //quantity item
          let coefElement=item.getElementsByClassName('coef')[0];
          //prix du quantité item
          let priceQElement=item.getElementsByClassName('price_product--updated')[0].innerText;
          //totale du prix panier
          let totalPrixElement = item.parentElement.parentElement.parentElement.getElementsByClassName('total_prix')[0].innerText;
          
          //outputt
          let price=parseFloat(priceElement.replace(' DT', ''));
          let coef=coefElement.value;
          let priceQ=parseFloat(priceQElement.replace(' DT', ''));
          prix=price*coef;
          total = total + prix;
          //document.getElementsByClassName('price_product--updated').innerText=prix+' DT';
          document.getElementsByClassName('price_product--updated')[i].innerText=prix.toFixed(3)+' DT';
        }
        //document.getElementsByClassName('total_prix').innerText = total + ' DT';
        document.getElementsByClassName('total_prix')[0].innerText=total.toFixed(3)+' DT';
    }

    
    let page1=document.querySelector('.page1');
    let page2=document.querySelector('.page2');

    //panier button
    let panierBoutton=document.querySelector('.info');
    panierBoutton.addEventListener('click',goPanier);

    function goPanier(e){
      if(e.target.classList.contains('fa-shopping-cart')){
        displayPanier('none','block');
      }
        
    }

    //accueil button
    let accueilBoutton=document.querySelector('.accueil');
    accueilBoutton.addEventListener('click',goShop);
    function goShop(e){
      if(e.target.parentElement.classList.contains('accueil')){
        displayPanier('block','none');
      }
    }

    function displayPanier(param1,param2){
      page1.style.display=param1;
      page2.style.display=param2;
    }

    //search
    let searchBouton=document.querySelector('.search');
    searchBouton.addEventListener('click',filter);

    function filter(e){
      let shop=e.target.parentElement;
      if(shop.classList.contains('btn-search')){
        let text = shop.parentElement.querySelector('#filter').value;
        let items=itemListAdd.getElementsByClassName('product__title');
        for(let i=0;i<items.length;i++){
          let title=items[i].innerText.replace(/"/g,'');
          if (title == text) {
            items[i].parentElement.parentElement.style.display = 'grid';
          } 
          else{
            items[i].parentElement.parentElement.style.display='none';
          }
          
        }
     }

    }

