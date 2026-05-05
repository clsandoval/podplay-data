---
name: slack-file-reading
description: Read and extract content from Slack file attachments (PDF, text, images, office docs)
---

# Slack File Reading

When the `<user_query>` or any `<*_history>` block in the context contains a `<files>` element, those are Slack uploads. Follow this procedure to read them.

## Step 1: Download

Call the `slack_download_file` MCP tool with the F-prefixed id from the `<file id="F...">` attribute:

```
slack_download_file(file_id="F0AUM3188P7")
```

Returns `{id, name, mimetype, size, title, content_base64}`.

**Never call `web_fetch` on `https://files.slack.com/...` URLs.** Those require bot bearer auth that the agent doesn't hold; the request will fail with `url_not_allowed`. The `url` attribute on `<file>` is informational only.

## Step 2: Decode by mimetype

### PDF (`application/pdf`)

```bash
echo "<base64>" | base64 -d > /tmp/in.pdf
pdftotext /tmp/in.pdf -
```

If `pdftotext` (poppler-utils) isn't available:

```bash
python3 -c "from pypdf import PdfReader; print('\n'.join(p.extract_text() for p in PdfReader('/tmp/in.pdf').pages))"
```

If `pypdf` is missing, `pip install pypdf` first, then re-run.

### Text-like (`text/*`, `application/json`, csv, xml, yaml, log)

Decode the base64 directly; for small files you can read it inline without writing to disk:

```bash
echo "<base64>" | base64 -d
```

### Office binaries

- **`.docx`** (`application/vnd.openxmlformats-officedocument.wordprocessingml.document`)
  ```python
  from docx import Document
  print('\n'.join(p.text for p in Document('/tmp/in.docx').paragraphs))
  ```
  Library: `python-docx`.

- **`.xlsx`** (`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`)
  ```python
  from openpyxl import load_workbook
  for row in load_workbook('/tmp/in.xlsx').active.iter_rows(values_only=True):
      print(row)
  ```
  Library: `openpyxl`.

- **`.pptx`** — library: `python-pptx`.

`pip install` if missing.

### Images (`image/*`)

Tool-result text doesn't carry image bytes into the model's vision pipeline, so you can't actually "see" the image contents through `slack_download_file`.

Say this to the user, verbatim or close:

> I downloaded the image but can't view image content directly through the download tool. Please describe what you'd like me to know about it, or paste any text from it.

**Do NOT** invent or describe image contents from the filename, mimetype, or size.

### Generic / unknown mimetype

If `mimetype` is `application/octet-stream` or empty, sniff the magic bytes:

- `%PDF-` → treat as PDF
- `PK\x03\x04` → likely a zip / Office Open XML container; check filename extension
- printable ASCII → treat as text

## Step 3: Don't hallucinate

If extraction fails (corrupt file, encrypted PDF, missing library that won't `pip install`, library throws), **say so explicitly.** Don't invent contents from the filename, the title field, or any partial output. Tell the user what you tried and what failed.

## Common pitfalls

- The base64 string in `content_base64` can be many KB. Pipe through `base64 -d` rather than pasting into the python `-c` flag — argv length limits will silently truncate large inputs.
- `pdftotext` outputs a form-feed (`\f`) between pages. Treat it as a page break.
- For large PDFs (>1MB raw), prefer streaming page-by-page with `pypdf` to avoid blowing memory.
