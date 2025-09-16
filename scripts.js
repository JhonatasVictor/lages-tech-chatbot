// script.js (Versão Definitiva, Completa e Estável)

document.addEventListener('DOMContentLoaded', () => {
    // ========================================================================
    // 1. REFERÊNCIAS DO DOM E VARIÁVEIS DE ESTADO
    // ========================================================================
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    let selectedProduct = null;
    const storeData = JSON.parse(localStorage.getItem('lagesTechProducts')) || window.defaultStoreData;

    // ========================================================================
    // 2. FUNÇÕES DE EXIBIÇÃO (UI)
    // ========================================================================

    function displayAgentMessage(htmlContent) {
        if (!chatWindow) return;
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'agent-message');
        messageElement.innerHTML = htmlContent;
        chatWindow.appendChild(messageElement);
        scrollToBottom();
    }

    function displayUserMessage(text) {
        if (!chatWindow) return;
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        messageElement.textContent = text;
        chatWindow.appendChild(messageElement);
        scrollToBottom();
    }

    function scrollToBottom() {
        if (!chatWindow) return;
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function displayCategoryButtons(categories) {
        let buttonsHTML = '<div class="options-container">';
        categories.forEach(cat => {
            buttonsHTML += `<button class="option-button" onclick="handleOptionClick('${cat}')">${cat}</button>`;
        });
        buttonsHTML += '</div>';
        displayAgentMessage(buttonsHTML);
    }

    function displayProductCard(product) {
        let stockInfo;
        if (product.estoque > 5) {
            stockInfo = `<div class="product-stock stock-high">✓ Em estoque</div>`;
        } else if (product.estoque > 0) {
            stockInfo = `<div class="product-stock stock-low">⚡️ Últimas ${product.estoque} unidades!</div>`;
        } else {
            stockInfo = `<div class="product-stock stock-none">✗ Fora de estoque</div>`;
        }
        
        const cardAction = product.estoque > 0 ? `onclick="selectProduct('${product.id}')"` : '';
        const cardClass = product.estoque > 0 ? `product-card-vertical clickable` : `product-card-vertical`;
        const cardHTML = `<div class="${cardClass}" ${cardAction}><img src="${product.imagem}" alt="${product.nome}" class="product-image-vertical"><div class="product-info-vertical"><div class="product-header-vertical"><h3>${product.nome}</h3><div class="price">${product.preco}</div></div><p>${product.descricao}</p><div class="product-footer-vertical">${stockInfo}</div></div></div>`;
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('agent-message');
        messageElement.style.background = 'none';
        messageElement.style.padding = '0';
        messageElement.style.maxWidth = '100%';
        messageElement.innerHTML = cardHTML;
        chatWindow.appendChild(messageElement);
    }

    function displayCheckoutForm() {
        const formHTML = `
            <form id="checkout-form" class="checkout-form">
                <div class="form-group"><label for="fullName">Nome Completo</label><input type="text" id="fullName" name="fullName" required placeholder="Seu nome completo"></div>
                <div class="form-group"><label for="cpf">CPF (para Nota Fiscal)</label><input type="text" id="cpf" name="cpf" required placeholder="000.000.000-00"></div>
                <div class="form-group"><label for="phone">WhatsApp / Telefone para Contato</label><input type="tel" id="phone" name="phone" required placeholder="(21) 99999-9999"></div>
                <div class="form-group"><label for="address">Endereço de Entrega</label><small class="form-hint">Inclua um ponto de referência para facilitar a entrega.</small><textarea id="address" name="address" rows="3" required placeholder="Rua, Número, Bairro, CEP e Ponto de Referência"></textarea></div>
                <div class="form-group"><label>Forma de Pagamento</label><div class="payment-options"><div class="payment-option"><input type="radio" id="pix" name="payment" value="Pix" required><label for="pix">💠 Pix</label></div><div class="payment-option"><input type="radio" id="credito" name="payment" value="Cartão de Crédito"><label for="credito">💳 Crédito<small class="payment-note">(em até 10x)</small></label></div><div class="payment-option"><input type="radio" id="debito" name="payment" value="Cartão de Débito"><label for="debito">💳 Débito</label></div></div><small class="form-hint bandeiras">Bandeiras aceitas: Mastercard, Visa e Elo.</small></div>
                <button type="submit" class="submit-order-btn">Finalizar Pedido</button>
            </form>`;
        displayAgentMessage(formHTML);
        document.getElementById('checkout-form').addEventListener('submit', handleOrderSubmit);
    }

    // ========================================================================
    // 4. LÓGICA PRINCIPAL E PROCESSAMENTO
    // ========================================================================

    function processUserInput(text) {
        const lowerText = text.toLowerCase();
        
        const recommendationKeywords = ['recomenda', 'sugere', 'preciso de', 'qual o melhor', 'bom de', 'bom para'];
        if (recommendationKeywords.some(keyword => lowerText.includes(keyword))) {
            const featureMap = {'câmera': 'câmera', 'foto': 'câmera', 'bateria': 'bateria', 'dura mais': 'bateria', 'barato': 'custo-benefício', 'custo-benefício': 'custo-benefício', 'trabalho': 'produtividade', 'produtividade': 'produtividade', 'tela grande': 'tela grande', 'lançamento': 'lançamento', 'novo': 'lançamento', 'potente': 'performance', 'rápido': 'performance'};
            let recommendedProduct = null;
            for (const term in featureMap) {
                if (lowerText.includes(term)) {
                    const allProducts = Object.values(storeData.categories).map(cat => cat.products).flat();
                    recommendedProduct = allProducts.find(p => p.palavras_chave && p.palavras_chave.includes(featureMap[term]));
                    break;
                }
            }
            if (recommendedProduct) {
                displayAgentMessage(`Com base no que você pediu, a melhor opção seria o <strong>${recommendedProduct.nome}</strong>!`);
                displayProductCard(recommendedProduct);
            } else {
                displayAgentMessage("Posso te ajudar a escolher! Você busca um aparelho com foco em quê? (Ex: câmera, bateria, lançamento...)");
            }
            return;
        }

        if (lowerText.includes('categoria') || lowerText.includes('produto') || lowerText.includes('ver') || lowerText.includes('mostrar')) {
            const categories = Object.keys(storeData.categories);
            displayAgentMessage("Claro! Nossos departamentos são divididos em:");
            displayCategoryButtons(categories);
            return;
        }

        const foundCategory = Object.keys(storeData.categories).find(cat => lowerText.includes(cat.toLowerCase()));
        if (foundCategory) {
            const products = storeData.categories[foundCategory].products;
            displayAgentMessage(`Com certeza! Aqui estão nossos produtos de <strong>${foundCategory}</strong>:`);
            products.forEach(product => displayProductCard(product));
            return;
        }

        if (lowerText.startsWith('oi') || lowerText.startsWith('olá')) {
            displayAgentMessage("Olá! 👋 Bem-vindo à <strong>Lages Tech</strong>! Para começar, diga 'categorias' ou me peça uma recomendação.");
            return;
        }

        displayAgentMessage("Não entendi muito bem. Para ver nosso catálogo, digite <strong>'ver categorias'</strong> ou me peça uma recomendação.");
    }

    function handleOrderSubmit(event) {
        event.preventDefault();
        const fullName = document.getElementById('fullName').value;
        const cpf = document.getElementById('cpf').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

        const newOrder = {
            id: `order_${Date.now()}`,
            status: 'Pendente',
            productId: selectedProduct.id,
            productName: selectedProduct.nome,
            productPrice: selectedProduct.preco,
            customerName: fullName,
            customerCpf: cpf,
            customerPhone: phone,
            customerAddress: address,
            paymentMethod: paymentMethod,
            timestamp: new Date().toLocaleString('pt-BR')
        };
        let orders = JSON.parse(localStorage.getItem('lagesTechOrders')) || [];
        orders.push(newOrder);
        localStorage.setItem('lagesTechOrders', JSON.stringify(orders));

        const finalMessage = `<strong>Obrigado, ${fullName.split(' ')[0]}!</strong><br><br>Seu pedido para o <strong>${selectedProduct.nome}</strong> foi recebido com sucesso.<br><br>Entraremos em contato em breve pelo número <strong>${phone}</strong> para confirmar a entrega.`;
        displayAgentMessage(finalMessage);
        
        userInput.disabled = true;
        sendBtn.disabled = true;
    }

    function handleSend() {
        const text = userInput.value.trim();
        if (text === "") return;
        displayUserMessage(text);
        userInput.value = "";
        setTimeout(() => processUserInput(text), 500);
    }
    
    function startConversation() {
        if (!storeData || !storeData.categories || Object.keys(storeData.categories).length === 0) {
            displayAgentMessage("Desculpe, nosso catálogo parece estar indisponível no momento. Por favor, tente novamente mais tarde.");
            return;
        }
        displayAgentMessage("Olá! Bem-vindo à <strong>Lages Tech</strong>! 🤖<br><br>✅ Todos os nossos produtos acompanham <strong>Nota Fiscal e possuem 6 meses de garantia</strong>.<br><br>Para começar, diga <strong>'ver categorias'</strong>.");
    }

    // ========================================================================
    // 5. FUNÇÕES GLOBAIS (para onclick) E EVENT LISTENERS
    // ========================================================================
    
    window.handleOptionClick = function(optionText) {
        displayUserMessage(optionText);
        processUserInput(optionText);
    }
    
    window.selectProduct = function(productId) {
        const allProducts = Object.values(storeData.categories).map(cat => cat.products).flat();
        selectedProduct = allProducts.find(p => p.id === productId);

        if (selectedProduct) {
            const deliveryTableHTML = `
                <div class="delivery-info">
                    <p>🚚 <strong>Confira nossas taxas de entrega:</strong></p>
                    <table class="delivery-fee-table">
                        <tr><td>Até 10km</td><td><strong>R$ 20,00</strong></td></tr>
                        <tr><td>Até 25km</td><td><strong>R$ 35,00</strong></td></tr>
                    </table>
                    <small>No momento, entregamos apenas na região de <strong>Campo Grande, RJ</strong> até <strong>Santa Cruz, RJ</strong>.</small>
                    <hr class="info-divider">
                    <small class="warranty-note">✅ Nossos produtos possuem <strong>Nota Fiscal e 6 meses de garantia</strong>.</small>
                </div>`;
            displayAgentMessage(
                `Ótima escolha! Para iniciar o pedido do <strong>${selectedProduct.nome}</strong>, preencha seus dados abaixo.` +
                deliveryTableHTML
            );
            displayCheckoutForm();
        }
    }

    // A inicialização só acontece se os elementos existirem
    if (sendBtn && userInput && chatWindow) {
        sendBtn.addEventListener('click', handleSend);
        userInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });
        
        // ========================================================================
        // 6. INICIALIZAÇÃO
        // ========================================================================
        setTimeout(startConversation, 1000);
    }
});