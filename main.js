var newform = document.querySelector("#newform");
var itemname = document.querySelector("#itemname");
var quantity = document.querySelector("#quantity");
var description = document.querySelector("#description");
var price = document.querySelector("#price");
var submit = document.querySelector("#submit");
var newentry = document.querySelector("#newentry");
var dataneeded = new Map();
var quan = new Map();
var prc = new Map();
var desc = new Map();

newform.addEventListener('submit', onSubmit);
newentry.addEventListener('click', checkQuantity);

window.addEventListener('DOMContentLoaded', () => {
    
        axios.get("https://crudcrud.com/api/61e3995272364eb7a78532b8241d01d2/items")
        .then(response => {

            for(var i = 0; i<response.data.length; i++)
            {
                dataneeded.set(response.data[i].itemname, response.data[i]._id);
                quan.set(response.data[i]._id, response.data[i].quantity);
                prc.set(response.data[i]._id, response.data[i].price);
                desc.set(response.data[i]._id, response.data[i].description);
                var text = document.createTextNode(`${response.data[i].itemname}  ${response.data[i].description}  ${response.data[i].price}  ${response.data[i].quantity}`);
                var li = document.createElement('li');
                var btn = document.createElement('button');
                btn.className = 'buy';
                var txt = document.createTextNode("BUY")
                btn.appendChild(txt);
                li.appendChild(text);
                li.appendChild(btn);
                newentry.appendChild(li);
            }

            console.log(dataneeded);

        })
        .catch(err => console.log(err))

})

function onSubmit(e)
{
    
    e.preventDefault();
   
    axios.post("https://crudcrud.com/api/61e3995272364eb7a78532b8241d01d2/items", {

        itemname: itemname.value,
        description: description.value,
        price: price.value,
        quantity: quantity.value

    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

function checkQuantity(e)
{
    var li = e.target.parentElement;
    var txt = li.innerHTML;
    var item = "";

    for(var i=0; i<txt.length; i++)
    {
        if(txt.charAt(i) == ' ')
        {
            break;
        }
        else{
            item = item + txt.charAt(i);
        }
    }
    
    var temp = dataneeded.get(item);
    var change = quan.get(temp);
    change--;
    var pri = prc.get(temp);
    var des = desc.get(temp);

    console.log(des);

    axios.put(`https://crudcrud.com/api/61e3995272364eb7a78532b8241d01d2/items/${dataneeded.get(item)}`, {

        itemname: item,
        description: des,
        price: pri,
        quantity : change
        
        
        

    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
    
   
}


