const selecoes = document.querySelectorAll(".frontend");
const cartoes = document.querySelectorAll(".cartao-frontend");

function selecionar(frontend, rolar = false) {
    const cartao = document.getElementById("cartao-" + frontend.id);

    if (!cartao) return;

    selecoes.forEach(botao => {
        const ativo = botao === frontend;

        botao.classList.toggle("ativo", ativo);
        botao.setAttribute("aria-pressed", String(ativo));
    });

    cartoes.forEach(item => {
        const ativo = item === cartao;

        item.classList.toggle("aberto", ativo);
        item.hidden = !ativo;
    });

    atualizarPratica(frontend);

    if (rolar && window.matchMedia("(max-width: 750px)").matches) {
        cartao.scrollIntoView({
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
                ? "auto"
                : "smooth",
            block: "start"
        });
    }
}

selecoes.forEach(frontend => {
    frontend.addEventListener("click", () => {
        selecionar(frontend, true);
    });
});

const inicial = document.querySelector(".frontend.ativo") || selecoes[0];

const exemplos = {
    HTML: [
        "Fundamentos",
        "Organiza o conteúdo da página com elementos semânticos.",
        "Criar a estrutura de uma página de portfólio.",
        `<main>
  <h1>Meu portfólio</h1>
  <p>Projetos e experiências.</p>
</main>`
    ],

    CSS: [
        "Fundamentos",
        "Define o visual e a adaptação da interface.",
        "Montar uma grade de cartões que se adapta à tela.",
        `.projetos {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}`
    ],

    JavaScript: [
        "Fundamentos",
        "Responde às ações de quem usa a página.",
        "Alterar um texto ao clicar em um botão.",
        `const botao = document.querySelector("button");

botao.addEventListener("click", () => {
  botao.textContent = "Selecionado!";
});`
    ],

    TypeScript: [
        "Fundamentos",
        "Adiciona tipos para ajudar a detectar erros durante o desenvolvimento.",
        "Representar os dados de um equipamento.",
        `type Equipamento = {
  nome: string;
  disponivel: boolean;
};

const item: Equipamento = {
  nome: "Notebook",
  disponivel: true
};`
    ],

    React: [
        "Interfaces",
        "Divide a interface em componentes reutilizáveis.",
        "Reutilizar o mesmo cartão em uma lista de projetos.",
        `function Projeto({ nome }) {
  return <article><h2>{nome}</h2></article>;
}`
    ],

    Bootstrap: [
        "Interfaces",
        "Oferece estilos e componentes prontos.",
        "Criar rapidamente um botão com estilos consistentes.",
        `<!-- Com Bootstrap carregado -->
<button class="btn btn-primary">
  Ver projetos
</button>`
    ],

    TailwindCSS: [
        "Interfaces",
        "Compõe estilos com classes utilitárias.",
        "Estilizar um cartão diretamente na marcação.",
        `<!-- Com Tailwind configurado -->
<article class="rounded-xl bg-white p-6">
  <h2 class="text-xl font-bold">Projeto</h2>
</article>`
    ],

    Vue: [
        "Interfaces",
        "Conecta dados e interface por meio de componentes reativos.",
        "Criar um contador interativo.",
        `<script setup>
import { ref } from "vue";
const total = ref(0);
</script>

<template>
  <button @click="total++">{{ total }}</button>
</template>`
    ],

    Angular: [
        "Interfaces",
        "Estrutura aplicações com componentes e recursos integrados.",
        "Organizar uma tela de um sistema com várias funcionalidades.",
        `import { Component } from "@angular/core";

@Component({
  selector: "app-boas-vindas",
  template: "<h1>Olá, dev!</h1>"
})
export class BoasVindas {}`
    ],

    Jest: [
        "Ferramentas",
        "Verifica resultados de funções com testes automatizados.",
        "Garantir que um cálculo continue funcionando.",
        `function somar(a, b) {
  return a + b;
}

test("soma dois números", () => {
  expect(somar(2, 3)).toBe(5);
});`
    ],

    "Next.js": [
        "Interfaces",
        "Adiciona recursos de aplicação ao ecossistema React.",
        "Criar uma página de um site usando App Router.",
        `// app/page.jsx
export default function Home() {
  return <h1>Meu portfólio</h1>;
}`
    ],

    Sass: [
        "Interfaces",
        "Amplia o CSS com recursos como variáveis e aninhamento.",
        "Reutilizar uma cor em diferentes elementos.",
        `$destaque: #004448;

.botao {
  background: $destaque;

  &:hover {
    opacity: .9;
  }
}`
    ],

    Vite: [
        "Ferramentas",
        "Oferece um ambiente de desenvolvimento e build.",
        "Iniciar um projeto simples de JavaScript.",
        `npm create vite@latest meu-projeto -- --template vanilla
cd meu-projeto
npm install
npm run dev`
    ],

    Cypress: [
        "Ferramentas",
        "Testa interações da aplicação no navegador.",
        "Conferir se selecionar CSS abre o cartão correto.",
        `describe("Seleção de tecnologia", () => {
  it("abre o cartão CSS", () => {
    cy.visit("/");
    cy.get("#CSS").click();
    cy.get("#cartao-CSS").should("be.visible");
  });
});`
    ],

    APIRest: [
        "APIs",
        "Permite buscar dados de um servidor via HTTP.",
        "Carregar uma lista de projetos de uma API.",
        `// A rota precisa existir no servidor.
const resposta = await fetch("/api/projetos");

if (!resposta.ok) throw new Error("Falha na API");

const projetos = await resposta.json();`
    ],

    GraphQL: [
        "APIs",
        "Permite especificar os campos desejados em uma consulta.",
        "Buscar apenas o nome e o link dos projetos.",
        `# Exemplo: depende do schema da API
query {
  projetos {
    nome
    link
  }
}`
    ]
};

function atualizarPratica(botao) {
    const item = exemplos[botao.id];

    if (!item) return;

    document.getElementById("pratica-titulo").textContent =
        botao.textContent.trim() + " em ação";

    document.getElementById("uso").textContent = item[1];
    document.getElementById("cenario").textContent = item[2];
    document.getElementById("exemplo").textContent = item[3];
    document.getElementById("copiado").textContent = "";
}

let categoria = "Todas";

const busca = document.getElementById("busca");

function filtrar() {
    const termo = busca.value.trim().toLocaleLowerCase("pt-BR");

    let total = 0;

    selecoes.forEach(botao => {
        const visivel =
            botao.textContent.toLocaleLowerCase("pt-BR").includes(termo) &&
            (categoria === "Todas" || exemplos[botao.id][0] === categoria);

        botao.closest("li").hidden = !visivel;

        if (visivel) {
            total++;
        }
    });

    document.querySelectorAll(".listagem").forEach(nav => {
        nav.hidden = !Array.from(nav.querySelectorAll("li")).some(li => {
            return !li.hidden;
        });
    });

    document.querySelector(".contador").textContent =
        total + (total === 1 ? " tecnologia" : " tecnologias");

    document.getElementById("sem-resultados").hidden = total !== 0;

    const ativo = document.querySelector(".frontend.ativo");

    if (total && ativo?.closest("li").hidden) {
        selecionar(
            Array.from(selecoes).find(botao => {
                return !botao.closest("li").hidden;
            })
        );
    }
}

busca.addEventListener("input", filtrar);

document.querySelectorAll("[data-filtro]").forEach(botao => {
    botao.addEventListener("click", () => {
        categoria = botao.dataset.filtro;

        document.querySelectorAll("[data-filtro]").forEach(item => {
            item.setAttribute("aria-pressed", String(item === botao));
        });

        filtrar();
    });
});

document.getElementById("copiar").addEventListener("click", async () => {
    const texto = document.getElementById("exemplo").textContent;

    try {
        await navigator.clipboard.writeText(texto);

        document.getElementById("copiado").textContent = "Exemplo copiado!";
    } catch {
        const range = document.createRange();

        range.selectNodeContents(document.getElementById("exemplo"));

        const selecao = window.getSelection();

        selecao.removeAllRanges();
        selecao.addRange(range);

        document.getElementById("copiado").textContent =
            "Use Ctrl+C ou o comando Copiar para copiar o trecho selecionado.";
    }
});

if (inicial) {
    selecionar(inicial);
}
