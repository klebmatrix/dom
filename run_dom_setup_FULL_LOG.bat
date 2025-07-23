@echo off
REM Este script automatiza a configuração e inicialização do projeto DOM.
REM Certifique-se de que está a ser executado na pasta raiz do seu projeto (C:\Users\klebe\dom\).
REM
REM ATENÇÃO - PONTOS CRÍTICOS:
REM 1. ANTES DE EXECUTAR ESTE SCRIPT, VERIFIQUE O SEU ARQUIVO .env.local!
REM    Ele DEVE conter APENAS as 4 variáveis (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
REM    SUPABASE_SERVICE_ROLE_KEY, DATABASE_URL) com os valores CORRETOS e REAIS do seu projeto Supabase.
REM    NÃO DEVE CONTER NENHUM COMANDO DE SCRIPT OU TEXTO ADICIONAL.
REM 2. ESTE SCRIPT VAI DELETAR AS PASTAS node_modules E O ARQUIVO package-lock.json.
REM    Isso é para garantir uma instalação limpa.
REM 3. TODA A SAÍDA (INCLUINDO ERROS) SERÁ REGISTRADA EM "dom_setup_full_log.txt" na mesma pasta.
REM 4. A JANELA DO TERMINAL PERMANECERÁ ABERTA NO FINAL PARA REVISÃO.

set LOG_FILE=dom_setup_full_log.txt
if exist %LOG_FILE% del %LOG_FILE%

echo.
echo =======================================================
echo Iniciando a configuracao e inicializacao do projeto DOM
echo =======================================================
echo.

REM Redireciona toda a saída para o arquivo de log
(
    echo [PASSO 1/6] Limpando node_modules e package-lock.json...
    if exist node_modules (
        rmdir /s /q node_modules
        echo node_modules deletado.
    ) else (
        echo node_modules nao encontrado, a ignorar.
    )
    if exist package-lock.json (
        del package-lock.json
        echo package-lock.json deletado.
    ) else (
        echo package.json nao encontrado, a ignorar.
    )
    echo.

    echo [PASSO 2/6] Limpando o cache do npm...
    npm cache clean --force
    echo Cache do npm limpo.
    echo.

    echo [PASSO 3/6] Instalando todas as dependencias do npm...
    npm install
    echo Dependencias instaladas com sucesso.
    echo.

    echo [PASSO 4/6] Gerando o Prisma Client...
    npx prisma generate
    echo Prisma Client gerado com sucesso.
    echo.

    echo [PASSO 5/6] Reconstruindo o projeto Next.js (npm run build)...
    npm run build
    echo Projeto Next.js construido com sucesso.
    echo.

    echo [PASSO 6/6] Iniciando o servidor de desenvolvimento Next.js (npm run dev)...
    echo.
    echo =======================================================
    echo O servidor Next.js esta a iniciar.
    echo Mantenha esta janela do terminal aberta.
    echo =======================================================
    echo.
    npm run dev
) > %LOG_FILE% 2>&1

REM Mantém a janela do terminal aberta no final
echo.
echo =======================================================
echo O script terminou de executar.
echo Por favor, verifique o arquivo %LOG_FILE% para ver a saida completa e erros.
echo =======================================================
echo.
cmd /k
