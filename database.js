// database.js - Catálogo COMPLETO da Lages Tech (com Imagens Otimizadas para Web)

const defaultStoreData = {
    categories: {
        "Smartphones": {
            imagem: "https://i.imgur.com/L3paLd8.jpg", // Imagem de categoria otimizada
            products: [
                // --- LINHA GALAXY S24 ---
                {
                    id: 'S2401',
                    nome: "Samsung Galaxy S24 - 256GB",
                    preco: "R$ 3.599,00",
                    descricao: "Performance confiável e recursos de IA Galaxy AI em um design compacto. Ótimo valor.",
                    imagem: "https://i.imgur.com/gB3aA3A.jpg", // IMAGEM LEVE
                    estoque: 25,
                    palavras_chave: ["samsung", "galaxy s24", "s24", "ia", "custo-benefício"]
                },
                {
                    id: 'S2402',
                    nome: "Samsung Galaxy S24+ - 256GB",
                    preco: "R$ 4.299,00",
                    descricao: "Tela maior para vídeos e jogos, mais bateria e todo o poder do Galaxy AI.",
                    imagem: "https://i.imgur.com/L97a24j.jpg", // IMAGEM LEVE
                    estoque: 18,
                    palavras_chave: ["samsung", "galaxy s24+", "s24+", "tela grande", "bateria"]
                },
                {
                    id: 'S2403',
                    nome: "Samsung Galaxy S24 Ultra - 256GB",
                    preco: "R$ 5.699,00",
                    descricao: "Ainda um gigante da produtividade com S Pen e a câmera com o zoom mais poderoso da categoria.",
                    imagem: "https://i.imgur.com/PlGV4z2.jpg", // IMAGEM LEVE
                    estoque: 10,
                    palavras_chave: ["samsung", "galaxy s24 ultra", "s24 ultra", "câmera", "zoom", "s pen", "produtividade"]
                },

                // --- LINHA GALAXY S25 ---
                {
                    id: 'S2501',
                    nome: "Samsung Galaxy S25 - 256GB",
                    preco: "R$ 5.999,00",
                    descricao: "O novo padrão de inteligência artificial, com processador de última geração e câmera que redefine a noite.",
                    imagem: "https://i.imgur.com/xHZTg1i.jpg", // IMAGEM LEVE
                    estoque: 30,
                    palavras_chave: ["samsung", "galaxy s25", "s25", "lançamento", "novo", "ia"]
                },
                {
                    id: 'S2502',
                    nome: "Samsung Galaxy S25+ - 256GB",
                    preco: "R$ 6.899,00",
                    descricao: "Tela imersiva com brilho aprimorado e a bateria mais inteligente já vista em um Galaxy.",
                    imagem: "https://i.imgur.com/b49V0gM.jpg", // IMAGEM LEVE
                    estoque: 22,
                    palavras_chave: ["samsung", "galaxy s25+", "s25+", "tela grande", "bateria", "lançamento"]
                },
                {
                    id: 'S2503',
                    nome: "Samsung Galaxy S25 Ultra - 512GB",
                    preco: "R$ 8.999,00",
                    descricao: "O auge da tecnologia móvel. Corpo em titânio, S Pen com novas funções de IA e um sistema de câmeras inigualável.",
                    imagem: "https://i.imgur.com/fA7102p.jpg", // IMAGEM LEVE
                    estoque: 15,
                    palavras_chave: ["samsung", "galaxy s25 ultra", "s25 ultra", "câmera", "zoom", "s pen", "lançamento", "performance"]
                },

                // --- LINHA IPHONE 15 ---
                {
                    id: 'A1501',
                    nome: "iPhone 15 - 128GB",
                    preco: "R$ 4.599,00",
                    descricao: "Ainda poderoso com o chip A16 Bionic, Dynamic Island e uma câmera principal de 48MP.",
                    imagem: "https://i.imgur.com/u3g0s1C.jpg", // IMAGEM LEVE
                    estoque: 40,
                    palavras_chave: ["apple", "iphone", "iphone 15", "custo-benefício"]
                },
                {
                    id: 'A1502',
                    nome: "iPhone 15 Pro - 256GB",
                    preco: "R$ 5.899,00",
                    descricao: "Corpo em titânio, chip A17 Pro de alta performance e Botão de Ação customizável.",
                    imagem: "https://i.imgur.com/fQ7Qz5A.jpg", // IMAGEM LEVE
                    estoque: 15,
                    palavras_chave: ["apple", "iphone", "iphone 15 pro", "performance"]
                },
                {
                    id: 'A1503',
                    nome: "iPhone 15 Pro Max - 256GB",
                    preco: "R$ 6.799,00",
                    descricao: "Tela ProMotion gigante, a melhor bateria da linha e zoom óptico de 5x para fotos à distância.",
                    imagem: "https://i.imgur.com/XFp3R2j.jpg", // IMAGEM LEVE
                    estoque: 8,
                    palavras_chave: ["apple", "iphone", "iphone 15 pro max", "bateria", "câmera"]
                },

                // --- LINHA IPHONE 16 ---
                {
                    id: 'A1601',
                    nome: "iPhone 16 - 256GB",
                    preco: "R$ 7.499,00",
                    descricao: "O padrão ouro dos smartphones. Chip A18, design refinado e o 'Botão de Captura' para fotos rápidas.",
                    imagem: "https://i.imgur.com/G5nQnZ0.jpg", // IMAGEM LEVE
                    estoque: 35,
                    palavras_chave: ["apple", "iphone", "iphone 16", "lançamento", "novo"]
                },
                 {
                    id: 'A1602',
                    nome: "iPhone 16 Pro - 256GB",
                    preco: "R$ 8.899,00",
                    descricao: "Performance Pro com o chip A18 Pro, tela ProMotion e sistema de câmeras avançado com IA.",
                    imagem: "https://i.imgur.com/eLdMTEW.jpg", // IMAGEM LEVE
                    estoque: 18,
                    palavras_chave: ["apple", "iphone", "iphone 16 pro", "performance", "lançamento"]
                },
                {
                    id: 'A1603',
                    nome: "iPhone 16 Pro Max - 256GB",
                    preco: "R$ 9.899,00",
                    descricao: "A experiência Apple definitiva. Tela maior, câmeras Pro com zoom de 5x e o poderoso chip A18 Pro.",
                    imagem: "https://i.imgur.com/136PnuQ.jpg", // IMAGEM LEVE
                    estoque: 12,
                    palavras_chave: ["apple", "iphone", "iphone 16 pro max", "câmera", "lançamento"]
                }
            ]
        },
        "Notebooks": {
            imagem: "https://i.imgur.com/8a614Xw.jpg", // Imagem de categoria otimizada
            products: [
                {
                    id: 'N01',
                    nome: "MacBook Air 13\" (Chip M4)",
                    preco: "R$ 9.999,00",
                    descricao: "Incrivelmente fino e leve, com a performance revolucionária do chip M4. Perfeito para o dia a dia.",
                    imagem: "https://i.imgur.com/b2r5Sf8.jpg", // IMAGEM LEVE
                    estoque: 20,
                    palavras_chave: ["notebook", "macbook", "apple", "m4", "leve", "estudo"]
                },
                {
                    id: 'N02',
                    nome: "MacBook Pro 14\" (Chip M4 Pro)",
                    preco: "R$ 15.999,00",
                    descricao: "Potência extrema para tarefas pesadas como edição de vídeo e programação.",
                    imagem: "https://i.imgur.com/XotP9AR.jpg", // IMAGEM LEVE
                    estoque: 10,
                    palavras_chave: ["notebook", "macbook", "apple", "m4 pro", "edição", "design", "performance"]
                },
                {
                    id: 'N03',
                    nome: "Samsung Galaxy Book4 Ultra",
                    preco: "R$ 11.499,00",
                    descricao: "A combinação perfeita de design premium e poder com processador Intel Core Ultra 9.",
                    imagem: "https://i.imgur.com/S2tA9Q1.jpg", // IMAGEM LEVE
                    estoque: 15,
                    palavras_chave: ["notebook", "samsung", "galaxy book", "windows", "trabalho"]
                }
            ]
        },
        "Áudio": {
            imagem: "https://i.imgur.com/S0w2oc9.jpg", // Imagem de categoria otimizada
            products: [
                {
                    id: 'A01',
                    nome: "SonicWave Buds Pro",
                    preco: "R$ 799,00",
                    descricao: "Fones sem fio com cancelamento de ruído ativo e áudio espacial imersivo.",
                    imagem: "https://i.imgur.com/mOub36e.jpg", // IMAGEM LEVE
                    estoque: 30,
                    palavras_chave: ["fone", "audio", "cancelamento de ruido", "sem fio"]
                },
                {
                    id: 'A02',
                    nome: "RhythmBox Speaker",
                    preco: "R$ 459,00",
                    descricao: "Caixa de som Bluetooth portátil, à prova d'água e com graves potentes.",
                    imagem: "https://i.imgur.com/lE2KSAI.jpg", // IMAGEM LEVE
                    estoque: 25,
                    palavras_chave: ["caixa de som", "audio", "bluetooth", "portatil"]
                }
            ]
        }
    }
};