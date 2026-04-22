import formidable from 'formidable';
import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const form = formidable({ maxFileSize: 25 * 1024 * 1024 });

    const [, files] = await form.parse(req);
    const audioFile = files.file?.[0];

    if (!audioFile) {
      return res.status(400).json({ error: 'Nessun file audio ricevuto' });
    }

    const formData = new FormData();
    formData.append('file', fs.createReadStream(audioFile.filepath), {
      filename: 'audio.webm',
      contentType: audioFile.mimetype || 'audio/webm'
    });
    formData.append('model', 'whisper-1');
    formData.append('language', 'it');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        ...formData.getHeaders()
      },
      body: formData
    });

    const data = await response.json();

    // Cleanup temp file
    fs.unlinkSync(audioFile.filepath);

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Errore trascrizione' });
    }

    return res.status(200).json({ text: data.text });

  } catch (err) {
    return res.status(500).json({ error: 'Errore interno del server' });
  }
}
