


debugger;

async function Categories() {
    var requist = await fetch('https://localhost:7000/api/Home/getAllCategories')
    var responce = await requist.json();

    var Categories = document.getElementById('Categories');

    responce.forEach(element => {

        Categories.innerHTML += `
<div class="col-lg-3 col-sm-6">
    <div class="ltn__banner-item">
        <div class="ltn__banner-img">
            <a href="#" onclick="catigoryID(${element.categoryId})">
                <img src="../../../Back-End/E-Commerce/E-Commerce/Images/${element.image}" alt="Banner Image">
            </a>
        </div>
        <!-- Add the category name here -->
        <a href="#" onclick="catigoryID(${element.categoryId})">${element.name}</a>
    </div>
</div>
        `
        
    });
}

Categories();



  


function catigoryID(data){
    localStorage.setItem("categoryID", data);
    window.location.href = "../rania/shop.html";
}


async function NewArrival() {
    ;
    
    var requist = await fetch('https://localhost:7000/api/Home/NewArrival')
    var responce = await requist.json();

    var TopSales = document.getElementById('NewArrival');

    responce.forEach(element => {

        TopSales.innerHTML += `
            <div class="col-12">
                <div class="ltn__product-item ltn__product-item-4">
                    <div class="product-img">
                        <a href="#" onclick="storeproductid(${element.productId})"><img style="height: 350px; object-fit: cover; width: 300px" src="../../../Back-End/E-Commerce/E-Commerce/Images/${element.image}" alt="#"></a>
                        
                        <div class="product-badge">
                            <ul>
                                <li class="badge-1">Hot</li>
                            </ul>
                        </div>
                        <div class="product-hover-action product-hover-action-3">
                            <ul>
                                
                                <li>
                                    <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal" onclick="addToCart(${element.productId}, '${element.name}', '${element.price}', '${element.image}')">
                                        <i class="icon-handbag"></i>
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="product-info">
                        
                        <h2 class="product-title"><a href="#" onclick="storeproductid(${element.productId})">${element.name}</a></h2>
                        <div class="product-price">
                            <span>$${element.priceWithDiscount == null ? element.price : element.priceWithDiscount}</span>
                            <del>${element.priceWithDiscount != null ? '$' + element.price : ''}</del>
                        </div>
                    </div>
                </div>
            </div>
        `
        
    });
    // After dynamically appending, reinitialize Slick carousel
    if ($('#NewArrival').hasClass('slick-initialized')) {
        $('#NewArrival').slick('unslick'); // Destroy existing Slick instance
    }

    $('#NewArrival').slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<a class="slick-prev"><i class="icon-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow: '<a class="slick-next"><i class="icon-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 580,
                settings: {
                    arrows: false,
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });
}
NewArrival();



async function TopSales() {
    ;
    
    var requist = await fetch('https://localhost:7000/api/Home/TopSales')
    var responce = await requist.json();

    var TopSales = document.getElementById('TopSales');

    responce.forEach(element => {

        TopSales.innerHTML += `
            <div class="col-12">
                <div class="ltn__product-item ltn__product-item-4">
                    <div class="product-img">
                        <a href="#" onclick="storeproductid(${element.productId})"><img style="height: 350px; object-fit: cover; width: 300px" src="../../../Back-End/E-Commerce/E-Commerce/Images/${element.image}" alt="#"></a>
                        
                        <div class="product-badge">
                            <ul>
                                <li class="badge-1">Hot</li>
                            </ul>
                        </div>
                        <div class="product-hover-action product-hover-action-3">
                            <ul>
                                
                                <li>
                                    <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal" onclick="addToCart(${element.productId}, '${element.name}', '${element.price}', '${element.image}')">
                                        <i class="icon-handbag"></i>
                                    </a>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                    <div class="product-info">
                        
                        <h2 class="product-title"><a href="#" onclick="storeproductid(${element.productId})">${element.name}</a></h2>
                        <div class="product-price">
                            <span>$${element.priceWithDiscount == null ? element.price : element.priceWithDiscount}</span>
                            <del>${element.priceWithDiscount != null ? '$' + element.price : ''}</del>
                        </div>
                    </div>
                </div>
            </div>
        `
        
    });
   // After dynamically appending, reinitialize Slick carousel
   if ($('#TopSales').hasClass('slick-initialized')) {
    $('#TopSales').slick('unslick'); // Destroy existing Slick instance
}

$('#TopSales').slick({
    arrows: true,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<a class="slick-prev"><i class="icon-arrow-left" alt="Arrow Icon"></i></a>',
    nextArrow: '<a class="slick-next"><i class="icon-arrow-right" alt="Arrow Icon"></i></a>',
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 580,
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
    ]
    });
}

TopSales();

async function OffSale() {
    ;

    var requist = await fetch('https://localhost:7000/api/Home/OffSale')
    var responce = await requist.json();

    var OffSale = document.getElementById('OffSale');

    responce.forEach(element => {
        
        OffSale.innerHTML += `
            <div class="col-12">
                <div class="ltn__product-item ltn__product-item-4">
                    <div class="product-img">
                        <a href="#" onclick="storeproductid(${element.productId})"><img style="height: 350px; object-fit: cover; width: 300px" src="../../../Back-End/E-Commerce/E-Commerce/Images/${element.image}" alt="#"></a>
                        <div class="product-badge">
                            <ul>
                                <li class="badge-2">${element.priceWithDiscount != null ? 
        (parseFloat(((element.price - element.priceWithDiscount) / element.price) * 100).toFixed(2)) + '%' : ''}</li>
                            </ul>
                        </div>
                        <div class="product-hover-action product-hover-action-3">
                            <ul>
                               
                                <li>
                                    <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal" onclick="addToCart(${element.productId}, '${element.name}', '${element.price}', '${element.image}')">
                                        <i class="icon-handbag"></i>
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="product-info">
                        
                        <h2 class="product-title"><a href="#" onclick="storeproductid(${element.productId})">${element.name}</a></h2>
                        <div class="product-price">
                            <span>$${element.priceWithDiscount == null ? element.price : element.priceWithDiscount}</span>
                            <del>${element.priceWithDiscount != null ? '$' + element.price : ''}</del>
                        </div>
                    </div>
                </div>
            </div>

        `
    });
    // After dynamically appending, reinitialize Slick carousel
    if ($('#OffSale').hasClass('slick-initialized')) {
        $('#OffSale').slick('unslick'); // Destroy existing Slick instance
    }

    $('#OffSale').slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<a class="slick-prev"><i class="icon-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow: '<a class="slick-next"><i class="icon-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 580,
                settings: {
                    arrows: false,
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });
    
}

OffSale();


async function TopProducts() {
    ;

    var requist = await fetch('https://localhost:7000/api/Home/TopProducts')
    var responce = await requist.json();

    var TopProducts = document.getElementById('TopProducts');

    responce.forEach(element => {
        
        TopProducts.innerHTML += `
            
        <div class="col-12">
                    <div class="ltn__product-item ltn__product-item-4">
                        <div class="product-img">
                            <a href="" onclick="storeproductid(${element.productId})"><img style="height: 350px; object-fit: cover; width: 300px" src="../../../Back-End/E-Commerce/E-Commerce/Images/${element.image}" alt="#"></a>
                            <div class="product-badge">
                               <ul>
                                <li class="badge-2">${element.priceWithDiscount != null ? 
        (parseFloat(((element.price - element.priceWithDiscount) / element.price) * 100).toFixed(2)) + '%' : ''}</li>
                            </ul>
                            </div>
                            <div class="product-hover-action product-hover-action-3">
                                <ul>
                                   
                                    <li>
                                        <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal" onclick="addToCart(${element.productId}, '${element.name}', '${element.price}', '${element.image}')">
                                            <i class="icon-handbag"></i>
                                        </a>
                                    </li>
                                  
                                </ul>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="product-ratting">
                                <ul>
                                    ${generateStars(element.rating)}  <!-- Dynamically generated stars -->
                                    <li class="review-total">  ( ${element.reviewCount} Reviews )</li>

                                </ul>
                            </div>
                            <h2 class="product-title"><a href="" onclick="storeproductid(${element.productId})">${element.name}</a></h2>
                            <div class="product-price">
                            <span>$${element.priceWithDiscount == null ? element.price : element.priceWithDiscount}</span>
                            <del>${element.priceWithDiscount != null ? '$' + element.price : ''}</del>
                        </div>
                        </div>
                    </div>
                </div>
        `
    
        
})

// After dynamically appending, reinitialize Slick carousel
if ($('#TopProducts').hasClass('slick-initialized')) {
    $('#TopProducts').slick('unslick'); // Destroy existing Slick instance
}

$('#TopProducts').slick({
    arrows: true,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<a class="slick-prev"><i class="icon-arrow-left" alt="Arrow Icon"></i></a>',
    nextArrow: '<a class="slick-next"><i class="icon-arrow-right" alt="Arrow Icon"></i></a>',
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 580,
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
    ]
});
};
TopProducts()

function generateStars(rating) {
    let fullStars = Math.floor(rating); // Full stars based on the integer part of the rating
    let halfStar = rating % 1 !== 0; // If there's a decimal part, we need a half star
    let emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining stars are empty

    let starsHTML = '';

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += ` <li><i class="fas fa-star"></i></li>`; // Full star
    }

    // Add half star if needed
    if (halfStar) {
        starsHTML += ` <li><i class="fas fa-star-half-alt"></i></li>`; // Half star
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += ` <li><i class="far fa-star"></i></li>`; // Empty star
    }

    return starsHTML;
}
function storeproductid(productId) {
    ;
    localStorage.setItem('productId', productId);
    window.location.href = '../rania/product-details.html';
}
