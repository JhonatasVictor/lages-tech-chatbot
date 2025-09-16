// database.js - Catálogo INICIAL da Lages Tech

const defaultStoreData = {
    categories: {
        "Smartphones": {
            imagem: "https://i.imgur.com/L3paLd8.jpg",
            products: [
                // --- LINHA GALAXY S24 ---
                {
                    id: 'S2401',
                    nome: "Samsung Galaxy S24 - 256GB",
                    preco: "R$ 3.599,00",
                    descricao: "Performance confiável e recursos de IA Galaxy AI em um design compacto. Ótimo valor.",
                    imagem: "https://i.imgur.com/gB3aA3A.jpg",
                    estoque: 25,
                    palavras_chave: "samsung, galaxy s24, s24, ia, custo-benefício"
                },
                {
                    id: 'S2402',
                    nome: "Samsung Galaxy S24+ - 256GB",
                    preco: "R$ 4.299,00",
                    descricao: "Tela maior para vídeos e jogos, mais bateria e todo o poder do Galaxy AI.",
                    imagem: "https://i.imgur.com/L97a24j.jpg",
                    estoque: 18,
                    palavras_chave: "samsung, galaxy s24+, s24+, tela grande, bateria"
                },
                {
                    id: 'S2403',
                    nome: "Samsung Galaxy S24 Ultra - 256GB",
                    preco: "R$ 5.699,00",
                    descricao: "Ainda um gigante da produtividade com S Pen e a câmera com o zoom mais poderoso da categoria.",
                    imagem: "https://i.imgur.com/PlGV4z2.jpg",
                    estoque: 10,
                    palavras_chave: "samsung, galaxy s24 ultra, s24 ultra, câmera, zoom, s pen, produtividade"
                },

                // --- LINHA GALAXY S25 ---
                {
                    id: 'S2503',
                    nome: "Samsung Galaxy S25 Ultra - 512GB",
                    preco: "R$ 8.999,00",
                    descricao: "O auge da tecnologia móvel. Corpo em titânio, S Pen com novas funções de IA e um sistema de câmeras inigualável.",
                    imagem: "https://i.imgur.com/fA7102p.jpg",
                    estoque: 15,
                    palavras_chave: "samsung, galaxy s25 ultra, s25 ultra, câmera, zoom, s pen, lançamento, performance"
                },

                // --- LINHA IPHONE 15 ---
                {
                    id: 'A1502',
                    nome: "iPhone 15 Pro - 256GB",
                    preco: "R$ 5.899,00",
                    descricao: "Corpo em titânio, chip A17 Pro de alta performance e Botão de Ação customizável.",
                    imagem: "https://i.imgur.com/fQ7Qz5A.jpg",
                    estoque: 15,
                    palavras_chave: "apple, iphone, iphone 15 pro, performance"
                },

                // --- LINHA IPHONE 16 ---
                {
                    id: 'A1603',
                    nome: "iPhone 16 Pro Max - 256GB",
                    preco: "R$ 9.899,00",
                    descricao: "A experiência Apple definitiva. Tela maior, câmeras Pro com zoom de 5x e o poderoso chip A18 Pro.",
                    imagem: "https://i.imgur.com/136PnuQ.jpg",
                    estoque: 12,
                    palavras_chave: "apple, iphone, iphone 16 pro max, câmera, lançamento"
                }
            ]
        },
        "Notebooks": {
            imagem: "https://i.imgur.com/8a614Xw.jpg",
            products: [
                {
                    id: 'N01',
                    nome: "MacBook Air 13\" (Chip M4)",
                    preco: "R$ 9.999,00",
                    descricao: "Incrivelmente fino e leve, com a performance revolucionária do chip M4. Perfeito para o dia a dia.",
                    imagem: "https://i.imgur.com/b2r5Sf8.jpg",
                    estoque: 20,
                    palavras_chave: "notebook, macbook, apple, m4, leve, estudo"
                },
                {
                    id: 'N03',
                    nome: "Samsung Galaxy Book4 Ultra",
                    preco: "R$ 11.499,00",
                    descricao: "A combinação perfeita de design premium e poder com processador Intel Core Ultra 9.",
                    imagem: "https://i.imgur.com/S2tA9Q1.jpg",
                    estoque: 15,
                    palavras_chave: "notebook, samsung, galaxy book, windows, trabalho"
                }
            ]
        },
        "Áudio": {
            imagem: "https://i.imgur.com/S0w2oc9.jpg",
            products: [
                {
                    id: 'A01',
                    nome: "SonicWave Buds Pro",
                    preco: "R$ 799,00",
                    descricao: "Fones sem fio com cancelamento de ruído ativo e áudio espacial imersivo.",
                    imagem: "https://i.imgur.com/mOub36e.jpg",
                    estoque: 30,
                    palavras_chave: "fone, audio, cancelamento de ruido, sem fio"
                }
            ]
        }
    }
};