let tempoInicio;
let intervalo;
let comecou = false;
let times;

let salvo = localStorage.getItem("times");
if (salvo == null) {
    times = {
        hurakan: {
            nome: "Hurakan",
            voltas: [],
            nVoltas: 0,
            voltaMenor: Infinity,
            voltaMaior: -Infinity,
            tempoInicialVolta: 0
        },
        seteCap: {
            nome: "7 Capitães",
            voltas: [],
            nVoltas: 0,
            voltaMenor: Infinity,
            voltaMaior: -Infinity,
            tempoInicialVolta: 0
        },
        solares: {
            nome: "Solares",
            voltas: [],
            nVoltas: 0,
            voltaMenor: Infinity,
            voltaMaior: -Infinity,
            tempoInicialVolta: 0
        },
        zenite: {
            nome: "Zenite",
            voltas: [],
            nVoltas: 0,
            voltaMenor: Infinity,
            voltaMaior: -Infinity,
            tempoInicialVolta: 0
        },
        solaris: {
            nome: "Solaris",
            voltas: [],
            nVoltas: 0,
            voltaMenor: Infinity,
            voltaMaior: -Infinity,
            tempoInicialVolta: 0
        },
        arari: {
            nome: "Araribóia",
            voltas: [],
            nVoltas: 0,
            voltaMenor: Infinity,
            voltaMaior: -Infinity,
            tempoInicialVolta: 0
        }
    }
    console.log(`Salvo == null`)

} else {
    times = JSON.parse(salvo);
    iniciarCronometro();
}

Object.entries(times).forEach((time) => {
    const container = document.createElement("div");

    let nVoltas = String(time[1].nVoltas).padStart(2, "0");

    container.innerHTML = `
        <div style="border: 1px solid black;" class="time" onclick="adicionarVolta('${time[0]}')">
            <span class="time__top">
                <h2>${time[1].nome}</h2>
                <p class="time__tempo" id=tempo_${time[0]}>00:00:00</p>
            </span>
            <hr class="separacao">
            <span class="time__bottom">
                <p id=volta_${time[0]} class="time__voltas">${nVoltas}</p>
                <button onclick="event.stopPropagation(); mostraTempos('${time[0]}')"> Tempos </button>
                ${/* <button onclick="event.stopPropagation(); alert('foi')">-</button> */''}
            </span>
        </div>
    `
    document.getElementById("list").append(container);
    console.log(time);
})
atualizaPosicoes(times)

function adicionarVolta(nomeId) {
    if (!comecou) {
        alert("Inicie o cronômetro antes!");
        return;
    }

    let con = confirm(`Adicionar uma VOLTA no time ${times[nomeId].nome}?`);
    if (!con) return;

    let voltas = ++times[nomeId].nVoltas;
    voltas = voltas.toString();
    document.getElementById(`volta_${nomeId}`).textContent = `${voltas.padStart(2, "0")}`;


    let voltaAtual = Date.now() - times[nomeId].tempoInicialVolta;
    console.log(voltaAtual);
    times[nomeId].voltas.push(voltaAtual);
    if (voltaAtual < times[nomeId].voltaMenor) {
        times[nomeId].voltaMenor = voltaAtual;
    }

    if (voltaAtual > times[nomeId].voltaMaior) {
        times[nomeId].voltaMaior = voltaAtual;
    }

    times[nomeId].tempoInicialVolta = Date.now();
    console.log(atualizaPosicoes(times));
    localStorage.setItem("times", JSON.stringify(times));
    console.log(`Modificado: ${JSON.stringify(times)}`)
}

function atualizaPosicoes(times){

    let posicoes = [];
    Object.entries(times).forEach((elem) => {
        posicoes.push({ nome: elem[1].nome, nVoltas: elem[1].nVoltas });
    })

    posicoes.sort((a, b) => b.nVoltas - a.nVoltas);
    // return posicoes

    let numero = 0;
    let voltasAnterior = -9999;
    document.getElementById("posicoes").innerHTML = "";
    posicoes.forEach((elem) => {
        if (voltasAnterior != elem.nVoltas) {
            numero++;
        }
        let timePos = document.createElement("p")
        timePos.innerHTML = `
            <p>${numero}. ${elem.nome}</p>
        `;
        document.getElementById("posicoes").append(timePos);
        voltasAnterior = elem.nVoltas;
    })
}

function atualizaTempos(nomeId) {
    let tabelaTempos = document.getElementById("tempoVoltas");
    tabelaTempos.innerHTML = "";

    tabelaTempos.innerHTML =`<button onclick="mostraTempos('${nomeId}')">X</button>`;

    let pNome = document.createElement("p");
    let pMenorVolta = document.createElement("p");
    let pMaiorVolta = document.createElement("p");
    pNome.innerHTML = times[nomeId].nome;
    pNome.className = "tempoVoltas__titulo";

    times[nomeId].voltaMenor == Infinity ? 
        pMenorVolta.innerText = "--:--.---" :
        pMenorVolta.innerText = converterTempo(times[nomeId].voltaMenor, 0);

    pMenorVolta.style = "background-color: green;";

    times[nomeId].voltaMaior == -Infinity ?
        pMaiorVolta.innerText = "--:--.---" :
        pMaiorVolta.innerText = converterTempo(times[nomeId].voltaMaior, 0);
    
    pMaiorVolta.style = "background-color: red;";

    tabelaTempos.append(pNome);
    tabelaTempos.append(pMenorVolta);
    tabelaTempos.append(pMaiorVolta);

    let cont = 1;
    times[nomeId].voltas.forEach((volta) => {
        let voltaELement = document.createElement("p");
        let voltaConvertido = converterTempo(volta, 0)
        voltaELement.innerHTML = `
            ${cont}| ${voltaConvertido}
        `;
        tabelaTempos.append(voltaELement);
        cont++;
    })

}

function iniciarCronometro() {
    if (comecou) {
        alert("Cronômetro já começou!!");
        return;
    }
    let salvo = localStorage.getItem("tempoInicio");


    if (salvo == null) {
        tempoInicio = Date.now();
        Object.entries(times).forEach((elem) => {
            elem[1].tempoInicialVolta = tempoInicio;
        })
        localStorage.setItem("tempoInicio", tempoInicio);
        console.log("foi");
    } else {
        tempoInicio = parseInt(salvo);   
    }
    
    intervalo = setInterval(() => {
        let tempoAgora = Date.now();
        document.getElementById("tempoGeral").textContent = converterTempo(tempoAgora - tempoInicio, true);

        Object.entries(times).forEach((elem) => {
            let tempoCadaTime = tempoAgora - elem[1].tempoInicialVolta;
            document.getElementById(`tempo_${elem[0]}`).textContent = converterTempo(tempoCadaTime, false);
        })
    }, 170)
    localStorage.setItem("times", JSON.stringify(times))
    comecou = true;
}

function pararCronometro() {
    let con = confirm("Deseja PARAR o Cronometro?");
    if (!con) return;

    clearInterval(intervalo);
    comecou = false;
    localStorage.removeItem("tempoInicio");
    localStorage.removeItem("times");
    exportar();
}

function converterTempo(mili, geral) {
    const segundosTotais = mili / 1000;

    let horas = Math.floor(segundosTotais / 3600);
    let min = Math.floor((segundosTotais % 3600) / 60);
    let seg = (segundosTotais % 60).toFixed(3);

    horas = horas.toString().padStart(2, "0");
    min = min.toString().padStart(2, "0");
    seg = seg.padStart(6, "0");

    if (geral) return `${horas}:${min}:${seg}`;
    else return `${min}:${seg}`;
}

function mostrarPosicoes() {
    let displayIf = document.getElementById("posicoes").style.display;
    console.log(displayIf)
    document.getElementById("posicoes").style.display = displayIf == "none" || displayIf == "" ? "block" : "none";
}

function mostraTempos(time) {
    if (!comecou) {
        alert("Inicie o cronômetro antes!");
        return;
    }
    atualizaTempos(time);

    let displayIf = document.getElementById("tempoVoltas").style.display;
    console.log(displayIf);
    document.getElementById("tempoVoltas").style.display = displayIf == "none" || displayIf == "" ? "flex" : "none";
}

function exportar() {
    let paginaExp = window.open("");

    paginaExp.document.write(`
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="stylesheet" href="style/global.css">
    `);

    
    
    Object.entries(times).forEach((equipe) => {
        let titulo = document.createElement("h3");
        let numeroVoltas = document.createElement("span");
        let menorVolta = document.createElement("p");
        let maiorVolta = document.createElement("p");

        titulo.style = "display: inline-block; margin-bottom: 1.2vh";
        
        titulo.innerText = equipe[1].nome;
        numeroVoltas.innerHTML = " | " + equipe[1].nVoltas;

        equipe[1].voltaMenor == Infinity ? 
            menorVolta.innerText = "--:--.---" :
            menorVolta.innerText = converterTempo(equipe[1].voltaMenor, 0);

        menorVolta.style = "background-color: green; display: inline-block;"

        equipe[1].voltaMaior == -Infinity ? 
            maiorVolta.innerText = "--:--.---" :
            maiorVolta.innerText = converterTempo(equipe[1].voltaMaior, 0);
        
        maiorVolta.style = "background-color: red; display: inline-block;"

        paginaExp.document.write(titulo.outerHTML);
        paginaExp.document.write(numeroVoltas.outerHTML);
        paginaExp.document.write("<br>");
        paginaExp.document.write(menorVolta.outerHTML);
        paginaExp.document.write("<br>");
        paginaExp.document.write(maiorVolta.outerHTML);
        paginaExp.document.write("<br>");
        paginaExp.document.write("<br>");
        
        let voltasSpan = document.createElement("p");
        let cont = 1;
        equipe[1].voltas.forEach((volta) => {
            voltasSpan.innerText = cont + ". " + converterTempo(volta, 0);
            paginaExp.document.write(voltasSpan.outerHTML);
            cont++;
        })

    })

    paginaExp.document.write(`<br> --------------------------------------------- `);
    paginaExp.document.write(`<pre>${JSON.stringify(times, null, 2)}</pre>`);
}