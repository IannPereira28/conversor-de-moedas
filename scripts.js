const botaoConverter = document.querySelector(".botao-converter");
const valorSelecionado = document.querySelector(".valor-selecionado");
const fromCurrency = document.getElementById("fromCurrency");
const inputValor = document.querySelector(".input-valor");
const valorMoedaConverter = document.querySelector(".valor-moeda-converter");
const valorMoedaConvertida = document.querySelector(".valor-moeda");

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

// Mapeamento de moedas para códigos de países
const moedaParaPais = {
  BRL: "BR", // Brasil
  USD: "US", // Estados Unidos
  EUR: "EU", // União Europeia
  GBP: "GB", // Reino Unido
  JPY: "JP", // Japão
  CAD: "CA", // Canadá
  AUD: "AU", // Austrália
  CHF: "CH", // Suíça
  CNY: "CN", // China
  INR: "IN", // Índia
  KRW: "KR", // Coreia do Sul
  MXN: "MX", // México
  ARS: "AR", // Argentina
  CLP: "CL", // Chile
  COP: "CO", // Colômbia
  PEN: "PE", // Peru
  UYU: "UY", // Uruguai
  RUB: "RU", // Rússia
  ZAR: "ZA", // África do Sul
  TRY: "TR", // Turquia
  SEK: "SE", // Suécia
  NOK: "NO", // Noruega
  DKK: "DK", // Dinamarca
  PLN: "PL", // Polônia
  CZK: "CZ", // República Tcheca
  HUF: "HU", // Hungria
  ILS: "IL", // Israel
  SGD: "SG", // Singapura
  HKD: "HK", // Hong Kong
  NZD: "NZ", // Nova Zelândia
  THB: "TH", // Tailândia
  MYR: "MY", // Malásia
  PHP: "PH", // Filipinas
  IDR: "ID", // Indonésia
  VND: "VN", // Vietnã
  EGP: "EG", // Egito
  NGN: "NG", // Nigéria
  KES: "KE", // Quênia
  GHS: "GH", // Gana
};

// Função para obter URL da bandeira
function obterUrlBandeira(codigoMoeda) {
  const codigoPais = moedaParaPais[codigoMoeda];
  if (codigoPais) {
    // Usando a API flagcdn.com (gratuita e rápida)
    return `https://flagcdn.com/32x24/${codigoPais.toLowerCase()}.png`;
  }
  return null;
}

// Função para criar elemento de bandeira
function criarElementoBandeira(codigoMoeda, tamanho = "32x24") {
  const codigoPais = moedaParaPais[codigoMoeda];
  if (codigoPais) {
    const img = document.createElement("img");
    img.src = `https://flagcdn.com/${tamanho}/${codigoPais.toLowerCase()}.png`;
    img.alt = `Bandeira ${codigoMoeda}`;
    img.style.marginRight = "8px";
    img.style.verticalAlign = "middle";
    img.style.borderRadius = "2px";
    img.onerror = function () {
      // Fallback caso a bandeira não carregue
      this.style.display = "none";
    };
    return img;
  }
  return null;
}

// Função para formatar valores de acordo com a moeda
function formatarMoeda(valor, codigoMoeda) {
  const localeMap = {
    BRL: "pt-BR",
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
    JPY: "ja-JP",
    CAD: "en-CA",
    AUD: "en-AU",
    CHF: "de-CH",
    CNY: "zh-CN",
    INR: "en-IN",
    KRW: "ko-KR",
    MXN: "es-MX",
    ARS: "es-AR",
    CLP: "es-CL",
    COP: "es-CO",
    PEN: "es-PE",
    UYU: "es-UY",
  };

  const locale = localeMap[codigoMoeda] || "en-US";

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: codigoMoeda,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  } catch (error) {
    console.warn(
      `Formatação não suportada para ${codigoMoeda}, usando formato padrão`
    );
    return `${codigoMoeda} ${valor.toFixed(2)}`;
  }
}

// Função para atualizar display com bandeira e valor
function atualizarDisplayComBandeira(elemento, valor, codigoMoeda) {
  if (!elemento) return;

  // Limpar conteúdo anterior
  elemento.innerHTML = "";

  // Criar container para bandeira e texto
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";

  // Adicionar bandeira
  const bandeira = criarElementoBandeira(codigoMoeda);
  if (bandeira) {
    container.appendChild(bandeira);
  }

  // Adicionar texto formatado
  const textoValor = document.createElement("span");
  textoValor.textContent = formatarMoeda(valor, codigoMoeda);
  container.appendChild(textoValor);

  elemento.appendChild(container);
}

async function converterValores() {
  try {
    const valorInput = parseFloat(inputValor.value);

    if (isNaN(valorInput) || valorInput <= 0) {
      alert("Por favor, insira um valor válido!");
      return;
    }

    if (!fromCurrency.value || !valorSelecionado.value) {
      alert("Por favor, selecione as moedas!");
      return;
    }

    console.log("Moeda de origem:", fromCurrency.value);
    console.log("Moeda de destino:", valorSelecionado.value);

    const response = await fetch(API_URL + fromCurrency.value);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!data.rates) {
      throw new Error(
        "Dados de taxa de câmbio não encontrados na resposta da API"
      );
    }

    const rate = data.rates[valorSelecionado.value];

    if (rate === undefined || rate === null) {
      throw new Error(
        `Taxa de câmbio não encontrada para ${valorSelecionado.value}`
      );
    }

    const convertedValue = valorInput * rate;

    // Atualizar displays com bandeiras
    atualizarDisplayComBandeira(
      valorMoedaConverter,
      valorInput,
      fromCurrency.value
    );
    atualizarDisplayComBandeira(
      valorMoedaConvertida,
      convertedValue,
      valorSelecionado.value
    );

    console.log(
      `Conversão: ${formatarMoeda(
        valorInput,
        fromCurrency.value
      )} = ${formatarMoeda(convertedValue, valorSelecionado.value)}`
    );
  } catch (error) {
    console.error("Erro detalhado:", error);
    alert(`Erro ao converter moeda: ${error.message}`);
  }
}

botaoConverter.addEventListener("click", converterValores);

inputValor.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    converterValores();
  }
});

// Adicionar bandeiras aos selects quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  adicionarBandeirasAosSelects();
});