# Tabela Hurakan (Mobile)

Cronômetro de voltas para acompanhar as equipes durante a competição. Roda direto no navegador (HTML, CSS e JavaScript puros, sem instalação de dependências), então basta servir os arquivos e abrir no celular.

## Como usar o app

- **Começar**: inicia o cronômetro geral e o de todas as equipes.
- **Tocar no card de uma equipe**: registra uma volta (pede confirmação).
- **Tempos**: mostra menor volta, maior volta, média e todas as voltas da equipe.
- **Posições**: mostra a classificação pelo número de voltas.
- **Diferença para o Hurakan**: o selo verde/vermelho nos cards das outras equipes mostra a diferença para o Hurakan (`+` verde = Hurakan na frente, `-` vermelho = Hurakan atrás). Quando a diferença é de duas ou mais voltas, mostra `+1 volta`, `-2 voltas`, etc.
- **Exportar**: abre uma página com o resumo e os dados completos.
- **Parar**: encerra o cronômetro, **apaga os dados salvos** e abre a exportação.

Os dados ficam salvos no navegador (`localStorage`), então fechar ou recarregar a página não perde a corrida em andamento.

## Rodando no Android (Termux + Python)

### 1. Instalar o Termux

Instale o **Termux** pela Play Store.

### 2. Instalar o Python e o Git

Abra o Termux e rode:

```bash
pkg update
pkg install python git
```

### 3. Baixar o projeto (branch `comp2026`)

```bash
git clone -b comp2026 https://github.com/lucas1520/Hurakan-tabelaMobile.git
cd Hurakan-tabelaMobile
```

> Se preferir não usar o Git, baixe o ZIP da branch pelo navegador em
> `https://github.com/lucas1520/Hurakan-tabelaMobile/archive/refs/heads/comp2026.zip`,
> extraia (`pkg install unzip` e `unzip comp2026.zip`) e entre na pasta extraída.

Para atualizar o projeto depois, dentro da pasta:

```bash
git pull
```

### 4. Subir o servidor

Dentro da pasta do projeto:

```bash
python -m http.server 8000
```

Deixe o Termux aberto, o servidor roda enquanto o comando estiver ativo. Para parar, use `Ctrl + C`.

### 5. Abrir no navegador

- No **próprio celular**: abra o Chrome (ou outro navegador) e acesse
  `http://localhost:8000`
- Em **outro aparelho na mesma rede Wi-Fi**: descubra o IP do celular com `pkg install net-tools` e `ifconfig` (procure o `inet` da interface `wlan0`) e acesse `http://IP_DO_CELULAR:8000`

## Dicas

- **Use sempre a mesma porta/endereço.** Os dados ficam salvos por endereço, então `localhost:8000` e `localhost:8080` têm dados separados.
- **Mantenha o Termux ativo.** Na notificação do Termux, toque em *Acquire wakelock* para o Android não encerrar o servidor com a tela apagada.
- **Exportar abre uma nova aba.** Se nada acontecer, permita pop-ups para o site nas configurações do navegador.
- **Começar uma corrida nova:** use **Parar** (isso limpa os dados salvos). Se algo ficar travado, limpe os dados do site nas configurações do navegador.
