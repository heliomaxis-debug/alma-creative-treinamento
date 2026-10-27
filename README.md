# Transmissão ao Vivo · Alma Creative | Alma Church

Treinamento interativo para os voluntários da equipe de transmissão do **Alma Creative**. Ensina, do zero, a conectar a ATEM Mini, configurar o OBS Studio, criar a transmissão no YouTube e colocar a live no ar com segurança.

Inclui:

- **28 slides** em 7 módulos, em formato 16:9 para telão, com diagramas próprios em SVG.
- **Notas do apresentador** em todos os slides.
- **Modo instrutor**, com o slide atual, o próximo, as notas e um cronômetro, sincronizado com o telão.
- **Consulta rápida**: checklist operacional, fluxo de sinal, simulador de diagnóstico, procedimentos e glossário.
- **Questionário** com explicação após cada resposta e **checklists** marcáveis.

Funciona 100% local, sem APIs pagas e sem internet depois de instalado (a fonte Inter vem embutida).

## Requisitos

- [Node.js](https://nodejs.org/) 18 ou superior (testado com Node 24).
- Um navegador atual (Chrome, Edge, Firefox ou Safari).

## Instalação

Abra o terminal na pasta do projeto e instale as dependências:

```bash
npm install
```

## Execução

```bash
npm run dev
```

Acesse **http://localhost:5173** no navegador.

### Versão final (build)

```bash
npm run build
```

```bash
npm run preview
```

O build fica na pasta `dist/` e pode ser servido por qualquer servidor de arquivos estáticos.

## Uso no telão

1. Abra a apresentação no computador ligado ao telão e aperte **F** para a tela cheia.
2. No mesmo navegador, abra o **modo instrutor** (tecla **I** ou `#/instrutor`) em outra janela e deixe-a no notebook do apresentador.
3. As duas janelas ficam sincronizadas: avançar em uma avança na outra. A sincronização usa `BroadcastChannel`, que funciona apenas entre janelas **do mesmo navegador, no mesmo computador**.
4. Aperte **B** para deixar o telão preto durante uma demonstração no equipamento real.

## Atalhos de teclado

| Tecla | Ação |
| --- | --- |
| `→` · `Espaço` · `PageDown` | Próximo slide |
| `←` · `PageUp` | Slide anterior |
| `Home` / `End` | Primeiro / último slide |
| `F` | Tela cheia |
| `N` | Mostrar/ocultar notas do apresentador |
| `M` | Menu de módulos |
| `B` | Tela preta |
| `R` | Reiniciar (voltar ao slide 1) |
| `C` | Consulta rápida |
| `I` | Modo instrutor |
| `?` | Ajuda com os atalhos |
| `Esc` | Fechar menu, notas ou ajuda |

## Rotas

| Endereço | Conteúdo |
| --- | --- |
| `#/slide/N` | Slide número N (ex.: `#/slide/12`) |
| `#/consulta/<aba>` | Consulta rápida: `checklist`, `fluxo`, `diagnostico`, `procedimentos`, `glossario` |
| `#/instrutor` | Modo instrutor |

## Estrutura de pastas

```text
public/
  favicon.svg
  brand/logo.png          ← logo oficial (opcional)
src/
  App.tsx                 rotas da aplicação
  index.css               tema (cores, fontes, animações)
  components/
    brand/                marca Alma Creative
    diagrams/             diagramas SVG (ATEM, OBS, fluxo, medidor de áudio)
    interactive/          checklist, questionário, simulador de diagnóstico
    presentation/         palco 16:9, menu, notas, ajuda
    ui/                   componentes base (moldura, avisos, passos, cards)
  data/                   checklist, glossário, quiz, diagnósticos, procedimentos
  hooks/                  teclado, tela cheia, escala do palco
  lib/                    tipos, rotas, armazenamento local, sincronização
  pages/                  apresentação, consulta rápida, modo instrutor
  slides/                 moduloN.tsx: conteúdo e notas de cada módulo
```

## Personalização

**Logo.** Salve a logo oficial em `public/brand/logo.png`. A capa passa a usá-la automaticamente; sem o arquivo, aparece a versão em SVG.

**Cor de destaque.** Altere `--color-accent` (e `--color-accent-soft`) em `src/index.css`.

**Slides e notas.** Cada módulo fica em `src/slides/moduloN.tsx`. Cada slide tem:

- `title`, o título no menu;
- `Component`, o conteúdo visual;
- `notes`, com `roteiro`, `demonstracao`, `perguntas`, `atencao` e `tempo`.

Para adicionar um slide, inclua um item no array do módulo. A numeração é automática.

**Checklists, quiz e glossário.** Edite os arquivos em `src/data/`.

## Segurança

> **Nunca coloque a chave de transmissão do YouTube neste projeto**: nem em código, nem em arquivos, nem em capturas de tela usadas nos slides. Quem tem a chave pode transmitir no canal da igreja. Trate-a como senha.

As telas do YouTube Studio exibidas no treinamento são ilustrações, com a chave sempre mascarada.

## Observações

- Os nomes de menus e botões do **OBS Studio** e do **YouTube Studio** podem mudar conforme a versão e o idioma. Se algo estiver diferente na tela real, siga a função descrita, não o nome exato.
- Os recursos da **ATEM Mini** variam entre os modelos (Mini, Pro, Pro ISO, Extreme). Confira o modelo da igreja antes de ministrar o treinamento.
- O progresso dos checklists fica salvo apenas no navegador de quem os marcou.
