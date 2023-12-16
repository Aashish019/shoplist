const form = document.getElementById('shop-form');
const itemName = document.getElementById('item-name');
const itemQty = document.getElementById('item-qty');
const list = document.getElementById('list');
const alert = document.getElementById('alert');

document.addEventListener('DOMContentLoaded',function(){
    const items = JSON.parse(window.localStorage.getItem('items'));
    // console.log(items);
    items.forEach(function(item){
    const tr = document.createElement('tr');
    tr.setAttribute('id',`${item.id}`);
    tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td><button class="btn btn-danger">Delete</button></td>
    `;
    list.appendChild(tr);
    })
})


form.addEventListener('submit', function(event){
    event.preventDefault();
    if(itemName.value != '' && itemQty.value != ''){
        const tr = document.createElement('tr');
        const rand = Math.floor((Math.random() * 1000)+1);
        tr.setAttribute('id',`${rand}`);
        tr.innerHTML = `
        <td>${rand}</td>
        <td>${itemName.value}</td>
        <td>${itemQty.value}</td>
        <td><button class="btn btn-danger ">Delete</button></td>
        `;
        list.appendChild(tr);
        let items;
        items = window.localStorage.getItem('items') ? JSON.parse(window.localStorage.getItem('items')) : [];
        items.push({id:rand,name:itemName.value,qty:itemQty.value});
        window.localStorage.setItem('items',JSON.stringify(items));
        itemName.value = '' ;
        itemQty.value = '';
        alert.classList.add('alert-success');
        alert.innerHTML = 'Item Added sucessfully';
        setTimeout(function(){
        alert.classList.remove('alert-success');
        alert.innerHTML = '';
        },3000)
    } else {
        alert.classList.add('alert-warning');
        alert.innerHTML = 'Please Add Item!';
        setTimeout(function(){
            alert.classList.remove('alert-warning');
            alert.innerHTML = '';
        }, 3000);
    }
})

//delete

list.addEventListener('click',function(event){
    // console.log(event.target)
    if(event.target.classList.contains('btn')){
        // console.log('btn click')
        let items = JSON.parse(window.localStorage.getItem('items'));
        const id = event.target.parentElement.parentElement.getAttribute('id');
        items = items.filter(function(item){
            return item.id != id;
        })
        window.localStorage.setItem('items', JSON.stringify(items));
        event.target.parentElement.parentElement.remove();
    }
})