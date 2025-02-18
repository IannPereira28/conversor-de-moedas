const botaoConverter = document.querySelector(".botao-converter")
const valorSelecionado = document.querySelector(".valor-selecionado")

function converterValores() {
    const inputvalor = document.querySelector(".input-valor").value
    const valorMoedaConverter = document.querySelector(".valor-moeda-converter")
    const valorMoedaConvertida = document.querySelector(".valor-moeda")

    console.log(valorSelecionado.value)

    const dolarToday = 5.83
    const euroToday = 6.55
    const bitcoinToday = 96.668
    const libraToday = 7.20


    if (valorSelecionado.value == "dolar") {
        valorMoedaConvertida.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputvalor / dolarToday)
    }

    if (valorSelecionado.value == "euro") {
        valorMoedaConvertida.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputvalor / euroToday)
    }

    if (valorSelecionado.value == "Libra") {
        valorMoedaConvertida.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(inputvalor / libraToday)
    }

    if (valorSelecionado.value == "Bitcoin") {
        valorMoedaConvertida.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "BTC"
        }).format(inputvalor / bitcoinToday)
    }

    valorMoedaConverter.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputvalor)
}

function changeMoeda() {
    const nomeMoeda = document.getElementById("nome-moeda")
    const moedaImg = document.querySelector(".moeda-img")

    if (valorSelecionado.value == "dolar") {
        nomeMoeda.innerHTML = "Dólar"
        moedaImg.src = "./img/dolar.png"
    }
    if (valorSelecionado.value == "euro") {
        nomeMoeda.innerHTML = "Euro"
        moedaImg.src = "./img/euro.png"
    }

    if (valorSelecionado.value == "Libra") {
        nomeMoeda.innerHTML = "Libra"
        moedaImg.src = "./img/libra 1.png"
    }

    if (valorSelecionado.value == "Bitcoin") {
        nomeMoeda.innerHTML = "Bitcoin"
        moedaImg.src = "./img/bitcoin 1.png"
    }

    converterValores()
}


valorSelecionado.addEventListener("change", changeMoeda)
botaoConverter.addEventListener("click", converterValores)