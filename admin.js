// admin.js (Versão Definitiva SPA - Estável e Completa)
document.addEventListener('DOMContentLoaded', () => {
    let storeData = {};
    let ordersData = [];
    const views = document.querySelectorAll('.view');
    const tabs = document.querySelectorAll('.tab-button');
    const productForm = document.getElementById('product-form');
    const categoryForm = document.getElementById('category-form');
    const productFormTitle = document.getElementById('product-form-title');
    const categoryFormTitle = document.getElementById('category-form-title');

    function init() {
        if (typeof defaultStoreData === 'undefined') {
            document.body.innerHTML = '<h1>ERRO CRÍTICO: O arquivo database.js não foi encontrado ou está com erro.</h1>';
            return;
        }
        const storedProducts = localStorage.getItem('lagesTechProducts');
        storeData = storedProducts ? JSON.parse(storedProducts) : defaultStoreData;
        ordersData = JSON.parse(localStorage.getItem('lagesTechOrders')) || [];
        localStorage.setItem('lagesTechProducts', JSON.stringify(storeData));
        setupEventListeners();
        showView('products-view');
    }

    function showView(viewId) {
        views.forEach(view => view.style.display = 'none');
        document.getElementById(viewId).style.display = 'block';
        tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.view === viewId));
        if (viewId === 'orders-view') renderOrders();
        if (viewId === 'history-view') renderHistory();
        if (viewId === 'products-view') renderStoreManagement();
    }

    function renderStoreManagement() {
        const container = document.getElementById('products-view');
        container.innerHTML = `<div class="admin-toolbar"><button data-action="restore-catalog" class="restore-button button">Restaurar Padrão</button><button data-action="add-category" class="add-category-button button">Novo Departamento</button><button data-action="add-product" class="add-button-main button">Adicionar Produto</button></div><div id="categories-container-admin"></div>`;
        const catContainer = container.querySelector('#categories-container-admin');
        if (!storeData.categories || Object.keys(storeData.categories).length === 0) { catContainer.innerHTML = '<p class="no-orders-message">Nenhum departamento cadastrado.</p>'; return; }
        Object.keys(storeData.categories).forEach(catName => {
            const category = storeData.categories[catName];
            const productsHTML = category.products.map(p => `<div class="product-card-admin"><img src="${p.imagem}" alt="${p.nome}"><div class="product-info-admin"><h4>${p.nome}</h4><p>${p.preco}</p><p>Estoque: ${p.estoque}</p></div><div class="product-actions-admin"><button class="button" data-action="edit-product" data-id="${p.id}">Editar</button><button class="button delete-button" data-action="delete-product" data-id="${p.id}">Excluir</button></div></div>`).join('');
            const categorySection = document.createElement('div');
            categorySection.className = 'category-admin-section';
            categorySection.innerHTML = `<div class="category-header-admin"><img src="${category.imagem}" alt="${catName}"><h2>${catName}</h2><div class="category-actions"><button class="button edit-category-btn" data-action="edit-category" data-name="${catName}">Editar</button><button class="button delete-category-btn" data-action="delete-category" data-name="${catName}">Excluir</button></div></div><div class="products-grid-admin">${productsHTML}</div>`;
            catContainer.appendChild(categorySection);
        });
    }

    function renderOrders() {
        const container = document.getElementById('orders-view');
        const pendingOrders = ordersData.filter(order => order.status === 'Pendente');
        let ordersHTML = `<div class="orders-grid">`;
        if (pendingOrders.length === 0) { ordersHTML += '<p class="no-orders-message">Nenhum pedido pendente no momento.</p>'; } else {
            pendingOrders.slice().reverse().forEach(order => {
                ordersHTML += `<div class="order-card status-pending"><div class="order-header"><h3>${order.productName}</h3><span>${order.timestamp}</span></div><div class="order-body"><div class="order-item"><span>Cliente:</span><span>${order.customerName}</span></div><div class="order-item"><span>CPF:</span><span>${order.customerCpf}</span></div><div class="order-item"><span>Contato:</span><span>${order.customerPhone}</span></div><div class="order-item"><span>Endereço:</span><span class="address">${order.customerAddress}</span></div><div class="order-item"><span>Pagamento:</span><span>${order.paymentMethod}</span></div></div><div class="order-footer"><span class="order-price">${order.productPrice}</span><div class="order-actions"><button class="cancel-button button" data-action="cancel-order" data-id="${order.id}">Cancelar</button><button class="save-button button" data-action="deliver-order" data-id="${order.id}">Entregue</button></div></div></div>`;
            });
        }
        ordersHTML += `</div>`;
        container.innerHTML = ordersHTML;
    }

    function renderHistory() {
        const container = document.getElementById('history-view');
        const archivedOrders = ordersData.filter(order => order.status !== 'Pendente');
        let historyHTML = `<div class="admin-toolbar"><button class="clear-button button" data-action="clear-history">Limpar Histórico</button></div><div class="orders-grid">`;
        if (archivedOrders.length === 0) { historyHTML += '<p class="no-orders-message">O histórico de vendas está vazio.</p>'; } else {
            archivedOrders.slice().reverse().forEach(order => {
                const statusClass = order.status === 'Entregue' ? 'status-delivered' : 'status-cancelled';
                historyHTML += `<div class="order-card ${statusClass}"><div class="order-header"><h3>${order.productName}</h3><span class="order-status-badge">${order.status}</span></div><div class="order-body"><div class="order-item"><span>Cliente:</span><span>${order.customerName}</span></div></div><div class="order-footer"><span>${order.timestamp}</span><span class="order-price">${order.productPrice}</span></div></div>`;
            });
        }
        historyHTML += `</div>`;
        container.innerHTML = historyHTML;
    }
    
    function setupEventListeners() {
        document.body.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if (!action) return;
            const viewTarget = e.target.dataset.viewTarget;
            if (viewTarget) return showView(viewTarget);
            const itemId = e.target.dataset.id || e.target.dataset.name;
            switch (action) {
                case 'add-product': showProductForm(); break;
                case 'add-category': showCategoryForm(); break;
                case 'restore-catalog': restoreDefaultCatalog(); break;
                case 'edit-product': showProductForm(itemId); break;
                case 'delete-product': deleteProduct(itemId); break;
                case 'edit-category': showCategoryForm(itemId); break;
                case 'delete-category': deleteCategory(itemId); break;
                case 'deliver-order': updateOrderStatus(itemId, 'Entregue'); break;
                case 'cancel-order': updateOrderStatus(itemId, 'Cancelado'); break;
                case 'clear-history': clearHistory(); break;
                case 'toggle-details': e.target.closest('.history-card').classList.toggle('is-expanded'); break;
            }
        });
        tabs.forEach(tab => tab.addEventListener('click', (e) => showView(e.target.dataset.view)));
        productForm.addEventListener('submit', handleProductFormSubmit);
        categoryForm.addEventListener('submit', handleCategoryFormSubmit);
    }
    
    function saveStoreData() { localStorage.setItem('lagesTechProducts', JSON.stringify(storeData)); }
    function saveOrdersData() { localStorage.setItem('lagesTechOrders', JSON.stringify(ordersData)); }

    function showProductForm(productId = null) {
        productForm.reset();
        productForm.querySelector('#product-id').value = '';
        if (productId) {
            productFormTitle.textContent = 'Editar Produto';
            const { product, categoryName } = findProductById(productId);
            if(product) {
                productForm.querySelector('#product-id').value = product.id;
                productForm.querySelector('#product-name').value = product.nome;
                productForm.querySelector('#product-category').value = categoryName;
                productForm.querySelector('#product-price').value = product.preco;
                productForm.querySelector('#product-stock').value = product.estoque;
                productForm.querySelector('#product-image-url').value = product.imagem;
                productForm.querySelector('#product-desc').value = product.descricao;
                productForm.querySelector('#product-keywords').value = product.palavras_chave;
            }
        } else { productFormTitle.textContent = 'Adicionar Novo Produto'; }
        showView('edit-product-view');
    }

    function showCategoryForm(categoryName = null) {
        categoryForm.reset();
        categoryForm.querySelector('#category-original-name').value = '';
        if (categoryName) {
            categoryFormTitle.textContent = 'Editar Departamento';
            const category = storeData.categories[categoryName];
            if(category) {
                categoryForm.querySelector('#category-original-name').value = categoryName;
                categoryForm.querySelector('#category-name').value = categoryName;
                categoryForm.querySelector('#category-image').value = category.imagem;
            }
        } else { categoryFormTitle.textContent = 'Adicionar Novo Departamento'; }
        showView('edit-category-view');
    }

    function handleProductFormSubmit(e) { e.preventDefault(); const id = productForm.querySelector('#product-id').value; const categoryName = productForm.querySelector('#product-category').value.trim(); const originalCategory = findProductById(id)?.categoryName; const productData = { id: id || `prod_${Date.now()}`, nome: productForm.querySelector('#product-name').value, preco: productForm.querySelector('#product-price').value, estoque: parseInt(productForm.querySelector('#product-stock').value), imagem: productForm.querySelector('#product-image-url').value, descricao: productForm.querySelector('#product-desc').value, palavras_chave: productForm.querySelector('#product-keywords').value, }; if (!storeData.categories[categoryName]) { storeData.categories[categoryName] = { imagem: "https://i.imgur.com/623F2S4.png", products: [] }; } if (id && originalCategory) { storeData.categories[originalCategory].products = storeData.categories[originalCategory].products.filter(p => p.id !== id); } storeData.categories[categoryName].products.push(productData); saveStoreData(); showView('products-view'); }
    function handleCategoryFormSubmit(e) { e.preventDefault(); const originalName = categoryForm.querySelector('#category-original-name').value; const newName = categoryForm.querySelector('#category-name').value.trim(); const newImage = categoryForm.querySelector('#category-image').value; if (!newName) return; if (originalName && originalName !== newName) { storeData.categories[newName] = storeData.categories[originalName]; delete storeData.categories[originalName]; } else if (!originalName) { storeData.categories[newName] = { imagem: newImage, products: [] }; } storeData.categories[newName].imagem = newImage; saveStoreData(); showView('products-view'); }
    function deleteProduct(productId) { if (confirm('Tem certeza?')) { for (const cat in storeData.categories) { storeData.categories[cat].products = storeData.categories[cat].products.filter(p => p.id !== productId); } saveStoreData(); renderStoreManagement(); } }
    function deleteCategory(categoryName) { if (confirm(`Tem certeza?`)) { delete storeData.categories[categoryName]; saveStoreData(); renderStoreManagement(); } }
    function updateOrderStatus(orderId, newStatus) { const orderIndex = ordersData.findIndex(order => order.id === orderId); if (orderIndex === -1) return; if (newStatus === 'Entregue') { const order = ordersData[orderIndex]; const { product } = findProductById(order.productId); if (product && product.estoque > 0) { product.estoque -= 1; saveStoreData(); } } ordersData[orderIndex].status = newStatus; saveOrdersData(); renderOrders(); }
    function clearHistory() { if (confirm('Limpar histórico?')) { ordersData = ordersData.filter(o => o.status === 'Pendente'); saveOrdersData(); renderHistory(); } }
    function restoreDefaultCatalog() { if (confirm('Restaurar catálogo?')) { localStorage.setItem('lagesTechProducts', JSON.stringify(defaultStoreData)); storeData = defaultStoreData; showView('products-view'); } }
    function findProductById(productId) { for (const catName in storeData.categories) { const product = storeData.categories[catName].products.find(p => p.id === productId); if (product) return { product, categoryName: catName }; } return {}; }
    
    init();
});