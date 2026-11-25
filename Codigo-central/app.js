
// =========================
// PACIENTE ATIVO
// =========================

function obterPacienteAtivo() {

    let pacientes =
    JSON.parse(
        localStorage.getItem("pacientes")
    ) || [];

    let indice =
    localStorage.getItem(
        "pacienteAtivoIndice"
    );

    if (indice === null) {
        return null;
    }

    return pacientes[indice];
}


function salvarPaciente(novoPaciente) {

    let pacientes =
    JSON.parse(
        localStorage.getItem("pacientes")
    ) || [];

    novoPaciente.id =
    Date.now();

    novoPaciente.status =
    "Cadastro realizado";

    novoPaciente.avaliacao = {};

    novoPaciente.sinais = {};

    novoPaciente.complemento = {};

    novoPaciente.necessidades = {};

    novoPaciente.plano = {};

    novoPaciente.logs = [];

    pacientes.push(novoPaciente);

    localStorage.setItem(
        "pacientes",
        JSON.stringify(pacientes)
    );
}

// =========================
// MOSTRAR PACIENTE ATIVO
// =========================

function mostrarPacienteAtivo() {

    const paciente = obterPacienteAtivo();

    if (!paciente) return;

    const nomeEl =
    document.getElementById("nomePaciente");

    const idadeEl =
    document.getElementById("idadePaciente");

    const sexoEl =
    document.getElementById("sexoPaciente");

    const generoEl =
    document.getElementById("generoPaciente");

    if (nomeEl)
        nomeEl.innerText = paciente.nome;

    if (idadeEl)
        idadeEl.innerText = paciente.idade;

    if (sexoEl)
        sexoEl.innerText = paciente.sexo;

    if (generoEl)
        generoEl.innerText = paciente.genero;
}


// =========================
// ATUALIZAR PACIENTE
// =========================

function atualizarPacienteAtivo(campo, dados, status) {

    let pacientes =
    JSON.parse(
        localStorage.getItem("pacientes")
    ) || [];

    let indice =
    localStorage.getItem(
        "pacienteAtivoIndice"
    );

    if (indice === null) return;

    pacientes[indice][campo] = dados;

    pacientes[indice].status = status;

    localStorage.setItem(
        "pacientes",
        JSON.stringify(pacientes)
    );
}


//FINAL DA DIVISÃO DO CÓDIGO REFATORADO


//Função para resgatar dados da tabela de pacientes
const tabelaPacientes = document.getElementById('tabelaPacientes');
if (tabelaPacientes) {
  let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  
  pacientes.forEach((p, index) => {
    const linha = document.createElement('tr');

linha.innerHTML = `
<td>${p.nome}</td>
<td>${p.idade}</td>
<td>${p.sexo}</td>
<td>${p.genero}</td>
<td>${p.status || "-"}</td>
<td>


<button onclick="abrirPaciente(${index})">
    Abrir
</button>

<button onclick="verResumo(${index})">
    Resumo
</button>

</td>
`;

    tabelaPacientes.appendChild(linha);
  });
}

// Função para abrir paciente específico
function abrirPaciente(indice) {

    localStorage.setItem(
        "pacienteAtivoIndice",
        indice
    );

    window.location.href =
    "/Avaliacao-enfermagem/avaliacao.html";

}

// Cadastro do paciente
const formPaciente = document.getElementById('formPaciente');
if (formPaciente) {
  formPaciente.addEventListener('submit', e => {
    e.preventDefault();
    const paciente = {
      nome: document.getElementById('nome').value,
      idade: document.getElementById('idade').value,
      sexo: document.getElementById('sexo_biologico').value,
      genero: document.getElementById('genero').value
    };
   

console.log("Salvando paciente...");

salvarPaciente(paciente);

let pacientes =
JSON.parse(
 localStorage.getItem("pacientes")
) || [];

localStorage.setItem(
 "pacienteAtivoIndice",
 pacientes.length - 1
);

window.location.href =
"/Avaliacao-enfermagem/avaliacao.html";


  });
}

const formAvaliacao =
document.getElementById("formAvaliacao");

if (formAvaliacao) {

    mostrarPacienteAtivo();

    formAvaliacao.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const avaliacao = {

                queixa:
                document.getElementById("queixa").value,

                historico:
                document.getElementById("historico").value

            };

            atualizarPacienteAtivo(
                "avaliacao",
                avaliacao,
                "Avaliação realizada"
            );

            window.location.href =
            "/Sinais-vitais/sinais-vitais.html";

        }
    );
}

const formSinais =
document.getElementById("formSinais");

if (formSinais) {

    mostrarPacienteAtivo();

    formSinais.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const sinais = {

                temperatura:
                document.getElementById("temperatura").value,

                pressao:
                document.getElementById("pressao").value,

                frequenciaCardiaca:
                document.getElementById("frequencia_cardiaca").value,

                frequenciaRespiratoria:
                document.getElementById("frequencia_respiratoria").value,

                saturacao:
                document.getElementById("saturacao").value,

                observacoes:
                document.getElementById("observacoes").value

            };

            atualizarPacienteAtivo(
                "sinais",
                sinais,
                "Sinais vitais coletados"
            );

            window.location.href =
            "/Complemento/complemento.html";

        }
    );
}


const formComplemento =
document.getElementById("formComplemento");

if (formComplemento) {

    mostrarPacienteAtivo();

    formComplemento.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const complemento = {

                alimentacao:
                document.getElementById("alimentacao").value,

                sono:
                document.getElementById("sono").value,

                eliminacoes:
                document.getElementById("eliminacoes").value,

                atividade:
                document.getElementById("atividade").value,

                psicossocial:
                document.getElementById("psicossocial").value

            };

            atualizarPacienteAtivo(
                "complemento",
                complemento,
                "Complemento preenchido"
            );

            window.location.href =
            "/Necessidades/necessidades.html";

        }
    );
}
 

const formNecessidades =
document.getElementById("formNecessidades");

if (formNecessidades) {

    mostrarPacienteAtivo();

    formNecessidades.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const necessidades = {

                fisiologicas:
                document.getElementById("necessidade_fisiologica").value,

                psicologicas:
                document.getElementById("necessidade_psicologica").value,

                sociais:
                document.getElementById("necessidade_social").value,

                espirituais:
                document.getElementById("necessidade_espiritual").value

            };

            atualizarPacienteAtivo(
                "necessidades",
                necessidades,
                "Necessidades identificadas"
            );

            window.location.href =
            "/Plano-cuidados/plano-cuidados.html";

        }
    );
}





const formPlano =
document.getElementById("formPlano");

if (formPlano) {

    mostrarPacienteAtivo();

    formPlano.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const plano = {

                diagnostico:
                document.getElementById("diagnostico").value,

                objetivos:
                document.getElementById("objetivos").value,

                intervencoes:
                document.getElementById("intervencoes").value,

                avaliacaoResultados:
                document.getElementById("avaliacao_resultados").value

            };

            atualizarPacienteAtivo(
                "plano",
                plano,
                "Plano de cuidados elaborado"
            );

            window.location.href =
            "/Revisao/revisao.html";

        }
    );
}





mostrarPacienteAtivo();

// Preencher revisão

  
const dadosRevisao =
document.getElementById(
 "dadosRevisao"
);

if (dadosRevisao) {

   const paciente =
   obterPacienteAtivo();

   if(!paciente) {  dadosRevisao.innerHTML =
    "<p>Nenhum paciente selecionado.</p>";

} else { }

   const avaliacao =
   paciente.avaliacao || {};

   const sinais =
   paciente.sinais || {};

   const complemento =
   paciente.complemento || {};

   const necessidades =
   paciente.necessidades || {};

   const plano =
   paciente.plano || {};

   dadosRevisao.innerHTML = `
<h3>Paciente</h3>

<p><strong>Nome:</strong> ${paciente.nome}</p>

<p><strong>Idade:</strong> ${paciente.idade}</p>

<p><strong>Sexo:</strong> ${paciente.sexo}</p>

<p><strong>Gênero:</strong> ${paciente.genero}</p>

<h3>Avaliação</h3>

<p><strong>Queixa:</strong> ${avaliacao.queixa || ""}</p>

<p><strong>Histórico:</strong> ${avaliacao.historico || ""}</p>

<h3>Sinais Vitais</h3>

<p><strong>Temperatura:</strong> ${sinais.temperatura || ""}</p>

<p><strong>Pressão:</strong> ${sinais.pressao || ""}</p>

<p><strong>FC:</strong> ${sinais.frequenciaCardiaca || ""}</p>

<h3>Plano</h3>

<p><strong>Diagnóstico:</strong>
${plano.diagnostico || ""}
</p>

<p><strong>Intervenções:</strong>
${plano.intervencoes || ""}
</p>
`;
}

// Botão Confirmar e Salvar
const formRevisao = document.getElementById('formRevisao');
if (formRevisao) {
  formRevisao.addEventListener('submit', e => {
    e.preventDefault();
    // Redireciona para a tela de sucesso
    window.location.href = "/salvo/salvo.html";
  });
}

const resumoClinico =
document.getElementById("resumoClinico");

if (resumoClinico) {

    const paciente =
    obterPacienteAtivo();

    if (!paciente) {

        resumoClinico.innerHTML =
        "<p>Nenhum paciente selecionado.</p>";

    } else {

        const avaliacao =
        paciente.avaliacao || {};

        const sinais =
        paciente.sinais || {};

        const complemento =
        paciente.complemento || {};

        const necessidades =
        paciente.necessidades || {};

        const plano =
        paciente.plano || {};

        resumoClinico.innerHTML = `

        <h3>Dados do Paciente</h3>

        <p><strong>Nome:</strong> ${paciente.nome || ""}</p>

        <p><strong>Idade:</strong> ${paciente.idade || ""}</p>

        <p><strong>Sexo:</strong> ${paciente.sexo || ""}</p>

        <p><strong>Gênero:</strong> ${paciente.genero || ""}</p>

        <hr>

        <h3>Avaliação de Enfermagem</h3>

        <p><strong>Queixa Principal:</strong>
        ${avaliacao.queixa || "-"}</p>

        <p><strong>Histórico:</strong>
        ${avaliacao.historico || "-"}</p>

        <hr>

        <h3>Sinais Vitais</h3>

        <p><strong>Temperatura:</strong>
        ${sinais.temperatura || "-"}</p>

        <p><strong>Pressão Arterial:</strong>
        ${sinais.pressao || "-"}</p>

        <p><strong>Frequência Cardíaca:</strong>
        ${sinais.frequenciaCardiaca || "-"}</p>

        <p><strong>Frequência Respiratória:</strong>
        ${sinais.frequenciaRespiratoria || "-"}</p>

        <p><strong>Saturação:</strong>
        ${sinais.saturacao || "-"}</p>

        <p><strong>Observações:</strong>
        ${sinais.observacoes || "-"}</p>

        <hr>

        <h3>Complemento da Avaliação</h3>

        <p><strong>Alimentação:</strong>
        ${complemento.alimentacao || "-"}</p>

        <p><strong>Sono:</strong>
        ${complemento.sono || "-"}</p>

        <p><strong>Eliminações:</strong>
        ${complemento.eliminacoes || "-"}</p>

        <p><strong>Atividade:</strong>
        ${complemento.atividade || "-"}</p>

        <p><strong>Aspectos Psicossociais:</strong>
        ${complemento.psicossocial || "-"}</p>

        <hr>

        <h3>Necessidades Identificadas</h3>

        <p><strong>Fisiológicas:</strong>
        ${necessidades.fisiologicas || "-"}</p>

        <p><strong>Psicológicas:</strong>
        ${necessidades.psicologicas || "-"}</p>

        <p><strong>Sociais:</strong>
        ${necessidades.sociais || "-"}</p>

        <p><strong>Espirituais:</strong>
        ${necessidades.espirituais || "-"}</p>

        <hr>

        <h3>Plano de Cuidados</h3>

        <p><strong>Diagnóstico:</strong>
        ${plano.diagnostico || "-"}</p>

        <p><strong>Objetivos:</strong>
        ${plano.objetivos || "-"}</p>

        <p><strong>Intervenções:</strong>
        ${plano.intervencoes || "-"}</p>

        <p><strong>Avaliação dos Resultados:</strong>
        ${plano.avaliacaoResultados || "-"}</p>

        `;
    }
}

function verResumo(indice) {

    localStorage.setItem(
        "pacienteAtivoIndice",
        indice
    );

    window.location.href =
    "/Resumo/resumo.html";
}


