let tempoInicio;
let intervalo;
let comecou = false;
let times;

let salvo = localStorage.getItem("times");
if (salvo == "") {
    times = {
        hurakan: {
            nome: "Hurakan",
            voltas: [],
            nVoltas: 0,
            tempoInicialVolta: 0
        },
        seteCap: {
            nome: "7 Capitães",
            voltas: [],
            nVoltas: 0,
            tempoInicialVolta: 0
        },
        solares: {
            nome: "Solares",
            voltas: [],
            nVoltas: 0,
            tempoInicialVolta: 0
        },
        zenite: {
            nome: "Zenite",
            voltas: [],
            nVoltas: 0,
            tempoInicialVolta: 0
        },
        solaris: {
            nome: "Solaris",
            voltas: [],
            nVoltas: 0,
            tempoInicialVolta: 0
        },
        arari: {
            nome: "Araribóia",
            voltas: [],
            nVoltas: 0,
            tempoInicialVolta: 0
        }
    }
} else times = JSON.parse(localStorage.getItem("times"));

console.log(times);

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
                <p id=volta_${time[0]} class="time__voltas">Voltas: ${nVoltas}</p>
                <!-- <button onclick="event.stopPropagation(); alert('foi')">-</button> -->
            </span>
        </div>
    `

    document.getElementById("list").append(container);
    console.log(time);
})

function adicionarVolta(nomeId) {
    if (!comecou) {
        alert("Inicie o cronômetro antes!");
        return;
    }

    let con = confirm(`Adicionar uma VOLTA no time ${times[nomeId].nome}?`);
    if (!con) return;
    console.log(con);
    let voltas = ++times[nomeId].nVoltas;
    voltas = voltas.toString();
    document.getElementById(`volta_${nomeId}`).textContent = `Voltas: ${voltas.padStart(2, "0")}`;


    console.log(Date.now() - times[nomeId].tempoInicialVolta);
    times[nomeId].voltas.push(Date.now() - times[nomeId].tempoInicialVolta);

    times[nomeId].tempoInicialVolta = Date.now();
    console.log(atualizaPosicoes(times));
    localStorage.setItem("times", JSON.stringify(times));
    console.log(`Modificado: ${JSON.stringify(times)}`)
}

const atualizaPosicoes = (times) => {

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

function iniciarCronometro() {
    if (comecou) {
        alert("Cronômetro já começou!!");
        return;
    }
    let salvo = localStorage.getItem("tempoInicio");

    console.log(salvo);

    tempoInicio = Number.parseInt(salvo) || Date.now();
    console.log(tempoInicio);

    localStorage.setItem("tempoInicio", tempoInicio);

    console.log(converterTempo(tempoInicio, false));

    if (!Number.parseInt(salvo)) {
        Object.entries(times).forEach((elem) => {
            elem[1].tempoInicialVolta = tempoInicio;
        })
        // console.log("foi");
    }

    intervalo = setInterval(() => {
        let tempoAgora = Date.now();
        document.getElementById("tempoGeral").textContent = converterTempo(tempoAgora - tempoInicio, true);

        Object.entries(times).forEach((elem) => {
            let tempoCadaTime = tempoAgora - elem[1].tempoInicialVolta;
            document.getElementById(`tempo_${elem[0]}`).textContent = converterTempo(tempoCadaTime, false);
        })
    }, 170)
    comecou = true;
}

function pararCronometro() {
    clearInterval(intervalo);
    comecou = false;
    localStorage.setItem("tempoInicio", 0);
    localStorage.setItem("times", "");
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