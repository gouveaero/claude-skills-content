import { readFileSync } from 'fs';

// ─── Parse roteiro de reel (YAML frontmatter + cenas) ────────────────────────

export function parseRoteiroFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  return parseRoteiro(content, filePath);
}

export function parseRoteiro(content, filePath = '') {
  const header = extractYamlHeader(content);
  const body = content.replace(/^---[\s\S]*?---\n?/, '');
  const cenas = extractCenas(body);

  if (cenas.length === 0) {
    throw new Error(
      `Nenhuma cena encontrada em "${filePath}".\n` +
      `Verifique se o roteiro segue references/formato-roteiro.md (bloco §4 com "CENA N — TÍTULO").`
    );
  }

  // Extrai prompts das seções dedicadas (§6 NanoBanana e §7 Kling)
  const nanoBananaMap = extractNanoBananaSection(body);
  const klingMap = extractKlingSection(body);

  // Mescla prompts nas cenas
  for (const cena of cenas) {
    if (!cena.promptNanoBanana && nanoBananaMap[cena.num]) {
      cena.promptNanoBanana = nanoBananaMap[cena.num];
    }
    if (!cena.promptKling && klingMap[cena.num]) {
      cena.promptKling = klingMap[cena.num];
    }
  }

  return { header, cenas, raw: content };
}

function extractYamlHeader(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};

  const header = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (!kv) continue;
    let [, key, val] = kv;
    val = val.trim().replace(/^["']|["']$/g, '');

    if (key === 'aircraft') {
      header.aircraft = val.replace(/^\[|\]$/g, '').split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
    } else if (key === 'scene_count') {
      header.scene_count = parseInt(val, 10) || 12;
    } else if (key === 'scene_duration_s') {
      header.scene_duration_s = parseInt(val, 10) || 7;
    } else {
      header[key] = val;
    }
  }

  // Parse on_complete block se presente
  const onCompleteM = m[1].match(/on_complete:\s*\n((?:\s+\w+:.*\n?)*)/);
  if (onCompleteM) {
    header.on_complete = {};
    for (const line of onCompleteM[1].split('\n')) {
      const oc = line.match(/^\s+(\w+):\s*(.+)$/);
      if (oc) header.on_complete[oc[1]] = oc[2].trim().replace(/^["']|["']$/g, '');
    }
  }

  return header;
}

// ─── Extrai cenas do bloco §4 (narração + visual + texto) ────────────────────

function extractCenas(body) {
  const cenas = [];
  const splits = splitByCenaHeaders(body);

  for (const block of splits) {
    // Requer dash (—, –, -) após o número para diferenciar "CENA 1 — TÍTULO" de "### Cena 1"
    const headerM = block.header.match(/CENA\s+(\d+)\s*[—–-]+\s*(.+?)(?:\s*\(\d+s[–-]\d+s\))?$/i);
    if (!headerM) continue;

    const num = parseInt(headerM[1], 10);
    const titulo = headerM[2].trim().replace(/\*+/g, '').trim();

    const narracao = extractField(block.body, ['Narração', 'Narracao', 'Narration', 'Narração do TTS']);
    const visual = extractField(block.body, ['Visual', 'Cena visual', 'Descrição visual', 'Descrição da cena']);
    const textoTela = extractField(block.body, ['Texto na tela', 'Texto overlay', 'Overlay', 'Texto']);

    // Prompts inline (caso o roteiro tenha prompts dentro das cenas)
    const promptNanoBanana = extractJsonBlock(block.body);
    const promptKling = extractKlingPrompt(block.body);

    cenas.push({
      num,
      titulo,
      narracao: narracao?.replace(/^"?|"?$/g, '').trim() || '',
      visual: visual?.trim() || '',
      textoTela: textoTela?.trim() || '',
      promptNanoBanana,
      promptKling,
      label: `cena_${String(num).padStart(2, '0')}`,
    });
  }

  return cenas.sort((a, b) => a.num - b.num);
}

function splitByCenaHeaders(body) {
  const result = [];
  const lines = body.split('\n');
  let current = null;

  for (const line of lines) {
    if (/(?:\*{0,2})?CENA\s+\d+/i.test(line)) {
      if (current) result.push(current);
      current = { header: line.replace(/\*+/g, '').trim(), body: '' };
    } else if (current) {
      current.body += line + '\n';
    }
  }
  if (current) result.push(current);
  return result;
}

function extractField(text, aliases) {
  for (const alias of aliases) {
    const re = new RegExp(`\\*{0,2}${alias}\\*{0,2}\\s*:?\\s*(.+?)(?=\\n\\s*\\*{0,2}(?:Visual|Texto|Narr|Prompt|Cena|$))`, 'si');
    const m = text.match(re);
    if (m) return m[1].trim();
  }
  return null;
}

function extractJsonBlock(text) {
  const m = text.match(/```json\r?\n([\s\S]*?)```/);
  if (!m) return null;
  try {
    return JSON.parse(m[1].trim());
  } catch {
    return null;
  }
}

function extractKlingPrompt(text) {
  const afterJson = text.replace(/```json[\s\S]*?```/, '');
  const klingRe = /(An .+?)\nNegative prompt:\s*([^\n]+(?:\n(?!\n)[^\n]+)*)/si;
  const m = afterJson.match(klingRe);
  if (m) {
    return {
      positive: m[1].trim(),
      negative: m[2].trim(),
    };
  }
  const klingTagRe = /(?:Kling|prompt de vídeo)[:\s]+(.+?)(?=\n\n|\n#|$)/si;
  const m2 = afterJson.match(klingTagRe);
  if (m2) return { positive: m2[1].trim(), negative: '' };
  return null;
}

// ─── Extrai prompts NanoBanana da seção §6 ───────────────────────────────────
// Formato esperado:
//   ### Cena 1
//   ```json
//   { "prompt": "..." }
//   ```

function extractNanoBananaSection(body) {
  const map = {};

  // Isola o conteúdo da seção §6 (entre "## 6." e próximo "## ")
  const sec6 = extractSection(body, /##\s+6\./);
  if (!sec6) return map;

  // Divide por "### Cena N" ou "**Cena N**" ou "Cena N" seguido de quebra de linha
  const blockRe = /(?:#{1,3}|(?:\*\*)?)\s*Cena\s+(\d+)\b[^\n]*\n([\s\S]*?)(?=(?:#{1,3}|(?:\*\*)?\s*Cena\s+\d+)|$)/gi;
  let m;
  while ((m = blockRe.exec(sec6)) !== null) {
    const num = parseInt(m[1], 10);
    const blockBody = m[2];
    const json = extractJsonBlock(blockBody);
    if (json) map[num] = json;
  }

  return map;
}

// ─── Extrai prompts Kling da seção §7 ────────────────────────────────────────
// Formato esperado (por cena):
//   **Cena 1**
//   An F-15E Strike Eagle ...
//   Negative prompt: cartoon, ...
//   ---

function extractKlingSection(body) {
  const map = {};

  const sec7 = extractSection(body, /##\s+7\./);
  if (!sec7) return map;

  // Divide por "**Cena N**" ou "### Cena N"
  const blockRe = /(?:#{1,3}|\*{0,2})\s*Cena\s+(\d+)\b[^\n]*\n([\s\S]*?)(?=(?:#{1,3}|\*{0,2})\s*Cena\s+\d+\b|^---\s*$|$)/gim;
  let m;
  while ((m = blockRe.exec(sec7)) !== null) {
    const num = parseInt(m[1], 10);
    const blockBody = m[2].trim();
    const prompt = extractKlingFromBlock(blockBody);
    if (prompt) map[num] = prompt;
  }

  return map;
}

function extractKlingFromBlock(text) {
  // Busca "An ... Negative prompt: ..."
  const re = /([\s\S]+?)\nNegative prompt:\s*([^\n]+(?:\n(?!---|\n)[^\n]+)*)/i;
  const m = text.match(re);
  if (m) {
    return {
      positive: m[1].trim(),
      negative: m[2].trim(),
    };
  }
  // Sem negative prompt: texto puro
  const cleaned = text.replace(/^---\s*$/gm, '').trim();
  if (cleaned.length > 10) {
    return { positive: cleaned, negative: '' };
  }
  return null;
}

// ─── Utilitário: extrai conteúdo de uma seção markdown ───────────────────────

function extractSection(body, titleRe) {
  const lines = body.split('\n');
  let inSection = false;
  let depth = 0;
  let result = '';

  for (const line of lines) {
    const isH2 = /^##\s+/.test(line);
    if (titleRe.test(line)) {
      inSection = true;
      depth = (line.match(/^#+/) || [''])[0].length;
      continue;
    }
    if (inSection) {
      // Para na próxima seção de mesmo nível ou superior
      const hMatch = line.match(/^(#+)\s+/);
      if (hMatch && hMatch[1].length <= depth) {
        break;
      }
      result += line + '\n';
    }
  }

  return result || null;
}

// ─── Utilitários de exportação ────────────────────────────────────────────────

export function extractNarracao(cenas) {
  return cenas.map(c => c.narracao).filter(Boolean).join(' ');
}

export function extractPromptsBatch(cenas, type = 'nanoBanana') {
  return cenas
    .filter(c => type === 'nanoBanana' ? c.promptNanoBanana : c.promptKling)
    .map(c => ({
      label: c.label,
      num: c.num,
      prompt: type === 'nanoBanana' ? c.promptNanoBanana : c.promptKling,
    }));
}
