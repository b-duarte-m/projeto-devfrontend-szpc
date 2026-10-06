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

if (inicial) {
    selecionar(inicial);
}
