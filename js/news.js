var value = '1'
let idname = ''
let AnotherId = ''
const Item = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch((error) => console.log(error));
}

function displayCategories(data) {
    const mainParent = document.getElementById('category-list')
    data.forEach(element => {
        const li = document.createElement('li')
        li.classList.add('text-warning')
        li.classList.add('my-3')
        li.innerHTML = `<a class="" onclick="fetchData('${element.category_id}','${element.category_name}')" id="${element.category_name}" aria-current="page" href="#">${element.category_name}</a>`;
        mainParent.appendChild(li);
    });
}
const putValue = (id = 1) => {
    value = id
    if (value == 1) {
        document.getElementById('button1').innerText = "Default";
    } else {
        document.getElementById('button1').innerText = "Unsorted";

    }
    if (idname != "" && AnotherId != "") {

        fetchData(idname, AnotherId);

    }
}
Item();
function fetchData(id, realId) {
    lodingFunction(true);
    idname = id;
    AnotherId = realId
    const present = document.getElementsByClassName('active');
    if (present.length > 0) {
        present[0].className = present[0].className.replace("active", "");

    }
    document.getElementById(realId).classList.add("active");

    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => appearNews(data.data, docId))


}
const appearNews(data, id) => {
    const announcePart = document.getElementById('announce')
    announcePart.innerHTML = ``
    if (data.length == 0) {
        announcePart.innerHTML = `<h3 class="text-center py-3 text-warning">cannot find any news</h3>`;

    }

    if (value == 1) {
        data = data.sort((a, b) => b.full - a.full);
    }
    const quantity = document.getElementById('total-mount');
    quantity.innerText = data.length;
    document.getElementById('amount')

}
