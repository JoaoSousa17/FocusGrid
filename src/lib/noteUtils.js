// SHA-256 hash using Web Crypto API
export async function sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ─── HTML ↔ Markdown ────────────────────────────────────────────────────────

export function htmlToMarkdown(html) {
  if (!html) return "";
  let md = html;

  // Block elements first
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, c) => `\n# ${innerText(c)}\n`);
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, c) => `\n## ${innerText(c)}\n`);
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, c) => `\n### ${innerText(c)}\n`);

  // Lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, c) =>
    c.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (__, item) => `\n- ${innerText(item)}`) + "\n"
  );
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, c) => {
    let i = 1;
    return c.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (__, item) => `\n${i++}. ${innerText(item)}`) + "\n";
  });

  // Tables
  md = md.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_, tbody) => {
    const rows = [...tbody.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
    if (!rows.length) return "";
    const parseRow = (rowHtml) =>
      [...rowHtml.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) => innerText(m[1]).trim());
    const cells = rows.map((r) => parseRow(r[1]));
    const cols = Math.max(...cells.map((r) => r.length));
    const header = cells[0] || [];
    const sep = Array(cols).fill("---");
    const body = cells.slice(1);
    return (
      "\n| " + header.join(" | ") + " |\n" +
      "| " + sep.join(" | ") + " |\n" +
      body.map((r) => "| " + r.join(" | ") + " |").join("\n") +
      "\n"
    );
  });

  // Inline elements
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**");
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**");
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*");
  md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*");
  md = md.replace(/<u[^>]*>([\s\S]*?)<\/u>/gi, "__$1__");
  md = md.replace(/<s[^>]*>([\s\S]*?)<\/s>/gi, "~~$1~~");
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`");

  // Images & links
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, "![$2]($1)");
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, "![]($1)");
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");

  // Paragraphs & breaks
  md = md.replace(/<br\s*\/?>/gi, "\n");
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, c) => `${c}\n\n`);

  // Strip remaining tags & decode entities
  md = md.replace(/<[^>]+>/g, "");
  md = md.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/&#39;/g, "'");

  return md.replace(/\n{3,}/g, "\n\n").trim();
}

export function markdownToHtml(md) {
  if (!md) return "";
  let html = md;

  // Escape HTML special chars first
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Bold / italic / underline / strikethrough
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/__(.+?)__/g, "<u>$1</u>");
  html = html.replace(/~~(.+?)~~/g, "<s>$1</s>");
  html = html.replace(/`(.+?)`/g, "<code>$1</code>");

  // Images & links
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%">');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Tables
  html = html.replace(
    /(\|.+\|\n\|[-| :]+\|\n(?:\|.+\|\n?)*)/g,
    (block) => {
      const lines = block.trim().split("\n");
      const header = lines[0].split("|").slice(1, -1).map((c) => `<th>${c.trim()}</th>`).join("");
      const body = lines.slice(2).map((l) =>
        "<tr>" + l.split("|").slice(1, -1).map((c) => `<td>${c.trim()}</td>`).join("") + "</tr>"
      ).join("\n");
      return `<table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table>`;
    }
  );

  // Lists — bullet
  html = html.replace(/((?:^- .+\n?)+)/gm, (block) => {
    const items = block.trim().split("\n").map((l) => `<li>${l.slice(2)}</li>`).join("");
    return `<ul>${items}</ul>`;
  });
  // Lists — numbered
  html = html.replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
    const items = block.trim().split("\n").map((l) => `<li>${l.replace(/^\d+\. /, "")}</li>`).join("");
    return `<ol>${items}</ol>`;
  });

  // Paragraphs
  html = html.split(/\n{2,}/).map((block) => {
    block = block.trim();
    if (!block) return "";
    if (/^<[hH\d]|^<ul|^<ol|^<table/.test(block)) return block;
    return `<p style="text-align:justify">${block.replace(/\n/g, "<br>")}</p>`;
  }).join("\n");

  return html;
}

function innerText(html) {
  const d = document.createElement("div");
  d.innerHTML = html;
  return d.textContent || "";
}
